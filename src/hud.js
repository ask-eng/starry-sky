/* ---------- HUD: corners, heading tape, core reticle with live readouts, radar, scan line — all adjustable ---------- */
const hud = (() => {
  const HDEF = { on: true, op: .7, col: "cyan", parts: { corners: true, tape: true, reticle: true, data: true, radar: true, scan: true },
    scene: { theme: "milky", stars: 1, planet: true, ring: true, aurora: true, sun: true, galaxy: false, lines: true, wisps: true, sat: true, comet: true, disk: true, grid: true, spikes: true, streak: true, sfx: true, art: true, routes: true, deep: true, holo: true, taa: true, vfog: true, ships: true, bands: true, week: true, plx: true, belt: true, moons: true, probes: true, station: true, night: true, rf: "all", tod: true, storm: true, dof: false, aur: "green" } };
  const THN = { milky: ["星河藍紫", "#8f7dff"], aurora: ["極光翠綠", "#5ff0c0"], solar: ["熔金日冕", "#ffb86b"], obsidian: ["深空黑曜", "#9fb0d8"] };
  const SB = [[.55, "柔和"], [.8, "適中"], [1, "標準"], [1.25, "明亮"]];
  const ELS = [["planet", "行星地平線"], ["ring", "軌道環"], ["aurora", "極光"], ["sun", "日出光芒"], ["galaxy", "遠方螺旋星系"], ["lines", "星座連線"], ["wisps", "前景星雲薄霧"], ["sat", "人造衛星"], ["comet", "慢速彗星"], ["disk", "核心吸積盤"], ["grid", "全息戰術網格"], ["streak", "變形鏡頭光暈"], ["sfx", "事件音效"], ["art", "星座插畫輪廓"], ["routes", "交接航道"], ["deep", "深空星系"], ["holo", "核心資料環"], ["taa", "時間抗鋸齒 TAA"], ["vfog", "核心體積光霧"], ["ships", "巡航飛船"], ["bands", "協作星雲帶"], ["week", "軌道環週曆"], ["plx", "視差星雲層"], ["belt", "小行星帶"], ["moons", "星座衛星"], ["probes", "新交接探測器"], ["station", "核心空間站"], ["night", "夜間自動調暗（22–6 點）"], ["tod", "依時間變化天空"], ["storm", "星雲雷暴"], ["dof", "選取時景深（背景微模糊）"]];
  const COLS = { cyan: ["青", "#8be6ff"], gold: ["金", "#f4cb72"], violet: ["紫", "#c4b2ff"], green: ["綠", "#7dffb2"] };
  const PARTS = [["corners", "畫面角框與座標"], ["tape", "頂部方位刻度"], ["reticle", "核心鎖定準星"], ["data", "即時數據讀數"], ["radar", "雷達小地圖"], ["scan", "掃描線"]];
  let hs; try { const v = JSON.parse(localStorage.getItem("phx-hud") || "null"); hs = v ? { ...HDEF, ...v, parts: { ...HDEF.parts, ...(v.parts || {}) }, scene: { ...HDEF.scene, ...(v.scene || {}) } } : structuredClone(HDEF); } catch { hs = structuredClone(HDEF); }
  const save = () => { try { localStorage.setItem("phx-hud", JSON.stringify(hs)); } catch {} };
  const el = $("hud"), tapeIn = $("hud-tape-in"), ret = $("hud-ret"), data = $("hud-data"), radar = $("hud-radar"), rc = radar.getContext("2d");
  // heading tape: two turns of ticks so it can scroll seamlessly
  const NAMES = { 0: "N", 90: "E", 180: "S", 270: "W" };
  tapeIn.innerHTML = Array.from({length: 144}, (_, i) => { const d = (i*5) % 360; return `<span class="${d % 30 ? "" : "m"}">${d % 30 ? "" : `<b>${NAMES[d] || String(d).padStart(3, "0")}</b>`}</span>`; }).join("");
  function apply(){
    el.hidden = !hs.on; el.style.setProperty("--ho", hs.op); el.style.setProperty("--hc", COLS[hs.col][1]);
    for (const [k] of PARTS) el.classList.toggle("off-" + k, !hs.parts[k]);
    engine.setScene?.(hs.scene);
  }
  apply();
  let last = 0, sweep = 0;
  function frame(now){
    requestAnimationFrame(frame);
    if (!hs.on || now - last < 33) return; const dt = Math.min(.1, (now - last)/1000); last = now;
    const st = engine.state?.(); if (!st) return;
    const d = new Date(); $("hud-clock").textContent = d.toTimeString().slice(0, 8);
    const hdg = ((st.theta*180/Math.PI) % 360 + 360) % 360, el2 = 90 - st.phi*180/Math.PI;
    $("hud-pos").textContent = `AZ ${String(Math.round(hdg)).padStart(3, "0")} · EL ${el2 >= 0 ? "+" : ""}${Math.round(el2)} · R ${Math.round(st.R)}`;
    if (hs.parts.tape){ $("hud-hdg").textContent = String(Math.round(hdg)).padStart(3, "0") + "°"; const w = $("hud-tape").clientWidth; tapeIn.style.transform = `translateX(${(w/2 - (hdg + 360)*1.6).toFixed(1)}px)`; }
    if (hs.parts.reticle || hs.parts.data){
      const vis = st.vis ? "" : "none";
      ret.style.display = hs.parts.reticle ? vis : "none"; ret.style.transform = `translate(${st.x.toFixed(1)}px,${st.y.toFixed(1)}px) scale(${Math.max(.6, Math.min(1.3, 900/st.R)).toFixed(3)})`;
      const lv = typeof beat !== "undefined" ? beat.lv : null, bars = lv ? Math.round(Math.min(1, lv.energy*1.6)*8) : 0;
      const open = signals.filter(isOpen).length, needN = allOpenNeeds().length;
      data.style.display = hs.parts.data && $("corepop")?.hidden !== false ? vis : "none"; data.style.transform = `translate(${(st.x + Math.max(190, Math.min(300, st.R*.22))).toFixed(1)}px,${(st.y - 120).toFixed(1)}px)`;
      data.innerHTML = `CORE <i>·</i> ONLINE\nNEEDS <i>·</i> ${needN}\nOPEN  <i>·</i> ${open}\nSYNC  <i>·</i> ${notionSyncedAt ? esc(ago(notionSyncedAt)) : "—"}\nDONE  <i>·</i> ${typeof todayDone === "function" ? todayDone() : 0} 今日\nFPS   <i>·</i> ${esc($("sfps").textContent)}`;
    }
    if (hs.parts.radar){
      const S = radar.width, c = S/2, col = COLS[hs.col][1]; rc.clearRect(0, 0, S, S); rc.strokeStyle = col; rc.fillStyle = col; rc.lineWidth = 1.2;
      rc.globalAlpha = .55; for (const r of [c - 4, c*.66, c*.33]){ rc.beginPath(); rc.arc(c, c, r, 0, Math.PI*2); rc.stroke(); }
      rc.globalAlpha = .25; rc.beginPath(); rc.moveTo(c, 6); rc.lineTo(c, S - 6); rc.moveTo(6, c); rc.lineTo(S - 6, c); rc.stroke();
      sweep += dt*1.6; const sg = rc.createConicGradient ? rc.createConicGradient(sweep - Math.PI/2, c, c) : null;
      if (sg){ sg.addColorStop(0, "rgba(139,230,255,0)"); sg.addColorStop(.92, "rgba(139,230,255,0)"); sg.addColorStop(1, col + "88"); rc.globalAlpha = .7; rc.fillStyle = sg; rc.beginPath(); rc.arc(c, c, c - 4, 0, Math.PI*2); rc.fill(); rc.fillStyle = col; }
      const ca = Math.atan2(st.cam.x, st.cam.z), cs = Math.cos(-ca), sn = Math.sin(-ca), sc = (c - 16)/520;
      rc.globalAlpha = .9; rc.beginPath(); rc.moveTo(c, c); rc.lineTo(c - 14, c + 26); rc.lineTo(c + 14, c + 26); rc.closePath(); rc.globalAlpha = .18; rc.fill();
      rc.globalAlpha = 1; rc.beginPath(); rc.arc(c, c, 3, 0, Math.PI*2); rc.fill();
      for (const b of st.blips){ const x = b.x*cs - b.z*sn, z = b.x*sn + b.z*cs, px = c + x*sc, py = c + z*sc;
        rc.fillStyle = b.c; rc.globalAlpha = st.sel && st.sel !== b.code ? .4 : 1; rc.beginPath(); rc.arc(px, py, b.code === st.sel ? 5 : 3.5, 0, Math.PI*2); rc.fill();
        if (b.k){ rc.strokeStyle = b.c; rc.globalAlpha = .5 + .5*Math.sin(now/300); rc.beginPath(); rc.arc(px, py, 8, 0, Math.PI*2); rc.stroke(); } }
      rc.globalAlpha = .8; rc.fillStyle = col; rc.font = "16px ui-monospace,monospace"; rc.fillText("RADAR", 10, S - 10); rc.globalAlpha = 1;
    }
  }
  requestAnimationFrame(frame);
  /* settings panel */
  const QN = { eco: "省電", bal: "平衡", ultra: "極致", k4: "4K" }, MN = { off: "關", low: "少量", high: "大量", storm: "流星暴" };
  function paint(){
    $("h-on").checked = hs.on; $("h-op").innerHTML = [.3, .5, .7, .85, 1].map(v => `<button type="button" class="chip ${Math.abs(hs.op - v) < .01 ? "on" : ""}" data-op="${v}">${Math.round(v*100)}%</button>`).join(""); $("h-op-o").textContent = Math.round(hs.op*100) + "%";
    $("h-col").innerHTML = Object.entries(COLS).map(([k, [n, c]]) => `<label style="--c:${c}"><input type="radio" name="hcol" value="${k}" ${hs.col === k ? "checked" : ""}><b style="color:${c}">● ${n}</b><small></small></label>`).join("");
    $("h-parts").innerHTML = PARTS.map(([k, t]) => `<label class="row"><input type="checkbox" data-hp="${k}" ${hs.parts[k] ? "checked" : ""}> ${t}</label>`).join("");
    $("h-met").innerHTML = Object.entries(MN).map(([k, n]) => `<label><input type="radio" name="hmet" value="${k}" ${engine.meteor?.() === k ? "checked" : ""}><b>${n}</b><small></small></label>`).join("");
    $("h-th").innerHTML = Object.entries(THN).map(([k, [n, c]]) => `<label><input type="radio" name="hth" value="${k}" ${hs.scene.theme === k ? "checked" : ""}><b style="color:${c}">● ${n}</b><small></small></label>`).join("");
    $("h-sb").innerHTML = SB.map(([v, n]) => `<button type="button" class="chip ${Math.abs(hs.scene.stars - v) < .01 ? "on" : ""}" data-sb="${v}">${n}</button>`).join("");
    $("h-rf").innerHTML = [["all", "全部"], ["high", "只看高優先"], ["sel", "只看選取的星座"]].map(([k, n]) => `<button type="button" class="chip ${(hs.scene.rf || "all") === k ? "on" : ""}" data-rf="${k}">${n}</button>`).join("");
  $("h-aur").innerHTML = [["green", "翠綠簾幕"], ["wave", "紫紅波浪"], ["rainbow", "全彩流光"]].map(([k, n]) => `<button type="button" class="chip ${hs.scene.aur === k ? "on" : ""}" data-aur="${k}">${n}</button>`).join("");
    $("h-el").innerHTML = ELS.map(([k, t]) => `<label class="row"><input type="checkbox" data-el="${k}" ${hs.scene[k] ? "checked" : ""}> ${t}</label>`).join("");
    const online = !!dbRef; $("h-export").hidden = !online;
    $("h-exnote").textContent = online ? "用目前的即時資料（含完成紀錄）產生一份離線桌布檔，存到下載資料夾；再到 Lively 換掉舊檔即可。" : "這是離線版。要更新資料：在瀏覽器開啟線上版，從這裡匯出新的離線桌布。";
    $("h-q").innerHTML = Object.entries(QN).map(([k, n]) => `<label><input type="radio" name="hq" value="${k}" ${engine.tier?.() === k ? "checked" : ""}><b>${n}</b><small></small></label>`).join("");
  }
  function open(v){ $("hpanel").hidden = !v; $("b-hud").classList.toggle("live", v); if (v) paint(); }
  $("b-hud").addEventListener("click", e => { e.stopPropagation(); if ($("vpanel") && !$("vpanel").hidden) openVPanel(false); open($("hpanel").hidden); });
  $("hclose").addEventListener("click", () => open(false));
  document.addEventListener("pointerdown", e => { if (!$("hpanel").hidden && !e.target.closest("#hpanel,#b-hud")) open(false); });
  addEventListener("keydown", e => { if (e.key === "Escape" && !$("hpanel").hidden){ e.preventDefault(); open(false); } });
  $("hpanel").addEventListener("change", e => { const t = e.target;
    if (t.id === "h-on") hs.on = t.checked; else if (t.name === "hcol") hs.col = t.value; else if (t.dataset.hp) hs.parts[t.dataset.hp] = t.checked;
    else if (t.name === "hth") hs.scene.theme = t.value; else if (t.dataset.el) hs.scene[t.dataset.el] = t.checked;
    else if (t.name === "hmet"){ engine.setMeteor?.(t.value); paintM(); } else if (t.name === "hq"){ engine.setTier?.(t.value); paintQ(); }
    save(); apply(); paint(); });
  $("h-rf").addEventListener("click", e => { const b = e.target.closest("[data-rf]"); if (!b) return; hs.scene.rf = b.dataset.rf; save(); apply(); paint(); if (typeof renderAll === "function") renderAll(); });
  $("h-aur").addEventListener("click", e => { const b = e.target.closest("[data-aur]"); if (!b) return; hs.scene.aur = b.dataset.aur; save(); apply(); paint(); });
  $("h-sb").addEventListener("click", e => { const b = e.target.closest("[data-sb]"); if (!b) return; hs.scene.stars = parseFloat(b.dataset.sb); save(); apply(); paint(); });
  $("h-export").addEventListener("click", () => exportOffline());
  $("h-op").addEventListener("click", e => { const b = e.target.closest("[data-op]"); if (!b) return; hs.op = parseFloat(b.dataset.op); save(); apply(); paint(); });
  return { apply };
})();
