/* ---------- language switch, your own AI key, local data (standalone runtime) ---------- */
(() => {
  const $ = id => document.getElementById(id);
  const S = !!window.claude?.standalone;
  // a one-click language button in the dock
  const hud = $("b-hud");
  if (hud){ const b = document.createElement("button"); b.type = "button"; b.className = "tool"; b.id = "b-lang"; b.setAttribute("data-noi18n", "");
    b.textContent = window.PHX_LANG === "en" ? "中文" : "EN"; b.title = window.PHX_LANG === "en" ? "切換成繁體中文" : "Switch to English";
    b.addEventListener("click", () => window.phxSetLang(window.PHX_LANG === "en" ? "zh" : "en")); hud.after(b); }
  const paintLang = () => document.querySelectorAll("#h-lang [data-lang]").forEach(c => c.classList.toggle("on", c.dataset.lang === window.PHX_LANG));
  $("h-lang")?.addEventListener("click", e => { const l = e.target.closest("[data-lang]")?.dataset.lang; if (l && l !== window.PHX_LANG) window.phxSetLang(l); });
  paintLang();
  if (!S) return;
  const say = (el, t) => { if ($(el)) $(el).textContent = t; };
  // AI
  $("h-ai").hidden = false;
  const paintAI = () => { const c = window.phxAI.get(); if (c) $("h-aimodel").value = c.model;
    say("h-ainote", c?.hasKey ? L("已儲存金鑰（只存在這個瀏覽器）。AI 計劃、AI-DLC 與 AI 台本已可使用；重新整理後生效。", "Key saved in this browser only. AI plan, AI-DLC and AI scripts are on after a reload.")
      : L("AI 功能需要你自己的 Anthropic API 金鑰。金鑰只存在這個瀏覽器，並直接從瀏覽器送到 api.anthropic.com。請只在你自己的電腦上使用。", "AI features need your own Anthropic API key. It is stored only in this browser and sent straight from it to api.anthropic.com. Use it on your own computer only.")); };
  $("h-aisave").addEventListener("click", () => { const key = $("h-aikey").value.trim(), cur = window.phxAI.get(); if (!key && !cur?.hasKey) return;
    let old = null; try { old = JSON.parse(localStorage.getItem("phx-ai") || "null"); } catch {}
    window.phxAI.set({ key: key || old?.key, model: $("h-aimodel").value, effort: "low" }); $("h-aikey").value = ""; paintAI(); });
  $("h-aidel").addEventListener("click", () => { window.phxAI.set(null); paintAI(); });
  $("h-aitest").addEventListener("click", async () => { say("h-ainote", L("測試中…", "Testing…")); try { const t = await window.phxAI.test(); say("h-ainote", L("連線成功：", "Connected: ") + String(t).slice(0, 40)); } catch (e){ say("h-ainote", L("失敗：", "Failed: ") + (e?.message || e?.code || e)); } });
  paintAI();
  // local data
  $("h-local").hidden = false;
  const paintLocal = () => { const k = window.phxData.source(); say("h-localnote", k === "demo" ? L("目前顯示的是示範資料。接上自己的 Notion：見 docs/notion.md。", "You are looking at demo data. To use your own Notion, see docs/notion.md.")
      : k === "sync" ? L("資料來自 phx-data.js（Notion 同步）。", "Data comes from phx-data.js (Notion sync).") : L("資料只存在這個瀏覽器。記得定期備份。", "Data lives only in this browser. Back it up now and then.")); };
  $("h-backup").addEventListener("click", () => { const a = Object.assign(document.createElement("a"), { href: URL.createObjectURL(new Blob([JSON.stringify(window.phxData.export(), null, 1)], { type: "application/json" })), download: `phoenix-nebula-backup-${new Date().toISOString().slice(0, 10)}.json` }); a.click(); });
  $("h-restore").addEventListener("change", async e => { const f = e.target.files?.[0]; if (!f) return; try { window.phxData.restore(JSON.parse(await f.text())); location.reload(); } catch { alert(L("這不是有效的備份檔。", "That isn't a valid backup file.")); } });
  $("h-demo").addEventListener("click", () => { if (confirm(L("用示範資料取代目前的資料？", "Replace the current data with demo data?"))){ window.phxData.reset(); location.reload(); } });
  $("h-empty").addEventListener("click", () => { if (confirm(L("清空所有專案與待辦，從零開始？", "Remove all projects and tasks and start empty?"))){ window.phxData.clear(); location.reload(); } });
  paintLocal();
})();
