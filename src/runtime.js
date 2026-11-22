/* ---------- standalone runtime ----------
   Inside a claude.ai Artifact the page gets window.claude (a shared database, Claude voices,
   Claude for AI features, the viewer's Notion connector). Opened anywhere else — a local file,
   GitHub Pages, a wallpaper app — this file provides the same small API:
     db        → a local document store kept in localStorage (same calls: collection / doc / onSnapshot / set …)
     user      → the local viewer can always edit
     sample    → AI features through YOUR OWN Anthropic API key (optional, stored only in this browser)
     downloads → saves files with a normal browser download
   Data sources, in order: phx-data.js beside the page (written by tools/notion-sync.mjs),
   an embedded snapshot, or the built-in demo. */
(() => {
"use strict";
if (window.claude && typeof window.claude.use === "function") return;   // running as a claude.ai Artifact

const KEY = "phx-db", AIKEY = "phx-ai";
const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v));
let store = {};
try { store = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch { store = {}; }
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) { console.warn("phx: local storage is full", e); } };

const subs = new Set();
let pending = false;
function notify(){ if (pending) return; pending = true; setTimeout(() => { pending = false; subs.forEach(s => { try { s(); } catch (e) { console.error(e); } }); }, 0); }
addEventListener("storage", e => { if (e.key === KEY){ try { store = JSON.parse(e.newValue || "{}") || {}; } catch {} notify(); } });   // other tabs

const docSnap = (path, id) => ({ id, exists: path in store, data: () => clone(store[path]), metadata: { fromCache: false } });
function docRef(path){
  const id = path.split("/").pop();
  return {
    id, path,
    async get(){ return docSnap(path, id); },
    async set(data, opt){ store[path] = opt && opt.merge ? { ...(store[path] || {}), ...clone(data) } : clone(data); save(); notify(); },
    async update(data){ if (!(path in store)) throw { code: "not-found" }; store[path] = { ...store[path], ...clone(data) }; save(); notify(); },
    async delete(){ delete store[path]; save(); notify(); },
    onSnapshot(cb){ let last; const run = () => { const k = JSON.stringify(store[path] ?? null); if (k === last) return; last = k; cb(docSnap(path, id)); }; subs.add(run); setTimeout(run, 0); return () => subs.delete(run); }
  };
}
function query(col, ord, lim){
  const docs = () => {
    let arr = Object.keys(store).filter(p => p.startsWith(col + "/") && p.indexOf("/", col.length + 1) < 0).map(p => ({ id: p.slice(col.length + 1), d: store[p] }));
    if (ord) arr.sort((a, b) => { const x = a.d?.[ord.f], y = b.d?.[ord.f]; return (x > y ? 1 : x < y ? -1 : 0) * (ord.dir === "desc" ? -1 : 1); });
    if (lim) arr = arr.slice(0, lim);
    return arr;
  };
  return {
    orderBy: (f, dir) => query(col, { f, dir }, lim),
    limit: n => query(col, ord, n),
    doc: id => docRef(col + "/" + (id || Math.random().toString(36).slice(2, 12))),
    async add(data){ const r = docRef(col + "/" + Math.random().toString(36).slice(2, 12)); await r.set(data); return r; },
    async get(){ const a = docs(); return { docs: a.map(x => ({ id: x.id, exists: true, data: () => clone(x.d) })), size: a.length, empty: !a.length }; },
    onSnapshot(cb){ let last; const run = () => { const a = docs(); const k = JSON.stringify(a); if (k === last) return; last = k;
        cb({ docs: a.map(x => ({ id: x.id, exists: true, data: () => clone(x.d) })), size: a.length, empty: !a.length, metadata: { fromCache: false } }); };
      subs.add(run); setTimeout(run, 0); return () => subs.delete(run); }
  };
}
const db = { collection: c => query(c), doc: p => docRef(p) };

/* ---------- data: Notion sync file, embedded snapshot, or demo ---------- */
const VB = { pending: "待處理", acknowledged: "待處理", open: "待處理", todo: "待處理", processing: "待完成", "in progress": "待完成", doing: "待完成",
  completed: "完成", done: "完成", delivered: "交付", rejected: "打回", "sent back": "打回", failed: "失敗", cancelled: "取消", canceled: "取消", blocked: "阻塞", alert: "警示" };
const verbIn = v => VB[String(v || "").toLowerCase()] || v;
function clearData(){ try { localStorage.removeItem("phx-galaxy"); localStorage.removeItem("phx-done"); localStorage.removeItem("phx-snooze"); } catch {} for (const p of Object.keys(store)) if (/^(clusters|signals|feeds|mytasks|done|snooze|ideas|skills|links|config)\//.test(p)) delete store[p]; }
function importData(d, { replace } = {}){
  if (!d || typeof d !== "object") return false;
  if (replace || (d.clusters && store["meta/source"]?.kind === "demo")) clearData();
  if (Array.isArray(d.clusters)) d.clusters.forEach((c, i) => { if (!c || !c.code) return; const { code, ...rest } = c; store["clusters/" + code] = { order: i, ...(store["clusters/" + code] || {}), ...clone(rest) }; });
  const ev = Array.isArray(d.events) ? d.events : null;
  if (ev) store["feeds/notion"] = { events: ev.map(e => ({ ...e, verb: verbIn(e.verb) })), syncedAt: d.syncedAt || new Date().toISOString() };
  if (Array.isArray(d.signals)) for (const s of d.signals){ if (!s || !s.id) continue; const { id, ...rest } = s; store["signals/" + id] = { ...rest, verb: verbIn(rest.verb) }; }
  if (Array.isArray(d.tasks)) for (const t of d.tasks){ if (!t || !t.id) continue; const { id, ...rest } = t; store["mytasks/" + id] = rest; }
  if (d.done && typeof d.done === "object") for (const [k, v] of Object.entries(d.done)) store["done/" + k] = { at: typeof v === "string" ? v : new Date().toISOString() };
  store["meta/source"] = { kind: d.kind || "sync", syncedAt: d.syncedAt || null, at: new Date().toISOString() };
  save(); notify(); return true;
}
function seed(){
  const already = Object.keys(store).some(p => p.startsWith("clusters/"));
  const snap = window.__PHX_DATA__ || window.__PHX_SNAPSHOT__;
  if (snap){
    const k = String(snap.syncedAt || snap.exportedAt || "");
    if (!already || store["meta/source"]?.kind === "demo" || (k && k !== store["meta/source"]?.syncedAt)) importData(snap);
    return;
  }
  if (!already && !store["meta/source"] && typeof window.__PHX_DEMO__ === "function") importData({ ...window.__PHX_DEMO__(), kind: "demo" }, { replace: true });
}
window.__phxData = d => { window.__PHX_DATA__ = d; seed(); };
/* re-read phx-data.js beside the page every 30 minutes, so a scheduled Notion sync shows up by itself */
setInterval(() => { const sc = document.createElement("script"); sc.src = "phx-data.js?t=" + Date.now(); sc.onload = sc.onerror = () => sc.remove(); document.head.appendChild(sc); }, 30 * 60 * 1000);

window.phxData = {
  reset(){ clearData(); delete store["meta/source"]; save(); seed(); notify(); },
  clear(){ clearData(); store["meta/source"] = { kind: "empty", at: new Date().toISOString() }; save(); notify(); },
  export(){ return clone(store); },
  restore(obj){ if (!obj || typeof obj !== "object") return false; store = clone(obj); save(); notify(); return true; },
  import: importData,
  source: () => store["meta/source"]?.kind || "empty"
};

/* ---------- AI with the viewer's own key (optional) ---------- */
const aiCfg = () => { try { return JSON.parse(localStorage.getItem(AIKEY) || "null"); } catch { return null; } };
function parseJSON(text){
  const t = String(text || "").replace(/```(?:json)?/g, "").trim();
  try { return JSON.parse(t); } catch {}
  const a = t.search(/[\[{]/), b = Math.max(t.lastIndexOf("}"), t.lastIndexOf("]"));
  if (a >= 0 && b > a) try { return JSON.parse(t.slice(a, b + 1)); } catch {}
  throw { code: "bad_json" };
}
async function ask(prompt){
  const c = aiCfg(); if (!c || !c.key) throw { code: "no_key" };
  const model = c.model || "claude-opus-5-5";
  const body = { model, max_tokens: 8000, output_config: { effort: c.effort || "low" }, messages: [{ role: "user", content: prompt }] };
  const headers = { "content-type": "application/json", "x-api-key": c.key, "anthropic-version": "2026-10-21", "anthropic-dangerous-direct-browser-access": "true" };
  if (/^claude-(opus-5|fable-5|sonnet-5-5)/.test(model)){ body.fallbacks = "default"; headers["anthropic-beta"] = "server-side-fallback-2026-07-01"; }
  const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw { code: j?.error?.type || "http_" + r.status, message: j?.error?.message };
  if (j.stop_reason === "refusal") throw { code: "refusal" };
  return (j.content || []).filter(b => b.type === "text").map(b => b.text).join("");
}
const sample = { async json(prompt){ return { data: parseJSON(await ask(prompt + "\n\nReply with JSON only.")) }; }, async text(prompt){ return { text: await ask(prompt) }; } };
window.phxAI = {
  get: () => { const c = aiCfg(); return c ? { model: c.model || "claude-opus-5-5", effort: c.effort || "low", hasKey: !!c.key } : null; },
  set: cfg => { try { if (cfg && cfg.key) localStorage.setItem(AIKEY, JSON.stringify(cfg)); else localStorage.removeItem(AIKEY); } catch {} },
  test: () => ask("Reply with the single word: ready")
};

/* ---------- downloads ---------- */
const downloads = { async save({ filename, data, mimeType }){
  const url = URL.createObjectURL(new Blob([data], { type: mimeType || (/\.html?$/.test(filename) ? "text/html" : "application/octet-stream") }));
  const a = Object.assign(document.createElement("a"), { href: url, download: filename }); document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
} };

const caps = {
  db: () => { seed(); return db; },
  user: () => ({ canEdit: async () => true, get: async () => ({ name: "you" }) }),
  sample: () => aiCfg()?.key ? sample : null,
  downloads: () => downloads
};
window.claude = { standalone: true, use: name => { const f = caps[name]; const v = f ? f() : null; return v ? Promise.resolve(v) : Promise.reject({ code: "unavailable" }); } };
})();
