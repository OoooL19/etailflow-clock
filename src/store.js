// Data layer: a local cache for offline viewing + the Supabase backend.
// The database tables are closed to the public key; everything goes through the
// ef_* functions (see supabase/security.sql), which check the login session and role.
export const LS_DB = 'efclock.db.v3', LS_ME = 'efclock.me', LS_LANG = 'efclock.lang', LS_TOKEN = 'efclock.token', LS_OUT = 'efclock.outbox.v2';

// Filled in from src/config.json by build.py. The key is Supabase's publishable key (public by design).
export const SB = { url: '__SB_URL__', key: '__SB_KEY__' };

export function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
export function dayKey(d) { d = new Date(d); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
export function haversine(a, b, c, d) {
  const R = 6371000, r = Math.PI / 180, dLat = (c - a) * r, dLng = (d - b) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function emptyDb() { return { sites: [], employees: [], punches: [], requests: [] }; }
export function loadLocal() { try { return JSON.parse(localStorage.getItem(LS_DB)); } catch (e) { return null; } }
export function saveLocal(db) { try { localStorage.setItem(LS_DB, JSON.stringify(db)); } catch (e) {} }
export function clearLocal() { try { localStorage.removeItem(LS_DB); } catch (e) {} }

export class Remote {
  constructor(cfg, token) { this.url = cfg.url.replace(/\/$/, ''); this.key = cfg.key; this.token = token || ''; }
  // Errors carry: .network (could not reach the server), .status (HTTP status),
  // .code (an EF_* reason when the server refused the request on purpose).
  async rpc(fn, args) {
    let r;
    try {
      r = await fetch(this.url + '/rest/v1/rpc/' + fn, { method: 'POST', headers: { apikey: this.key, Authorization: 'Bearer ' + this.key, 'Content-Type': 'application/json' }, body: JSON.stringify(args) });
    } catch (e) { const err = new Error('network'); err.network = true; throw err; }
    if (!r.ok) {
      let msg = ''; try { msg = (await r.json()).message || ''; } catch (e) {}
      const err = new Error(msg || 'http ' + r.status); err.status = r.status; err.code = /^EF_[A-Z_]+$/.test(msg) ? msg : ''; throw err;
    }
    const text = await r.text(); return text ? JSON.parse(text) : null;
  }
  login(id, pin) { return this.rpc('ef_login', { p_id: id, p_pin: pin }); }
  logout() { return this.rpc('ef_logout', { p_token: this.token }); }
  sync() { return this.rpc('ef_sync', { p_token: this.token }); }
  apply(table, row, del) { return this.rpc('ef_apply', { p_token: this.token, p_table: table, p_row: row, p_del: !!del }); }
  setPin(empId, newPin, oldPin) { return this.rpc('ef_set_pin', { p_token: this.token, p_emp_id: empId, p_new: newPin, p_old: oldPin || null }); }
}

export function toCsv(rows) {
  return rows.map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
}
