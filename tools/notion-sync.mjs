#!/usr/bin/env node
// Notion → phx-data.js
//
// Reads one Notion database (read-only) and writes phx-data.js next to index.html.
// The page picks the file up on load and re-reads it every 30 minutes.
//
//   NOTION_TOKEN=secret_xxx node tools/notion-sync.mjs [path/to/notion-sync.config.json]
//
// Requires Node 18+ (built-in fetch). No dependencies.
// See docs/notion.md for setup, and tools/notion-sync.config.example.json for every option.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const cfgPath = resolve(process.argv[2] || "tools/notion-sync.config.json");
const cfg = JSON.parse(await readFile(cfgPath, "utf8"));
const token = process.env.NOTION_TOKEN || cfg.token;
if (!token) fail("Set NOTION_TOKEN (an internal integration secret) or \"token\" in the config.");
if (!cfg.database) fail("Set \"database\" (the database ID) in the config.");

const P = { title: "Title", module: "Module", target: "Target", status: "Status", priority: "Priority", created: null, ...(cfg.properties || {}) };
const moduleMap = cfg.moduleMap || {};
const skip = cfg.skip ? new RegExp(cfg.skip, "i") : null;
const out = resolve(dirname(cfgPath), cfg.out || "../phx-data.js");

// Notion status → the dashboard's verbs. Anything else is shown as written.
const VERB = { "not started": "Pending", pending: "Pending", todo: "Pending", "to do": "Pending", acknowledged: "Pending",
  "in progress": "In progress", processing: "In progress", doing: "In progress",
  done: "Done", completed: "Done", complete: "Done", delivered: "Delivered",
  rejected: "Rejected", "sent back": "Rejected", failed: "Failed", blocked: "Blocked", cancelled: "Cancelled", canceled: "Cancelled",
  ...(cfg.statusMap || {}) };

function fail(msg){ console.error("notion-sync: " + msg); process.exit(1); }
function text(prop){
  if (!prop) return "";
  switch (prop.type){
    case "title": case "rich_text": return (prop[prop.type] || []).map(t => t.plain_text).join("");
    case "select": case "status": return prop[prop.type]?.name || "";
    case "multi_select": return (prop.multi_select || []).map(o => o.name).join(", ");
    case "date": return prop.date?.start || "";
    case "created_time": return prop.created_time || "";
    case "last_edited_time": return prop.last_edited_time || "";
    case "number": return prop.number == null ? "" : String(prop.number);
    case "formula": return String(prop.formula?.[prop.formula?.type] ?? "");
    case "relation": return "";
    default: return "";
  }
}

async function query(){
  const rows = []; let cursor;
  for (let page = 0; page < 20; page++){
    const res = await fetch(`https://api.notion.com/v1/databases/${cfg.database}/query`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Notion-Version": cfg.notionVersion || "2022-06-28", "Content-Type": "application/json" },
      body: JSON.stringify({ page_size: 100, ...(cursor ? { start_cursor: cursor } : {}), sorts: [{ timestamp: "created_time", direction: "descending" }] })
    });
    const j = await res.json();
    if (!res.ok) fail(`Notion API ${res.status}: ${j.message || JSON.stringify(j)}`);
    rows.push(...j.results);
    if (!j.has_more || rows.length >= (cfg.limit || 500)) break;
    cursor = j.next_cursor;
  }
  return rows;
}

const rows = await query();
const events = [], lastByModule = {};
for (const r of rows){
  const p = r.properties || {};
  const title = text(p[P.title]), module = text(p[P.module]);
  if (!title || (skip && skip.test(title))) continue;
  const cluster = moduleMap[module]; if (!cluster) continue;
  const at = (P.created ? text(p[P.created]) : "") || r.created_time;
  const st = text(p[P.status]);
  const e = { id: "n-" + r.id.replace(/-/g, ""), at, cluster, module, verb: VERB[st.toLowerCase()] || st || "Pending", text: title.slice(0, 180), notion: r.id.replace(/-/g, "") };
  const pr = text(p[P.priority]); if (pr) e.priority = pr;
  const to = moduleMap[text(p[P.target])]; if (to && to !== cluster) e.to = to;
  events.push(e);
  if (!lastByModule[module] || at > lastByModule[module]) lastByModule[module] = at;
}

// clusters: from the config, with the modules that map to each one
const clusters = (cfg.clusters || []).map((c, i) => ({
  code: c.code, name: c.name || c.code, color: c.color, order: i, status: c.status || "active", task: c.task || "",
  modules: Object.entries(moduleMap).filter(([, code]) => code === c.code).map(([name]) => ({ name, status: "active", updatedAt: lastByModule[name] || null }))
}));

const data = { clusters, events, syncedAt: new Date().toISOString() };
await writeFile(out, `/* written by tools/notion-sync.mjs — do not edit by hand */\n(window.__phxData || (d => window.__PHX_DATA__ = d))(${JSON.stringify(data).replace(/</g, "\\u003c")});\n`);
console.log(`notion-sync: ${events.length} events, ${clusters.length} clusters → ${out}`);
