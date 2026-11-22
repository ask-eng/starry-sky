/* voice settings popover */
const SECS = [["urgent","最著急（警示、High、打回）"],["today","今天該做（Daily 與各星系任務）"],["open","還沒完成（待處理交接、未回報模組）"],["clusters","各星系概況（負載與待處理數）"],["sync","同步狀態（Notion 與最近 Daily）"]];
const NARR = [["all","全部新訊號","每筆新進的訊號都播"],["important","只播重要的","打回、警示、High"]];
const castCard = (k, name, sel) => { const c = CAST[k]; return `<label style="--c:${c.color}"><input type="radio" name="${name}" value="${k}" ${sel ? "checked" : ""}><i>${esc(c.name.slice(0, 1))}</i><b>${esc(c.name)}<em>${c.en}</em></b><small>${esc(c.role)}</small><span class="lg">${LANGS[langOf(k)]}</span></label>`; };
function paintVFoot(){
  $("vfoot").innerHTML = voice.busy() ? `<button type="button" class="btn" data-vstop>■ 停止</button>`
    : `<button type="button" class="btn" data-vtest="${vset.cast}">▶ 試聽 ${esc(CAST[vset.cast].name)}</button>${vset.duo ? `<button type="button" class="btn" data-vtest="duo">▶ 試聽對談</button>` : ""}<button type="button" class="btn go" id="vbrief">🔊 播放今日簡報</button>`;
}
function paintVPanel(){
  $("vcast").innerHTML = CAST_KEYS.map(k => castCard(k, "vcast", vset.cast === k)).join("");
  $("vmode").innerHTML = [["solo","單人播報","主播一人從頭講到尾"],["duo","雙人對談","主播報告，搭檔接話補充"]].map(([k, t, d]) => `<label><input type="radio" name="vmode" value="${k}" ${(vset.duo ? "duo" : "solo") === k ? "checked" : ""}><b>${t}</b><small>${d}</small></label>`).join("");
  $("vpartner-wrap").hidden = !vset.duo;
  $("vpartner").innerHTML = CAST_KEYS.filter(k => k !== vset.cast).map(k => castCard(k, "vpartner", vset.partner === k)).join("");
  $("vlang").innerHTML = [["ja","全部日本語","日語為主（推薦）"],["auto","依角色","雪菜・蒼真・琉璃・凜：日語｜鳳凰・鐵山：中文"],["zh","全部中文","台灣華語"],["en","全部 English","English"]]
    .map(([k, t, d]) => `<label><input type="radio" name="vlang" value="${k}" ${vset.lang === k ? "checked" : ""}><b>${t}</b><small>${d}</small></label>`).join("");
  const sysN = LANGS[sysLang()];
  $("vsub").innerHTML = [["auto", `自動`, `跟系統：${sysN}`], ["zh", "中文", "繁體"], ["ja", "日本語", ""], ["en", "English", ""], ["off", "關閉", "不顯示"]]
    .map(([k, t, d]) => `<label><input type="radio" name="vsub" value="${k}" ${(vset.subLang || "auto") === k ? "checked" : ""}><b>${t}</b><small>${d}</small></label>`).join("");
  $("vai").checked = !!vset.ai; $("vai").disabled = !sampleFn;
  const hasC = voice.claude(), hasS = voice.synth();
  const curE = vset.engine === "claude" || vset.engine === "system" ? vset.engine : "auto";
  $("vengine").innerHTML = [["auto","自動（建議）",voice.natural() ? "偵測到 Edge 自然語音：男女聲線正確" : "沒有自然語音時用 Claude 聲音", !(hasC || hasS)],["system","Edge／系統神經語音","男女分明，可逐一指定、試聽", !hasS],["claude","Claude 聲音","非英文時可能都變成同一種聲線", !hasC]]
    .map(([k, t, d, off]) => `<label class="${off ? "off" : ""}"><input type="radio" name="vengine" value="${k}" ${curE === k ? "checked" : ""} ${off ? "disabled" : ""}><b>${t}</b><small>${off ? "此環境不提供" : d}</small></label>`).join("");
  const who = [vset.cast, ...(vset.duo ? [vset.partner] : [])];
  if (voice.engine() === "system"){
    const rows = who.map(k => { const lang = langOf(k), vs = voice.voicesFor(lang), cur = vset.sv[k + ":" + lang] || "", auto = voice.sysVoice(k, lang).v;
      return `<label class="svrow" style="--c:${CAST[k].color}"><b>${esc(CAST[k].name)}</b><small>${LANGS[lang]} · ${CAST[k].g === "m" ? "男聲" : "女聲"}</small><button type="button" class="chip" data-try="${k}" title="試聽">▶</button><select data-sv="${k}:${lang}" aria-label="${esc(CAST[k].name)}的聲音"><option value="">自動${auto ? `：${esc(auto.name.replace(/^Microsoft\s*/, "").replace(/\s*-.*$/, ""))}` : "（找不到這個語言的語音）"}</option>${vs.filter(v => voice.gx(v) !== (CAST[k].g === "m" ? "f" : "m")).map(v => `<option value="${esc(v.name)}" ${cur === v.name ? "selected" : ""}>${/Natural|Online/i.test(v.name) ? "★ " : ""}${esc(v.name.replace(/^Microsoft\s*/, ""))}${/Multilingual/i.test(v.name) ? "（多語）" : ""}</option>`).join("")}</select></label>`; }).join("");
    const missing = who.map(k => langOf(k)).filter((l, i, a) => a.indexOf(l) === i && !voice.voicesFor(l).length);
    $("vsys").innerHTML = rows + (missing.length ? `<p class="vnote">這台電腦缺少${missing.map(l => LANGS[l]).join("、")}語音。Windows：設定 → 時間與語言 → 語音 → 新增語音（中文（台灣）／日本語）。用 Microsoft Edge 開啟時，還會多出更自然的線上神經語音。</p>` : "");
  } else $("vsys").innerHTML = "";
  $("vrate").innerHTML = [.8, .9, 1, 1.1, 1.2, 1.35].map(r => `<button type="button" class="chip ${Math.abs(vset.rate - r) < .01 ? "on" : ""}" data-rate="${r}">${r.toFixed(2).replace(/0$/, "").replace(/\.0$/, ".0")}×</button>`).join("");
  $("vrate-o").textContent = Number(vset.rate).toFixed(2).replace(/0$/, "") + "×";
  $("vsecs").innerHTML = SECS.map(([k, t]) => `<label class="row"><input type="checkbox" data-sec="${k}" ${vset.sections[k] ? "checked" : ""}> ${t}</label>`).join("");
  $("vgreet").checked = !!vset.greet; $("vauto").checked = !!vset.autoBrief; $("vdonev").checked = !!vset.doneVoice;
  $("vnarr").innerHTML = NARR.map(([k, t, d]) => `<label><input type="radio" name="vnarr" value="${k}" ${vset.narr === k ? "checked" : ""}><b>${t}</b><small>${d}</small></label>`).join("");
  $("vnote").textContent = !voice.available() ? "這個檢視無法播放語音，或你已在此頁面的權限選單關閉朗讀；簡報仍會以文字顯示。"
    : "角色都是原創的。旁白要在底部「旁白 開」時才會播報新訊號；播報中按 Esc 或字幕上的 ■ 可以停止。";
  paintVFoot();
}
function openVPanel(open){ $("vpanel").hidden = !open; $("b-vset").setAttribute("aria-expanded", String(open)); $("b-vset").classList.toggle("live", open); if (open) paintVPanel(); }
$("b-vset").addEventListener("click", e => { e.stopPropagation(); openVPanel($("vpanel").hidden); });
$("vclose").addEventListener("click", () => openVPanel(false));
document.addEventListener("pointerdown", e => { if (!$("vpanel").hidden && !e.target.closest("#vpanel,#b-vset,#cap")) openVPanel(false); });
$("vpanel").addEventListener("change", e => {
  const t = e.target;
  if (t.name === "vcast"){ vset.cast = t.value; if (vset.partner === t.value) vset.partner = CAST_KEYS.find(k => k !== t.value); }
  else if (t.name === "vpartner") vset.partner = t.value;
  else if (t.name === "vmode") vset.duo = t.value === "duo";
  else if (t.name === "vengine"){ if (voice.busy()) voice.stop(); vset.engine = t.value; }
  else if (t.name === "vnarr") vset.narr = t.value;
  else if (t.name === "vlang") vset.lang = t.value;
  else if (t.name === "vsub") vset.subLang = t.value;
  else if (t.id === "vai") vset.ai = t.checked;
  else if (t.dataset.sv){ if (t.value) vset.sv[t.dataset.sv] = t.value; else delete vset.sv[t.dataset.sv]; }
  else if (t.dataset.sec) vset.sections[t.dataset.sec] = t.checked;
  else if (t.id === "vgreet") vset.greet = t.checked;
  else if (t.id === "vauto") vset.autoBrief = t.checked;
  else if (t.id === "vdonev") vset.doneVoice = t.checked;
  saveV(); paintVPanel(); if (view === "brief") renderBrief();
});
$("vsys").addEventListener("click", e => { const b = e.target.closest("[data-try]"); if (!b) return; e.preventDefault(); const k = b.dataset.try, lang = langOf(k), L = CAST[k].L[lang] || CAST[k].L.ja; voice.speak([{ who: k, lang, text: L.test || L.close }]); });
$("vrate").addEventListener("click", e => { const b = e.target.closest("[data-rate]"); if (!b) return; vset.rate = parseFloat(b.dataset.rate); saveV(); paintVPanel(); });
$("vpanel").addEventListener("click", e => {
  if (e.target.closest("[data-vstop]")){ voice.stop(); return; }
  const tb = e.target.closest("[data-vtest]");
  if (tb){ if (voice.busy()) voice.stop(); const k = tb.dataset.vtest;
    const SL = subLang(), ln = w => ({ who: w, emo: "warm", text: P(w).test, sub: SL && SL !== langOf(w) ? CAST[w].L[SL].test : "" });
    voice.speak(k === "duo" ? [ln(vset.cast), ln(vset.partner)] : [ln(k)]); return; }
  if (e.target.closest("#vbrief")){ openVPanel(false); if (voice.busy()) voice.stop(); playBrief(); }
});
$("capstop").addEventListener("click", () => voice.stop());
window.speechSynthesis?.addEventListener?.("voiceschanged", () => { if (!$("vpanel").hidden) paintVPanel(); });

$("b-narr").addEventListener("click", () => { voice.setNarr(!voice.narrating()); if (voice.narrating() && voice.available() && !voice.busy()) voice.speak([{ who: vset.cast, emo: "bright", text: P(vset.cast).narrOn, sub: subLang() && subLang() !== langOf(vset.cast) ? CAST[vset.cast].L[subLang()].narrOn : "" }]); });

/* panels scroll by dragging anywhere that is not a control */
document.addEventListener("pointerdown", e => {
  const pn = e.target.closest(".vpanel"); if (!pn || e.target.closest("input,button,select,label,a,output")) return;
  const y0 = e.clientY, s0 = pn.scrollTop; let moved = false;
  const mv = ev => { const dy = ev.clientY - y0; if (Math.abs(dy) > 3){ moved = true; pn.classList.add("dragging"); } pn.scrollTop = s0 - dy; };
  const up = () => { removeEventListener("pointermove", mv); removeEventListener("pointerup", up); pn.classList.remove("dragging"); };
  addEventListener("pointermove", mv); addEventListener("pointerup", up);
});
