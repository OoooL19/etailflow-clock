-- Etailflow Clock · database setup with login + server-side permissions.
-- Safe to run more than once. Run it in Supabase → SQL Editor.
--
-- How it works
--   * The four data tables are closed: the public (anon) key can no longer read or write them.
--   * The website talks to the database only through the ef_* functions below.
--   * ef_login checks the employee's PIN (stored as a bcrypt hash) and returns a session token.
--   * Every other function checks that token, then enforces the role rules here on the server:
--       employee    -> own punches and requests only
--       team lead   -> also sees the employees assigned to them, and can add employees to their own team
--       main admin  -> everything
--   * 5 wrong PINs lock the account for 15 minutes.

create extension if not exists pgcrypto with schema extensions;

-- ---------------------------------------------------------------- tables
create table if not exists sites (id text primary key, name text, address text, lat double precision, lng double precision, radius int default 10, tolerance boolean default true);
create table if not exists employees (id text primary key, name text, role text default 'employee', "siteId" text, "leaderId" text, "noPunch" boolean default false);
create table if not exists punches (id text primary key, "empId" text, "siteId" text, type text, t timestamptz, dist double precision, acc double precision, "viaRequest" text);
create table if not exists requests (id text primary key, "empId" text, kind text, date text, "punchType" text, time text, days int, hours int, reason text, status text default 'pending', "createdAt" timestamptz);

alter table employees add column if not exists pin_hash text;
alter table employees add column if not exists failed int not null default 0;
alter table employees add column if not exists locked_until timestamptz;
alter table employees add column if not exists must_change boolean not null default false;
alter table employees add column if not exists claimable boolean not null default false;
alter table punches add column if not exists lat double precision;
alter table punches add column if not exists lng double precision;
alter table punches add column if not exists "syncedAt" timestamptz default now();

create table if not exists ef_sessions (
  token_hash text primary key,
  emp_id text not null,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  expires_at timestamptz not null
);
create index if not exists punches_t_idx on punches (t);
create index if not exists punches_emp_idx on punches ("empId", t);
create index if not exists ef_sessions_emp_idx on ef_sessions (emp_id);

-- ---------------------------------------------------------------- lock the tables
alter table sites enable row level security;
alter table employees enable row level security;
alter table punches enable row level security;
alter table requests enable row level security;
alter table ef_sessions enable row level security;
drop policy if exists "open" on sites;
drop policy if exists "open" on employees;
drop policy if exists "open" on punches;
drop policy if exists "open" on requests;
revoke all on sites, employees, punches, requests, ef_sessions from anon, authenticated;

-- ---------------------------------------------------------------- first-run data
insert into sites (id, name, address, lat, lng, radius, tolerance)
select * from (values
  ('newark', 'Etailflow · Newark', '1800 Ogletown Rd Ste B, Newark, DE 19711', 39.6861401::double precision, -75.7192305::double precision, 10, true),
  ('wilm', 'Etailflow · Wilmington', '(set address)', 39.7391::double precision, -75.5398::double precision, 10, true)
) v where not exists (select 1 from sites);

-- One main admin. It has no PIN yet: the first sign-in as 1001 must choose one ("claimable").
insert into employees (id, name, role, "siteId", claimable)
select '1001', 'Admin', 'admin', 'newark', true where not exists (select 1 from employees);

-- Upgrading a database that already has people but no PINs yet: let the main admin(s) choose a PIN at their
-- next sign-in. This only applies while nobody at all has a PIN, so it cannot be used again later.
update employees set claimable = true
where role = 'admin' and pin_hash is null and not exists (select 1 from employees where pin_hash is not null);

-- ---------------------------------------------------------------- helpers (not callable from outside)
create or replace function ef_dist(a double precision, b double precision, c double precision, d double precision)
returns double precision language sql immutable as $$
  select 2 * 6371000 * asin(sqrt(least(1, power(sin(radians(c - a) / 2), 2) + cos(radians(a)) * cos(radians(c)) * power(sin(radians(d - b) / 2), 2))))
$$;

create or replace function ef_emp_json(e employees) returns jsonb language sql stable as $$
  select jsonb_build_object('id', e.id, 'name', e.name, 'role', e.role, 'siteId', e."siteId", 'leaderId', e."leaderId",
                            'noPunch', coalesce(e."noPunch", false), 'hasPin', e.pin_hash is not null)
$$;

create or replace function ef_min_pin(p_role text) returns int language sql immutable as $$
  select case when p_role in ('admin', 'leader') then 6 else 4 end
$$;

-- Returns the signed-in employee for a session token, or fails with EF_AUTH.
create or replace function ef_auth(p_token text, p_allow_pending boolean default false)
returns employees language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare s ef_sessions; e employees;
begin
  if p_token is null or length(p_token) < 32 then raise exception 'EF_AUTH'; end if;
  select * into s from ef_sessions where token_hash = encode(digest(p_token, 'sha256'), 'hex');
  if not found or s.expires_at < now() then raise exception 'EF_AUTH'; end if;
  select * into e from employees where id = s.emp_id;
  if not found then raise exception 'EF_AUTH'; end if;
  if not p_allow_pending and (e.pin_hash is null or e.must_change) then raise exception 'EF_MUST_CHANGE'; end if;
  if s.last_seen < now() - interval '1 hour' then
    update ef_sessions set last_seen = now(), expires_at = now() + interval '90 days' where token_hash = s.token_hash;
  end if;
  return e;
end $$;

-- ---------------------------------------------------------------- public functions
-- Sign in with employee ID (or exact name) + PIN.
create or replace function ef_login(p_id text, p_pin text)
returns jsonb language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare e employees; q text := lower(btrim(coalesce(p_id, ''))); v_token text; v_failed int;
begin
  select * into e from employees where lower(id) = q;
  if not found and (select count(*) from employees where lower(name) = q) = 1 then
    select * into e from employees where lower(name) = q;
  end if;
  if e.id is null then
    perform crypt(coalesce(p_pin, ''), gen_salt('bf', 8));  -- same work as a real check
    return jsonb_build_object('ok', false, 'error', 'EF_LOGIN');
  end if;
  if e.locked_until is not null and e.locked_until > now() then
    return jsonb_build_object('ok', false, 'error', 'EF_LOCKED');
  end if;
  if e.pin_hash is null then
    if not e.claimable then return jsonb_build_object('ok', false, 'error', 'EF_LOGIN'); end if;
  elsif e.pin_hash <> crypt(coalesce(p_pin, ''), e.pin_hash) then
    v_failed := case when e.failed >= 5 then 1 else e.failed + 1 end;
    update employees set failed = v_failed, locked_until = case when v_failed >= 5 then now() + interval '15 minutes' else null end where id = e.id;
    return jsonb_build_object('ok', false, 'error', case when v_failed >= 5 then 'EF_LOCKED' else 'EF_LOGIN' end);
  end if;
  update employees set failed = 0, locked_until = null where id = e.id;
  delete from ef_sessions where expires_at < now();
  v_token := encode(gen_random_bytes(32), 'hex');
  insert into ef_sessions (token_hash, emp_id, expires_at) values (encode(digest(v_token, 'sha256'), 'hex'), e.id, now() + interval '90 days');
  return jsonb_build_object('ok', true, 'token', v_token, 'me', ef_emp_json(e), 'mustChange', e.pin_hash is null or e.must_change);
end $$;

create or replace function ef_logout(p_token text)
returns void language plpgsql security definer set search_path = public, extensions, pg_temp as $$
begin
  delete from ef_sessions where token_hash = encode(digest(coalesce(p_token, ''), 'sha256'), 'hex');
end $$;

-- Change your own PIN (needs the old one), or as main admin set someone else's (they must then change it).
create or replace function ef_set_pin(p_token text, p_emp_id text, p_new text, p_old text default null)
returns void language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare me employees; target employees; v_new text := coalesce(p_new, '');
begin
  me := ef_auth(p_token, true);
  select * into target from employees where id = coalesce(nullif(p_emp_id, ''), me.id);
  if not found then raise exception 'EF_INPUT'; end if;
  if length(v_new) < ef_min_pin(target.role) or length(v_new) > 64
     or v_new ~ '^(.)\1*$' or v_new in ('1234', '12345', '123456', '1234567', '12345678', '654321', '4321') or v_new = target.id then
    raise exception 'EF_PIN_WEAK';
  end if;
  if target.id = me.id then
    if me.pin_hash is not null and not me.must_change
       and (p_old is null or me.pin_hash <> crypt(p_old, me.pin_hash)) then
      raise exception 'EF_PIN_OLD';
    end if;
    update employees set pin_hash = crypt(v_new, gen_salt('bf', 8)), must_change = false, claimable = false, failed = 0, locked_until = null where id = me.id;
    delete from ef_sessions where emp_id = me.id and token_hash <> encode(digest(p_token, 'sha256'), 'hex');
  elsif me.role = 'admin' and me.pin_hash is not null and not me.must_change then
    update employees set pin_hash = crypt(v_new, gen_salt('bf', 8)), must_change = true, claimable = false, failed = 0, locked_until = null where id = target.id;
    delete from ef_sessions where emp_id = target.id;
  elsif me.role = 'leader' and me.pin_hash is not null and not me.must_change
        and target.role = 'employee' and target."leaderId" = me.id and target.pin_hash is null then
    -- a team lead gives a starting PIN to someone they just added (they cannot reset an existing PIN)
    update employees set pin_hash = crypt(v_new, gen_salt('bf', 8)), must_change = true, claimable = false, failed = 0, locked_until = null where id = target.id;
  else
    raise exception 'EF_FORBIDDEN';
  end if;
end $$;

-- Everything the signed-in person is allowed to see.
create or replace function ef_sync(p_token text)
returns jsonb language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare me employees; ids text[];
begin
  me := ef_auth(p_token);
  if me.role = 'admin' then select array_agg(id) into ids from employees;
  elsif me.role = 'leader' then select array_agg(id) into ids from employees where id = me.id or "leaderId" = me.id;
  else ids := array[me.id];
  end if;
  return jsonb_build_object(
    'me', me.id,
    'sites', (select coalesce(jsonb_agg(to_jsonb(s) order by s.id), '[]'::jsonb) from sites s),
    'employees', (select coalesce(jsonb_agg(ef_emp_json(e) order by e.id), '[]'::jsonb) from employees e where e.id = any(ids)),
    'punches', (select coalesce(jsonb_agg(jsonb_build_object('id', p.id, 'empId', p."empId", 'siteId', p."siteId", 'type', p.type, 't', p.t, 'dist', p.dist, 'acc', p.acc, 'viaRequest', p."viaRequest") order by p.t), '[]'::jsonb)
                from punches p where p."empId" = any(ids) and p.t >= now() - interval '100 days'),
    'requests', (select coalesce(jsonb_agg(to_jsonb(r) order by r."createdAt"), '[]'::jsonb) from requests r where r."empId" = any(ids))
  );
end $$;

-- One change (save or delete of one row). The role rules are enforced here.
create or replace function ef_apply(p_token text, p_table text, p_row jsonb, p_del boolean default false)
returns void language plpgsql security definer set search_path = public, extensions, pg_temp as $$
declare
  me employees; adm boolean; v_id text; s sites; old employees;
  v_t timestamptz; v_lat double precision; v_lng double precision; v_acc double precision; v_dist double precision;
  v_role text; v_status text;
begin
  me := ef_auth(p_token);
  adm := me.role = 'admin';
  v_id := case when p_del then coalesce(p_row ->> 'id', p_row #>> '{}') else p_row ->> 'id' end;
  if v_id is null or v_id = '' or length(v_id) > 64 then raise exception 'EF_INPUT'; end if;

  if p_table = 'punches' then
    if p_del then raise exception 'EF_FORBIDDEN'; end if;
    if (p_row ->> 'type') not in ('in', 'out') then raise exception 'EF_INPUT'; end if;
    if adm and (p_row ->> 'viaRequest') is not null then
      -- approved "missed punch" request: the main admin records the punch for the employee
      if not exists (select 1 from requests r where r.id = p_row ->> 'viaRequest' and r."empId" = p_row ->> 'empId' and r.kind = 'fix') then raise exception 'EF_INPUT'; end if;
      insert into punches (id, "empId", "siteId", type, t, dist, acc, "viaRequest")
      values (v_id, p_row ->> 'empId', p_row ->> 'siteId', p_row ->> 'type', (p_row ->> 't')::timestamptz, 0, 0, p_row ->> 'viaRequest')
      on conflict (id) do nothing;
    else
      -- a normal punch: always for yourself, near a site, at (about) the current time
      select * into s from sites where id = p_row ->> 'siteId';
      if not found then raise exception 'EF_INPUT'; end if;
      v_lat := (p_row ->> 'lat')::double precision; v_lng := (p_row ->> 'lng')::double precision; v_acc := coalesce((p_row ->> 'acc')::double precision, 0);
      if v_lat is null or v_lng is null then raise exception 'EF_INPUT'; end if;
      v_t := coalesce((p_row ->> 't')::timestamptz, now());
      if v_t > now() + interval '2 minutes' or v_t < now() - interval '12 hours' then raise exception 'EF_TIME'; end if;
      v_dist := ef_dist(v_lat, v_lng, s.lat, s.lng);
      if not (v_dist <= s.radius or (coalesce(s.tolerance, false) and v_acc <= 30 and v_dist - v_acc <= s.radius)) then raise exception 'EF_RANGE'; end if;
      insert into punches (id, "empId", "siteId", type, t, dist, acc, lat, lng)
      values (v_id, me.id, s.id, p_row ->> 'type', v_t, round(v_dist::numeric, 1), v_acc, v_lat, v_lng)
      on conflict (id) do nothing;
    end if;

  elsif p_table = 'requests' then
    if p_del then raise exception 'EF_FORBIDDEN'; end if;
    if exists (select 1 from requests where id = v_id) then
      if adm then
        -- only the main admin decides requests
        v_status := p_row ->> 'status';
        if v_status not in ('pending', 'approved', 'denied') then raise exception 'EF_INPUT'; end if;
        update requests set status = v_status where id = v_id;
      elsif not exists (select 1 from requests where id = v_id and "empId" = me.id) then
        raise exception 'EF_FORBIDDEN';
      end if;  -- re-sending your own request is a no-op
    else
      if (p_row ->> 'kind') not in ('leave', 'fix') then raise exception 'EF_INPUT'; end if;
      insert into requests (id, "empId", kind, date, "punchType", time, days, hours, reason, status, "createdAt")
      values (v_id, me.id, p_row ->> 'kind', left(p_row ->> 'date', 10), p_row ->> 'punchType', left(p_row ->> 'time', 5),
              case when p_row ->> 'kind' = 'leave' then least(greatest(coalesce((p_row ->> 'days')::int, 1), 1), 30) end,
              case when p_row ->> 'kind' = 'leave' then least(greatest(coalesce((p_row ->> 'hours')::int, 8), 1), 12) end,
              left(coalesce(p_row ->> 'reason', ''), 500), 'pending', now());
    end if;

  elsif p_table = 'sites' then
    if not adm then raise exception 'EF_FORBIDDEN'; end if;
    if p_del then
      if exists (select 1 from employees where "siteId" = v_id) or (select count(*) from sites) <= 1 then raise exception 'EF_IN_USE'; end if;
      delete from sites where id = v_id;
    else
      if coalesce(btrim(p_row ->> 'name'), '') = '' then raise exception 'EF_INPUT'; end if;
      insert into sites (id, name, address, lat, lng, radius, tolerance)
      values (v_id, left(btrim(p_row ->> 'name'), 120), left(coalesce(p_row ->> 'address', ''), 300), (p_row ->> 'lat')::double precision, (p_row ->> 'lng')::double precision,
              least(greatest(coalesce((p_row ->> 'radius')::int, 10), 1), 500), coalesce((p_row ->> 'tolerance')::boolean, true))
      on conflict (id) do update set name = excluded.name, address = excluded.address, lat = excluded.lat, lng = excluded.lng, radius = excluded.radius, tolerance = excluded.tolerance;
    end if;

  elsif p_table = 'employees' and me.role = 'leader' then
    -- a team lead may add employees to their own team, and correct the name / site of their own members.
    -- They cannot delete anyone, change roles, or touch people outside their team.
    if p_del then raise exception 'EF_FORBIDDEN'; end if;
    if v_id ~ '\s' or coalesce(btrim(p_row ->> 'name'), '') = '' then raise exception 'EF_INPUT'; end if;
    if not exists (select 1 from sites where id = p_row ->> 'siteId') then raise exception 'EF_INPUT'; end if;
    select * into old from employees where id = v_id;
    if found then
      if old.role <> 'employee' or old."leaderId" is distinct from me.id then raise exception 'EF_ID_TAKEN'; end if;
      update employees set name = left(btrim(p_row ->> 'name'), 120), "siteId" = p_row ->> 'siteId' where id = v_id;
    else
      insert into employees (id, name, role, "siteId", "leaderId", "noPunch")
      values (v_id, left(btrim(p_row ->> 'name'), 120), 'employee', p_row ->> 'siteId', me.id, false);
    end if;

  elsif p_table = 'employees' then
    if not adm then raise exception 'EF_FORBIDDEN'; end if;
    select * into old from employees where id = v_id;
    if p_del then
      if v_id = me.id then raise exception 'EF_FORBIDDEN'; end if;
      if old.role = 'admin' and (select count(*) from employees where role = 'admin') <= 1 then raise exception 'EF_LAST_ADMIN'; end if;
      update employees set "leaderId" = null where "leaderId" = v_id;
      delete from ef_sessions where emp_id = v_id;
      delete from employees where id = v_id;
    else
      v_role := coalesce(p_row ->> 'role', 'employee');
      if v_role not in ('admin', 'leader', 'employee') or v_id ~ '\s' or coalesce(btrim(p_row ->> 'name'), '') = '' then raise exception 'EF_INPUT'; end if;
      if old.role = 'admin' and v_role <> 'admin' and (select count(*) from employees where role = 'admin') <= 1 then raise exception 'EF_LAST_ADMIN'; end if;
      if not exists (select 1 from sites where id = p_row ->> 'siteId') then raise exception 'EF_INPUT'; end if;
      insert into employees (id, name, role, "siteId", "leaderId", "noPunch")
      values (v_id, left(btrim(p_row ->> 'name'), 120), v_role, p_row ->> 'siteId',
              case when v_role = 'employee' then nullif(p_row ->> 'leaderId', '') else null end,
              v_role <> 'employee' and coalesce((p_row ->> 'noPunch')::boolean, false))
      on conflict (id) do update set name = excluded.name, role = excluded.role, "siteId" = excluded."siteId", "leaderId" = excluded."leaderId", "noPunch" = excluded."noPunch";
      if old.role = 'leader' and v_role <> 'leader' then update employees set "leaderId" = null where "leaderId" = v_id; end if;
    end if;

  else
    raise exception 'EF_INPUT';
  end if;
end $$;

-- ---------------------------------------------------------------- who may call what
revoke all on function ef_dist(double precision, double precision, double precision, double precision) from public, anon, authenticated;
revoke all on function ef_emp_json(employees) from public, anon, authenticated;
revoke all on function ef_min_pin(text) from public, anon, authenticated;
revoke all on function ef_auth(text, boolean) from public, anon, authenticated;
revoke all on function ef_login(text, text) from public;
revoke all on function ef_logout(text) from public;
revoke all on function ef_set_pin(text, text, text, text) from public;
revoke all on function ef_sync(text) from public;
revoke all on function ef_apply(text, text, jsonb, boolean) from public;
grant execute on function ef_login(text, text), ef_logout(text), ef_set_pin(text, text, text, text), ef_sync(text), ef_apply(text, text, jsonb, boolean) to anon, authenticated;

notify pgrst, 'reload schema';
