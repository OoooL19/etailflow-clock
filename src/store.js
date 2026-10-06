// Data layer: local cache (always) + Supabase REST mirror.
export const LS_DB = 'efclock.db.v2', LS_ME = 'efclock.me', LS_LANG = 'efclock.lang', LS_SB = 'efclock.supabase', LS_OUT = 'efclock.outbox';

// Built-in Supabase project so every phone shares the same data without setup.
// The anon key is a public key by design; access is governed by the table policies.
export const SB_DEFAULT = { url: '__SB_URL__', key: '__SB_KEY__' };

export function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
export function dayKey(d) { d = new Date(d); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
export function haversine(a, b, c, d) {
  const R = 6371000, r = Math.PI / 180, dLat = (c - a) * r, dLng = (d - b) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// First-run data: the work sites and a single main admin. No demo staff or punches.
export function seed() {
  const sites = [
    { id: 'newark', name: 'Etailflow · Newark', address: '1800 Ogletown Rd Ste B, Newark, DE 19711', lat: 39.6861401, lng: -75.7192305, radius: 10, tolerance: true },
    { id: 'wilm', name: 'Etailflow · Wilmington', address: '(set address)', lat: 39.7391, lng: -75.5398, radius: 10, tolerance: true },
  ];
  const employees = [
    { id: '1001', name: 'Marisol Alvarez', role: 'admin', siteId: 'newark', leaderId: null, noPunch: false },
  ];
  return { sites, employees, punches: [], requests: [] };
}

export function loadLocal() { try { return JSON.parse(localStorage.getItem(LS_DB)); } catch (e) { return null; } }
export function saveLocal(db) { try { localStorage.setItem(LS_DB, JSON.stringify(db)); } catch (e) {} }

// Supabase REST mirror. Tables: sites, employees, punches, requests (see README.md for SQL).
const PAGE = 1000, PUNCH_DAYS = 100;
function httpError(what, status) { const e = new Error(what + ' ' + status); e.status = status; return e; }
export class Remote {
  constructor(cfg) { this.url = cfg.url.replace(/\/$/, ''); this.key = cfg.key; }
  headers(extra) { return Object.assign({ apikey: this.key, Authorization: 'Bearer ' + this.key, 'Content-Type': 'application/json' }, extra || {}); }
  // Reads every row, page by page (the API returns at most 1000 rows per request).
  async select(table, filter) {
    const out = [];
    for (let offset = 0; ; offset += PAGE) {
      const r = await fetch(this.url + '/rest/v1/' + table + '?select=*' + (filter || '') + '&order=id&limit=' + PAGE + '&offset=' + offset, { headers: this.headers() });
      if (!r.ok) throw httpError(table, r.status);
      const rows = await r.json(); out.push(...rows);
      if (rows.length < PAGE) return out;
    }
  }
  async upsert(table, rows) {
    const r = await fetch(this.url + '/rest/v1/' + table, { method: 'POST', headers: this.headers({ Prefer: 'resolution=merge-duplicates,return=minimal' }), body: JSON.stringify(rows) });
    if (!r.ok) throw httpError(table, r.status);
  }
  async remove(table, id) {
    const r = await fetch(this.url + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: this.headers() });
    if (!r.ok) throw httpError(table, r.status);
  }
  async loadAll() {
    const since = new Date(Date.now() - PUNCH_DAYS * 864e5).toISOString();
    const [sites, employees, punches, requests] = await Promise.all([
      this.select('sites'), this.select('employees'),
      this.select('punches', '&t=gte.' + encodeURIComponent(since)), this.select('requests'),
    ]);
    return { sites, employees, punches, requests };
  }
  async pushAll(db) {
    for (const t of ['sites', 'employees', 'punches', 'requests']) if (db[t].length) await this.upsert(t, db[t]);
  }
}

export function toCsv(rows) {
  return rows.map(r => r.map(v => '"' + String(v ?? '').replace(/"/g, '""') + '"').join(',')).join('\n');
}
