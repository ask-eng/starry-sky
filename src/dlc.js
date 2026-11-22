/* ---------- AI-DLC: an information entrance and a production chain for fuzzy ideas ----------
   Step 1 define the problem · Step 2 break the structure (long-term knowledge / project material / passing thought / reusable Skill / workbench task)
   Step 3 AI steps in by rules (file under a line of work, reuse what exists, turn repeated work into a Skill) · Step 4 everything lands on this one map. */
const dlc = (() => {
  const TYPES = ["工作台任務", "項目資料", "長期知識", "臨時想法", "可沉澱 Skill"], TCOL = { "工作台任務": "#f4cb72", "項目資料": "#7cc0ff", "長期知識": "#a3e86b", "臨時想法": "#c4b2ff", "可沉澱 Skill": "#ff8fc8" };
  let db = null, ideas = [], skills = [], tab = "in", busy = "", bd = null;
  const L = k => { try { return JSON.parse(localStorage.getItem(k) || "[]") || []; } catch { return []; } };
  const S = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };
  ideas = L("phx-ideas"); skills = L("phx-skills");
  const nid = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
  async function put(col, id, data){ if (db && canWrite){ try { await db.doc(col + "/" + id).set(data); return; } catch (e){ toast("沒能存到雲端（" + (e?.code || "錯誤") + "），先存在這台電腦。"); } }
    const arr = col === "ideas" ? ideas : skills, i = arr.findIndex(x => x.id === id); if (i >= 0) arr[i] = { id, ...data }; else arr.unshift({ id, ...data }); S(col === "ideas" ? "phx-ideas" : "phx-skills", arr); paint(); }
  async function del(col, id){ if (db && canWrite){ try { await db.doc(col + "/" + id).delete(); return; } catch {} }
    const arr = col === "ideas" ? ideas : skills, i = arr.findIndex(x => x.id === id); if (i >= 0) arr.splice(i, 1); S(col === "ideas" ? "phx-ideas" : "phx-skills", arr); paint(); }
  function wire(d){ db = d; const sub = (col, set) => d.collection(col).onSnapshot(snap => { set(snap.docs.map(x => ({ id: x.id, ...x.data() })).sort((a, b) => String(b.at).localeCompare(String(a.at)))); paint(); }, () => {});
    sub("ideas", v => { ideas = v.length || !ideas.length ? v : ideas; }); sub("skills", v => { skills = v.length || !skills.length ? v : skills; }); }
  const ai = async (prompt, ms) => { if (typeof sampleFn === "undefined" || !sampleFn) throw { code: "no_ai" };
    const res = await Promise.race([sampleFn.json(prompt + AI_LANG_NOTE(), { modelTier: "quick" }), new Promise((_, rej) => setTimeout(() => rej({ code: "timeout" }), ms || 40000))]); return res?.data ?? res; };
  const why = e => e?.code === "no_ai" ? "這個檢視無法使用 AI。" : "AI 沒有回應成功（" + (e?.code || "錯誤") + "），請再試一次。";
  const clusterBrief = () => clusters.map(c => ({ code: c.code, name: c.name, task: String(c.task || "").slice(0, 80), modules: modsOf(c).map(m => m.name).slice(0, 8) }));

  /* Steps 1–3 for a fuzzy idea: real problem, where it belongs, what kind of thing it is, next step */
  async function file(text){ text = String(text || "").trim(); if (!text){ toast("先寫下一個想法。"); return; } busy = "file"; paint();
    const prompt = `你是使用者的 AI 工作台，依 AI-DLC 處理一則剛記下的想法。
第一步・定義問題：找出這則想法背後真正的底層問題（一句話，不要重述原文）。
第二步・拆解結構：判斷它屬於哪一類：${TYPES.join("、")}。
第三步・AI 按規則介入：把它歸到最相關的業務線（從 CLUSTERS 選一個 code；都不相關填 "NONE"），並給一個具體、可在 30 分鐘內開始的下一步。
規則：只根據 IDEA 與 CLUSTERS，不要杜撰事實、數字或日期；用繁體中文。
回傳 JSON：{"title":"不超過18字的標題","problem":"","type":"","cluster":"","next":"","reason":"為什麼這樣歸類，一句話"}
CLUSTERS：${JSON.stringify(clusterBrief())}
IDEA：${JSON.stringify(text.slice(0, 800))}`;
    try { const r = await ai(prompt); if (!r || !r.type) throw { code: "shape" }; if (!TYPES.includes(r.type)) r.type = "臨時想法"; if (!byCode(r.cluster)) r.cluster = "NONE";
      await put("ideas", nid("i"), { text: text.slice(0, 800), at: new Date().toISOString(), ai: r, status: "filed" }); $("dlc-in").value = ""; toast("已歸檔：" + (r.title || r.type)); }
    catch (e){ toast(why(e)); } finally { busy = ""; paint(); } }
  async function keep(text){ text = String(text || "").trim(); if (!text) return; await put("ideas", nid("i"), { text: text.slice(0, 800), at: new Date().toISOString(), ai: null, status: "raw" }); $("dlc-in").value = ""; toast("已先存進想法入口，稍後可以再請 AI 歸檔。"); }
  async function toTask(idea){ const code = idea.ai?.cluster && byCode(idea.ai.cluster) ? idea.ai.cluster : (selected || clusters[0]?.code); if (!code || !dbRef){ toast("沒有可加入的分支。"); return; }
    if (!canWrite){ toast("沒有編輯權限，無法新增待辦。"); return; }
    await dbRef.doc("mytasks/t" + Date.now().toString(36)).set({ cluster: code, text: String(idea.ai?.next || idea.ai?.title || idea.text).slice(0, 120), at: new Date().toISOString(), from: "AI-DLC" });
    await put("ideas", idea.id, { ...stripId(idea), status: "task" }); toast("已加入「" + (byCode(code)?.name || code) + "」的待辦。"); }
  const stripId = o => { const { id, ...r } = o; return r; };

  /* Step 1–2 for one task: the real problem, sub-steps (who does what), acceptance, reusable Skill */
  async function breakdown(id){ const n = needIndex.get(id) || allOpenNeeds().find(x => x.id === id); if (!n){ toast("找不到這件待辦。"); return; }
    open(true, "bd"); bd = { n, r: null }; busy = "bd"; paint();
    const prompt = `你是使用者的 AI 工作台，依 AI-DLC 拆解一件待辦。
第一步・定義問題：這件事真正要解決的底層問題（一句話）。
第二步・拆解結構：拆成 3–5 個可執行的子步驟，每步標明由「AI」還是「我」做（能交給 AI 的就交給 AI）。
再給驗收標準（做到什麼算完成），以及如果這類工作會重複出現，給一個可沉澱成 Skill 的名稱與可重複使用的指令模板（不重複就留空字串）。
規則：只根據 TASK，不要杜撰事實、數字或日期；用繁體中文。
回傳 JSON：{"problem":"","steps":[{"do":"","who":"AI 或 我"}],"done_when":"","skill_name":"","skill_prompt":""}
TASK：${JSON.stringify({ task: String(n.text).slice(0, 200), project: n.c.name, kind: kindStyle[n.kind][0], context: String(n.why).slice(0, 120), current_focus: String(n.c.task || "").slice(0, 100) })}`;
    try { const r = await ai(prompt); if (!r || !Array.isArray(r.steps)) throw { code: "shape" }; bd = { n, r }; } catch (e){ toast(why(e)); bd = { n, r: null, err: why(e) }; } finally { busy = ""; paint(); } }
  async function stepsToTasks(){ if (!bd?.r || !dbRef || !canWrite){ toast("沒有編輯權限，無法新增待辦。"); return; } let k = 0;
    for (const s of bd.r.steps.slice(0, 5)) await dbRef.doc("mytasks/t" + Date.now().toString(36) + (k++)).set({ cluster: bd.n.c.code, text: `${s.who === "AI" ? "〔AI〕" : ""}${String(s.do).slice(0, 110)}`, at: new Date().toISOString(), from: "AI-DLC" });
    toast(`已把 ${k} 個子步驟加入「${bd.n.c.name}」。`); }

  /* Step 3: find repeated work worth turning into a Skill (only patterns seen at least twice) */
  async function findSkills(){ busy = "sk"; paint();
    const items = allOpenNeeds().slice(0, 40).map(n => n.text).concat(signals.slice(0, 80).map(s => s.text)).map(x => String(x).slice(0, 90));
    const prompt = `你是使用者的 AI 工作台。依 AI-DLC 第三步「重複任務沉澱為 Skill」，從 ITEMS（使用者真實的待辦與工作紀錄）找出至少出現兩次的同類工作，最多 4 種。
每種給：名稱、觸發情境、給 Claude 的可重複指令模板（用 {變數} 標出每次要替換的部分）、以及 2 個來自 ITEMS 的原文例子。沒有重複模式就回傳空陣列。不要杜撰；用繁體中文。
回傳 JSON：{"skills":[{"name":"","when":"","prompt":"","examples":["",""]}]}
ITEMS：${JSON.stringify(items)}`;
    try { const r = await ai(prompt, 50000); const arr = Array.isArray(r?.skills) ? r.skills : []; sugg = arr.filter(s => s && s.name && s.prompt).slice(0, 4); if (!sugg.length) toast("目前沒找到明顯重複的工作。"); }
    catch (e){ toast(why(e)); } finally { busy = ""; paint(); } }
  let sugg = [];
  const saveSkill = s => put("skills", nid("k"), { name: String(s.name).slice(0, 40), when: String(s.when || "").slice(0, 120), prompt: String(s.prompt).slice(0, 1500), at: new Date().toISOString(), uses: 0 });

  /* --- panel --- */
  const st = document.createElement("style"); st.textContent = `
.vpanel.dlcp{width:min(760px,calc(100vw - 32px))}
.dlcp .cyc{display:flex;flex-wrap:wrap;align-items:center;gap:5px;margin:2px 0 10px;font-size:11.5px}.dlcp .cyc span{padding:3px 8px;border-radius:7px;background:rgba(150,120,255,.14);border:1px solid rgba(180,160,255,.28);color:#d9ceff}.dlcp .cyc span.on{background:rgba(150,120,255,.4);color:#fff}.dlcp .cyc b{color:#a796ff;font-weight:400}
.dlcp .tabs{display:flex;gap:6px;margin-bottom:10px}.dlcp textarea{width:100%;box-sizing:border-box;min-height:70px;resize:vertical;background:rgba(0,0,0,.28);border:1px solid var(--line);border-radius:10px;color:inherit;padding:9px 10px;font:inherit;font-size:13px}
.dlcp .row{display:flex;gap:6px;flex-wrap:wrap;margin-top:8px}.dlcp .list{display:flex;flex-direction:column;gap:8px;margin-top:12px}
.dlcp .it{padding:10px 12px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.025);font-size:12.5px;line-height:1.55}
.dlcp .it h5{margin:0 0 4px;font-size:13.5px;display:flex;gap:8px;align-items:center;flex-wrap:wrap}.dlcp .tag{font-size:10.5px;padding:1px 7px;border-radius:999px;border:1px solid var(--tc);color:var(--tc)}
.dlcp .it .k{color:var(--faint);font-size:11px;margin-right:4px}.dlcp .it pre{white-space:pre-wrap;margin:6px 0 0;font-size:11.5px;background:rgba(0,0,0,.25);padding:8px;border-radius:8px;max-height:140px;overflow:auto}
.dlcp ol{margin:6px 0;padding-left:20px}.dlcp li .who{font-size:10.5px;padding:0 6px;border-radius:6px;margin-right:6px;background:rgba(255,255,255,.08)}.dlcp li .who.ai{background:rgba(150,120,255,.3)}
.dlcp .empty{color:var(--faint);font-size:12.5px}.dlcp .mapg{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:8px;margin-top:10px}.dlcp .mapg div{padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid var(--line);font-size:12px}`;
  document.head.appendChild(st);
  const pn = document.createElement("div"); pn.className = "vpanel dlcp"; pn.id = "dlcpanel"; pn.hidden = true; pn.setAttribute("role", "dialog"); pn.setAttribute("aria-label", "AI-DLC 工作流"); document.body.appendChild(pn);
  function open(v, t){ if (t) tab = t; pn.hidden = !v; $("b-dlc")?.classList.toggle("live", v); if (v) paint(); }
  const CYC = [["想法", "in"], ["文檔", "in"], ["方案", "bd"], ["任務", "bd"], ["AI 執行", "sk"], ["驗收＆復盤", "map"]];
  function ideaHTML(x){ const r = x.ai, c = r && byCode(r.cluster);
    return `<div class="it" data-id="${esc(x.id)}"><h5>${r ? `<span class="tag" style="--tc:${TCOL[r.type] || "#9ab"}">${esc(r.type)}</span>${esc(r.title || "")}${c ? `<span style="color:${esc(colorOf(c))};font-size:11px">→ ${esc(c.name)}</span>` : ""}` : `<span class="tag" style="--tc:#889">未歸檔</span>`}${x.status === "task" ? `<span class="tag" style="--tc:#f4cb72">已轉待辦</span>` : ""}</h5>
      <div>${esc(x.text)}</div>${r ? `<div><span class="k">底層問題</span>${esc(r.problem || "")}</div><div><span class="k">下一步</span>${esc(r.next || "")}</div>` : ""}
      <div class="row">${r ? (x.status !== "task" ? `<button class="chip" data-a="task">＋ 轉成待辦</button>` : "") + (r.type === "可沉澱 Skill" ? `<button class="chip" data-a="skill">✦ 沉澱為 Skill</button>` : "") : `<button class="chip" data-a="file">✦ AI 歸檔</button>`}<button class="chip" data-a="del">刪除</button><span class="k" style="margin-left:auto">${ago(x.at)}</span></div></div>`; }
  function paint(){ if (pn.hidden) return; const ta = $("dlc-in"), keepV = ta ? ta.value : null, keepF = document.activeElement === ta; const on = k => CYC.filter(c => c[1] === tab).map(c => c[0]).includes(k) ? "on" : "";
    let h = `<div class="vh"><b>AI-DLC</b><span>AI 驅動項目全生命週期：把模糊想法拆成可落地的生產鏈</span><button type="button" class="x" data-a="close" aria-label="關閉">×</button></div>
      <div class="cyc">${CYC.map(([k], i) => `<span class="${on(k)}">${k}</span>${i < CYC.length - 1 ? "<b>→</b>" : ""}`).join("")}</div>
      <div class="tabs">${[["in", "① 想法入口"], ["bd", "② 任務拆解"], ["sk", "③ Skill 庫"], ["map", "④ 結構地圖"]].map(([k, t]) => `<button class="chip ${tab === k ? "on" : ""}" data-tab="${k}">${t}</button>`).join("")}</div>`;
    if (tab === "in") h += `<textarea id="dlc-in" placeholder="想法、資料、經驗……先丟進來。AI 會找出底層問題、判斷類型、歸到對應專案，並給下一步。（Ctrl+Enter 歸檔）"></textarea>
      <div class="row"><button class="btn go" data-a="filein" ${busy ? "disabled" : ""}>${busy === "file" ? "AI 歸檔中…" : "✦ AI 歸檔"}</button><button class="btn" data-a="keep">先存起來</button></div>
      <div class="list">${ideas.slice(0, 30).map(ideaHTML).join("") || `<p class="empty">知識庫的第一層是信息入口，不是筆記。散落的想法先放這裡，不讓資訊失控。</p>`}</div>`;
    else if (tab === "bd"){ const top = allOpenNeeds().slice(0, 6);
      h += bd ? `<div class="it"><h5><span style="color:${esc(colorOf(bd.n.c))}">${esc(bd.n.c.name)}</span>${esc(bd.n.text)}</h5>${busy === "bd" ? `<p class="empty">AI 正在拆解…</p>` : bd.r ? `
        <div><span class="k">底層問題</span>${esc(bd.r.problem || "")}</div>
        <ol>${bd.r.steps.map(s => `<li><span class="who ${s.who === "AI" ? "ai" : ""}">${esc(s.who || "")}</span>${esc(s.do || "")}</li>`).join("")}</ol>
        <div><span class="k">驗收標準</span>${esc(bd.r.done_when || "")}</div>
        ${bd.r.skill_name ? `<div><span class="k">可沉澱 Skill</span>${esc(bd.r.skill_name)}</div>` : ""}
        <div class="row"><button class="chip" data-a="steps">＋ 子步驟加入待辦</button>${bd.r.skill_name && bd.r.skill_prompt ? `<button class="chip" data-a="bdskill">✦ 存成 Skill</button>` : ""}<button class="chip" data-a="redo">重新拆解</button></div>` : `<p class="empty">${esc(bd.err || "")}</p>`}</div>` : `<p class="empty">在任何待辦卡片按「✦ 拆解」，或從下面挑一件：</p>`;
      h += `<div class="list">${top.map(n => `<div class="it" style="padding:8px 10px"><h5 style="margin:0"><span style="color:${esc(colorOf(n.c))};font-size:11px">${esc(n.c.name)}</span>${esc(String(n.text).slice(0, 70))}<button class="chip" style="margin-left:auto" data-bd="${esc(n.id)}">✦ 拆解</button></h5></div>`).join("")}</div>`; }
    else if (tab === "sk"){ h += `<div class="row" style="margin-top:0"><button class="btn go" data-a="find" ${busy ? "disabled" : ""}>${busy === "sk" ? "AI 分析中…" : "✦ 找可沉澱的重複工作"}</button></div>`;
      if (sugg.length) h += `<div class="list">${sugg.map((s, i) => `<div class="it"><h5><span class="tag" style="--tc:#ff8fc8">建議</span>${esc(s.name)}</h5><div><span class="k">情境</span>${esc(s.when || "")}</div>${(s.examples || []).length ? `<div><span class="k">例子</span>${esc(s.examples.join("；"))}</div>` : ""}<pre>${esc(s.prompt)}</pre><div class="row"><button class="chip" data-sg="${i}">＋ 存進 Skill 庫</button></div></div>`).join("")}</div>`;
      h += `<div class="list">${skills.map(s => `<div class="it" data-id="${esc(s.id)}"><h5>✦ ${esc(s.name)}<span class="k" style="margin-left:auto">用過 ${s.uses || 0} 次</span></h5>${s.when ? `<div><span class="k">情境</span>${esc(s.when)}</div>` : ""}<pre>${esc(s.prompt)}</pre>
        <div class="row"><a class="chip" data-a="use" href="${esc(withQ("https://claude.ai/new", s.prompt))}" target="_blank" rel="noopener">▶ 在 Claude 使用</a><button class="chip" data-a="copy">複製指令</button><button class="chip" data-a="sdel">刪除</button></div></div>`).join("") || `<p class="empty">重複做的事沉澱成 Skill：一段固定指令，下次一鍵帶進 Claude，不用重想。</p>`}</div>`; }
    else { const cnt = {}; for (const x of ideas) if (x.ai){ const k = (x.ai.cluster || "NONE") + "|" + x.ai.type; cnt[k] = (cnt[k] || 0) + 1; }
      h += `<p class="empty">所有想法、待辦與 Skill 落在同一張圖上：從零散文件變成戰略地圖。</p><div class="mapg">${clusters.map(c => { const ty = TYPES.map(t => [t, cnt[c.code + "|" + t] || 0]).filter(x => x[1]);
          return `<div style="border-color:${esc(colorOf(c))}55"><b style="color:${esc(colorOf(c))}">${esc(c.name)}</b><div>待辦 ${openNeeds(c).length}</div>${ty.map(([t, n]) => `<div style="color:${TCOL[t]}">${t} ${n}</div>`).join("")}</div>`; }).join("")}
        <div><b>未歸屬</b>${TYPES.map(t => [t, cnt["NONE|" + t] || 0]).filter(x => x[1]).map(([t, n]) => `<div style="color:${TCOL[t]}">${t} ${n}</div>`).join("") || "<div>—</div>"}</div><div><b>Skill 庫</b><div>${skills.length} 個</div></div></div>
        <div class="row"><button class="btn" data-a="week">✦ 上週回顧</button><button class="btn" data-a="report">📋 複製日報</button><button class="btn" data-a="plan">✦ 重排今日計劃</button></div>`; }
    pn.innerHTML = h; const nt = $("dlc-in"); if (nt && keepV){ nt.value = keepV; if (keepF){ nt.focus(); nt.setSelectionRange(keepV.length, keepV.length); } } }
  pn.addEventListener("click", async e => { const t = e.target.closest("[data-a],[data-tab],[data-bd],[data-sg]"); if (!t) return; const a = t.dataset.a, it = t.closest(".it[data-id]"), id = it?.dataset.id;
    if (t.dataset.tab){ tab = t.dataset.tab; paint(); return; }
    if (t.dataset.bd){ breakdown(t.dataset.bd); return; }
    if (t.dataset.sg != null){ await saveSkill(sugg[+t.dataset.sg]); sugg.splice(+t.dataset.sg, 1); toast("已存進 Skill 庫。"); paint(); return; }
    if (a === "close") open(false);
    else if (a === "filein") file($("dlc-in").value);
    else if (a === "keep") keep($("dlc-in").value);
    else if (a === "file"){ const x = ideas.find(q => q.id === id); if (x){ await del("ideas", id); file(x.text); } }
    else if (a === "task"){ const x = ideas.find(q => q.id === id); if (x) toTask(x); }
    else if (a === "skill"){ const x = ideas.find(q => q.id === id); if (x){ await saveSkill({ name: x.ai.title || "新 Skill", when: x.ai.problem, prompt: x.text + "\n\n" + (x.ai.next || "") }); toast("已存進 Skill 庫，可到「③ Skill 庫」修改。"); } }
    else if (a === "del") del("ideas", id);
    else if (a === "sdel") del("skills", id);
    else if (a === "copy" || a === "use"){ const s = skills.find(q => q.id === id); if (!s) return; try { navigator.clipboard.writeText(s.prompt); } catch {} if (a === "copy") toast("指令已複製。"); else toast("已在 Claude 開啟並帶入指令。");
      put("skills", id, { ...stripId(s), uses: (s.uses || 0) + 1 }); }
    else if (a === "steps") stepsToTasks();
    else if (a === "bdskill" && bd?.r){ await saveSkill({ name: bd.r.skill_name, when: bd.r.problem, prompt: bd.r.skill_prompt }); toast("已存進 Skill 庫。"); }
    else if (a === "redo" && bd) breakdown(bd.n.id);
    else if (a === "find") findSkills();
    else if (a === "week"){ open(false); weekReview(true); } else if (a === "report") copyReport(); else if (a === "plan") plan.make(false); });
  pn.addEventListener("keydown", e => { if (e.target.id === "dlc-in" && e.key === "Enter" && (e.ctrlKey || e.metaKey)){ e.preventDefault(); file(e.target.value); } if (e.key === "Escape"){ e.stopPropagation(); open(false); } });
  document.addEventListener("pointerdown", e => { if (!pn.hidden && !e.target.closest("#dlcpanel,#b-dlc,[data-dlc],#toast")) open(false); });
  $("b-dlc")?.addEventListener("click", e => { e.stopPropagation(); open(pn.hidden, pn.hidden ? tab : undefined); if (!pn.hidden && tab === "in") setTimeout(() => $("dlc-in")?.focus(), 30); });
  return { wire, breakdown, open, capture(ch){ open(true, "in"); setTimeout(() => { const el = $("dlc-in"); if (!el) return; if (ch) el.value += ch; el.focus(); el.setSelectionRange(el.value.length, el.value.length); }, 30); } };
})();
