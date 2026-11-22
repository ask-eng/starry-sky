/* ---------- soft event cues only (task done, focus end, big meteor). The music-rhythm feature was removed. ---------- */
const beat = (() => {
  let sctx = null, master = null, sfxBus = null, sfxOn = true;
  try { const v = JSON.parse(localStorage.getItem("phx-snd") || "null"); if (v) sfxOn = v.sfx !== false; } catch {}
  function ensureAudio(){ if (sctx){ sctx.resume?.(); return sctx; } sctx = new (window.AudioContext || window.webkitAudioContext)(); master = sctx.createGain(); master.gain.value = .45; master.connect(sctx.destination);
    sfxBus = sctx.createGain(); sfxBus.gain.value = .55; sfxBus.connect(master); return sctx; }
  const noiseBuf = () => { const b = sctx.createBuffer(1, sctx.sampleRate*2, sctx.sampleRate), d = b.getChannelData(0); for (let i=0;i<d.length;i++) d[i] = Math.random()*2 - 1; return b; };
  function env(g, t, a, peak, d){ g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + d); }
  function sfx(kind){
    if (!sfxOn || !sctx || sctx.state !== "running") return; const t = sctx.currentTime;
    if (kind === "meteor"){ const n = sctx.createBufferSource(); n.buffer = noiseBuf(); const bp = sctx.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 3; bp.frequency.setValueAtTime(2400, t); bp.frequency.exponentialRampToValueAtTime(350, t + .7); const g = sctx.createGain(); env(g, t, .05, .16, .7); n.connect(bp); bp.connect(g); g.connect(sfxBus); n.start(t); n.stop(t + .9); }
    else if (kind === "pulse"){ const o = sctx.createOscillator(), g = sctx.createGain(); o.frequency.setValueAtTime(330, t); o.frequency.exponentialRampToValueAtTime(660, t + .25); env(g, t, .02, .1, .35); o.connect(g); g.connect(sfxBus); o.start(t); o.stop(t + .45); }
    else if (kind === "done"){ [880, 1320, 1760].forEach((f, i) => { const o = sctx.createOscillator(), g = sctx.createGain(); o.type = "sine"; o.frequency.value = f; env(g, t + i*.07, .005, .18 - i*.04, .9); o.connect(g); g.connect(sfxBus); o.start(t + i*.07); o.stop(t + i*.07 + 1.1); }); }
  }
  addEventListener("pointerdown", () => { if (sfxOn) ensureAudio(); }, { once: true });
  const setSfx = v => { sfxOn = !!v; try { localStorage.setItem("phx-snd", JSON.stringify({ mode: "off", sfx: sfxOn })); } catch {} if (sfxOn) try { ensureAudio(); } catch {} };
  return { tick: () => null, spec: null, lv: null, on: () => false, sfx, setSfx };
})();
