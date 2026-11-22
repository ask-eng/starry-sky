/* ---------- PHOENIX AI narrator: a typed line that explains what the sky is doing ---------- */
const ai = (() => {
  const el = $("aisay"); let typing = null, lastSay = 0, idleK = 0;
  function say(text, force){
    if (window.phxT) text = phxT(text);
    if (!force && Date.now() - lastSay < 5000) return; lastSay = Date.now();
    clearInterval(typing); let i = 0; el.textContent = "";
    if (document.documentElement.classList.contains("still")){ el.textContent = text; return; }
    typing = setInterval(() => { i += 1; el.textContent = text.slice(0, i); if (i >= text.length) clearInterval(typing); }, 28);
  }
  function greet(){
    const h = new Date().getHours(), hi = h < 5 ? "夜深了" : h < 11 ? "早安" : h < 14 ? "午安" : h < 18 ? "下午好" : "晚安";
    const open = signals.filter(isOpen).length, live = clusters.filter(c => c.status !== "idle").length;
    say(`${hi}，指揮官。${clusters.length} 個星系中 ${live} 個在線，${open} 項交接等待處理。`, true);
  }
  function signal(s){
    const c = byCode(s.cluster); if (!c) return;
    const to = s.to && s.to !== s.cluster ? ` → ${byCode(s.to)?.name || s.to}` : " → 核心";
    say(`接收 ${c.name}${to}｜${s.verb || "訊號"}：${String(s.text || "").slice(0, 34)}`);
  }
  setInterval(() => {
    if (!document.body.classList.contains("booted") || Date.now() - lastSay < 14000) return;
    const open = signals.filter(isOpen), high = open.find(s => s.priority === "High" || s.priority === "Critical");
    const mods = allMods(), rep = mods.filter(x => x.m.updatedAt && Date.now() - new Date(x.m.updatedAt) < 7*DAY).length;
    const lines = [
      high ? `優先事項：${String(high.text).slice(0, 40)}（${byCode(high.cluster)?.name || high.cluster}）` : `目前沒有高優先的待處理交接。`,
      `模組回報率 ${mods.length ? Math.round(rep/mods.length*100) : 0}%，${mods.length - rep} 個模組超過 7 天未回報。`,
      notionSyncedAt ? `Notion 最近一次同步在 ${ago(notionSyncedAt)}，下一次排程會自動更新。` : `尚未收到 Notion 同步。`,
      `點任一條分支，可以看它正在做什麼、需要你做什麼；拖曳可以旋轉星雲。`,
    ];
    say(lines[idleK++ % lines.length], true);
  }, 4000);
  function announce(s){ if (!voice.narrating() || voice.busy() || !voice.available()) return; if (vset.narr === "important" && !(NEG.test(s.verb||"") || s.priority === "High" || s.priority === "Critical")) return; const c = byCode(s.cluster); if (!c) return; { const k = vset.cast, l = langOf(k), SL = subLang(), body = `${s.verb || "新訊號"}：${String(s.text || "").replace(/[｜|]/g, "，").slice(0, 80)}`, head = CAST[k].L[l].signal(c.name);
    voice.speak(l === "zh" ? [{ who: k, lang: l, emo: "bright", text: head + body }] : [{ who: k, lang: l, emo: "bright", text: head, sub: SL && SL !== l ? CAST[k].L[SL].signal(c.name) : "" }, { who: k, lang: window.PHX_LANG === "en" ? "en" : "zh", emo: "calm", text: body }]); } }
  return { say, greet, signal, announce };
})();

