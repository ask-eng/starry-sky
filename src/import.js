/* ---------- paste import ---------- */
$("tpl").textContent = TEMPLATE_TXT(); setInterval(() => { const t = TEMPLATE_TXT(); if ($("tpl").textContent !== t) $("tpl").textContent = t; }, 3000);
$("copy").addEventListener("click", e => {
  const b = e.currentTarget, done = ok => { b.textContent = ok ? "已複製" : "請手動選取上方文字"; setTimeout(() => b.textContent = "複製格式", 1800); };
  try { navigator.clipboard.writeText(TEMPLATE_TXT()).then(() => done(true), () => done(false)); } catch { done(false); }
});
function stripComments(src){
  src = src.replace(/```[a-zA-Z]*\n?/g, "").replace(/&#x20;|&#32;|&nbsp;| /g, " ").replace(/\\[ \t]*(\r?\n)/g, "$1");
  let out = "", inStr = false, escp = false;
  for (let i=0;i<src.length;i++){
    const ch = src[i];
    if (inStr){ out += ch; if (escp) escp = false; else if (ch === "\\") escp = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"'){ inStr = true; out += ch; continue; }
    if (ch === "/" && src[i+1] === "/"){ while (i < src.length && src[i] !== "\n") i++; out += "\n"; continue; }
    out += ch;
  }
  return out.replace(/,\s*([}\]])/g, "$1");
}
function parseReports(text){
  const s = stripComments(text).trim();
  if (!s) return {reports:[], errors:[]};
  let val;
  try { val = JSON.parse(s); }
  catch { try { val = JSON.parse("[" + s.replace(/}\s*{/g, "},{") + "]"); } catch { return {reports:[], errors:["JSON 格式有誤，請確認括號和引號完整。"]}; } }
  const list = Array.isArray(val) ? val : (Array.isArray(val?.reports) ? val.reports : [val]);
  const errors = [], reports = [];
  list.forEach((r, i) => {
    const tag = `第 ${i+1} 筆`;
    if (!r || typeof r !== "object"){ errors.push(`${tag}：不是物件`); return; }
    const code = String(r.cluster||"").trim().toUpperCase();
    if (!code){ errors.push(`${tag}：缺少 cluster`); return; }
    if (!byCode(code)){ errors.push(`${tag}：找不到星系 ${code}（可用：${clusters.map(c=>c.code).join(" / ")}）`); return; }
    const mod = String(r.module||"").trim();
    if (!mod){ errors.push(`${tag}：缺少 module`); return; }
    let load = r.load;
    if (load != null && load !== ""){ load = Number(load); if (!isFinite(load)){ errors.push(`${tag}：load 要是 0-100 的數字`); return; } load = Math.max(0, Math.min(100, Math.round(load))); } else load = null;
    const status = ["active","idle","alert"].includes(r.status) ? r.status : null;
    if (r.status && !status){ errors.push(`${tag}：status 只能是 active / idle / alert`); return; }
    const sigs = Array.isArray(r.signals) ? r.signals.filter(x => x && (x.text || x.verb)).map(x => ({
      verb: String(x.verb||"更新").slice(0,12), text: String(x.text||"").slice(0,200),
      to: x.to && byCode(String(x.to).toUpperCase()) ? String(x.to).toUpperCase() : null })) : [];
    reports.push({ code, module: mod.slice(0,80), load, status, task: r.task ? String(r.task).slice(0,160) : null, signals: sigs });
  });
  return {reports, errors};
}
function openModal(){ $("modal").hidden = false; setTimeout(() => $("imptxt").focus(), 0); }
function closeModal(){ $("modal").hidden = true; $("impbtn").focus(); }
$("impbtn").addEventListener("click", openModal);
$("impclose").addEventListener("click", closeModal);
$("modal").addEventListener("click", e => { if (e.target.id === "modal") closeModal(); });
function setupImport(db){
  const txt = $("imptxt"), msg = $("impmsg"), go = $("impgo");
  (async () => {
    const user = await (window.claude?.use?.("user") ?? Promise.resolve(null)).catch(() => null);
    const ok = user ? await user.canEdit().catch(() => false) : false;
    if (ok) $("impbtn").hidden = false;
  })();
  let parsed = {reports:[], errors:[]};
  const show = (t, cls) => { msg.textContent = t; msg.className = "impmsg" + (cls ? " " + cls : ""); };
  const check = () => {
    parsed = parseReports(txt.value);
    const n = parsed.reports.length, sc = parsed.reports.reduce((a,r) => a + r.signals.length, 0);
    if (!txt.value.trim()){ show("等待貼上"); go.disabled = true; return; }
    if (parsed.errors.length){ show(parsed.errors.join("\n"), "err"); go.disabled = true; return; }
    show(`可寫入 ${n} 個模組、${sc} 筆訊號：\n` + parsed.reports.map(r => `· ${r.code} / ${r.module}${r.load!=null?" "+r.load+"%":""}${r.status?" "+r.status:""}`).join("\n"));
    go.disabled = n === 0;
  };
  txt.addEventListener("input", check);
  $("impclr").addEventListener("click", () => { txt.value = ""; check(); txt.focus(); });
  go.addEventListener("click", async () => {
    check(); if (go.disabled) return;
    go.disabled = true; show("寫入中…");
    const now = Date.now(), stamp = new Date(now).toISOString();
    try {
      const byCluster = new Map();
      for (const r of parsed.reports){ if (!byCluster.has(r.code)) byCluster.set(r.code, []); byCluster.get(r.code).push(r); }
      for (const [code, reps] of byCluster){
        const c = byCode(code);
        const mods = (c.modules || []).map(m => typeof m === "string" ? m : {...m});
        let task = c.task || null;
        for (const r of reps){
          const i = matchModule(mods, r.module), prev = i >= 0 ? mods[i] : null, old = prev && typeof prev === "object" ? prev : {};
          const entry = { name: prev ? modName(prev) : r.module, updatedAt: stamp, load: r.load ?? old.load ?? null, status: r.status ?? old.status ?? "active", task: r.task ?? old.task ?? null };
          if (i >= 0) mods[i] = entry; else mods.push(entry);
          if (r.task) task = r.task;
        }
        const rep = mods.filter(m => typeof m === "object"), loads = rep.map(m => m.load).filter(v => typeof v === "number");
        const status = rep.some(m => m.status === "alert") ? "alert" : rep.some(m => m.status === "active") ? "active" : "idle";
        await db.doc("clusters/" + code).update({ modules: mods, load: loads.length ? Math.round(loads.reduce((a,b)=>a+b,0)/loads.length) : null, status, task, updatedAt: stamp });
      }
      let k = 0;
      for (const r of parsed.reports) for (const s of r.signals){
        const at = new Date(now + k).toISOString(); k++;
        const id = "s-" + at.replace(/[^0-9]/g, "").slice(0,17) + "-" + Math.random().toString(36).slice(2,6);
        await db.collection("signals").doc(id).set({ at, cluster: r.code, module: r.module, verb: s.verb, text: s.text, ...(s.to ? {to: s.to} : {}) });
      }
      const n = parsed.reports.length; txt.value = ""; parsed = {reports:[], errors:[]};
      show(`已寫入 ${n} 個模組、${k} 筆訊號。`, "ok"); go.disabled = true;
    } catch (e) {
      const code = e?.code;
      show(code === "invalid_argument" ? "寫入被拒絕：你目前沒有編輯權限。" : code === "quota_exceeded" ? "資料庫已滿，請 Claude 清理舊訊號。" : "寫入失敗，請稍後再試一次。（" + (code || "unknown") + "）", "err");
      go.disabled = false;
    }
  });
}

