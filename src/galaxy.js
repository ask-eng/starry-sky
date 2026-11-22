/* ---------- galaxy customisation: constellation shapes by name, uploaded images, colours and names ---------- */
const PHX_V2 = window.PHX_CONFIG?.customGalaxy ?? !!window.claude?.standalone;   // the "custom star map" edition turns this on: unlimited constellations, module mapping, own tasks
const GLIB = {   // line art in constellation units (y up); hand-tuned stars for the five original figures
  phoenix: { n: "鳳凰", v: [[0, 0], [0, 1.1], [-1.1, .6], [-2.2, 1.3], [1.1, .6], [2.2, 1.3], [0, -1.2], [-.6, -2], [.6, -2]], e: [[0, 1], [0, 2], [2, 3], [0, 4], [4, 5], [0, 6], [6, 7], [6, 8]],
    art: "M0 0 C0.1 0.5 0.25 0.85 0 1.1 C-0.15 1.25 -0.05 1.45 0.2 1.35 L0.4 1.28 M0 0.2 C-0.5 0.5 -1.1 0.9 -2.2 1.3 C-1.8 0.9 -1.6 0.6 -1.1 0.6 C-1.6 0.4 -1.9 0.1 -2.0 -0.1 C-1.3 0.1 -0.6 0.0 0 -0.2 M0 0.2 C0.5 0.5 1.1 0.9 2.2 1.3 C1.8 0.9 1.6 0.6 1.1 0.6 C1.6 0.4 1.9 0.1 2.0 -0.1 C1.3 0.1 0.6 0.0 0 -0.2 M0 -0.2 C-0.1 -0.7 0 -1 0 -1.2 C-0.3 -1.5 -0.5 -1.8 -0.6 -2.0 C-0.7 -2.2 -0.9 -2.3 -1.1 -2.2 M0 -1.2 C0.3 -1.5 0.5 -1.8 0.6 -2.0 C0.7 -2.2 0.9 -2.3 1.1 -2.2 M0 -1.2 C0 -1.7 0.05 -2.1 0 -2.6 M-1.5 0.95 L-1.3 0.55 M-0.9 0.62 L-0.8 0.3 M1.5 0.95 L1.3 0.55 M0.9 0.62 L0.8 0.3" },
  figure: { n: "健身人形", v: [[0, 0], [0, .9], [-.9, .1], [.9, .2], [0, -1.1], [-.6, -2.3], [.7, -2.2], [-1.5, -.6], [1.5, -.4]], e: [[1, 0], [0, 2], [0, 3], [0, 4], [4, 5], [4, 6], [2, 7], [3, 8]],
    art: "M0.3 1.25 A0.3 0.3 0 1 0 -0.3 1.25 A0.3 0.3 0 1 0 0.3 1.25 M0 0.95 L0 -1.1 M0 0 L-0.9 0.1 L-1.5 -0.6 M0 0 L0.9 0.2 L1.5 -0.4 M0 -1.1 L-0.6 -2.3 M0 -1.1 L0.7 -2.2 M-1.8 -0.6 L-1.2 -0.6 M-1.8 -0.8 L-1.8 -0.4 M-1.2 -0.8 L-1.2 -0.4 M1.2 -0.4 L1.8 -0.4 M1.2 -0.6 L1.2 -0.2 M1.8 -0.6 L1.8 -0.2" },
  diamond: { n: "鑽石", v: [[0, 0], [-1.1, -.9], [1.1, -.9], [0, -2.3], [-.45, .5], [.45, .5], [0, -.9]], e: [[0, 4], [0, 5], [4, 1], [5, 2], [1, 2], [1, 3], [2, 3], [4, 6], [5, 6], [6, 3]],
    art: "M-0.45 0.5 L0.45 0.5 L1.1 -0.9 L0 -2.3 L-1.1 -0.9 Z M-1.1 -0.9 L1.1 -0.9 M-0.45 0.5 L-0.3 -0.9 L0 -2.3 L0.3 -0.9 L0.45 0.5 M0 0.5 L-0.3 -0.9 M0 0.5 L0.3 -0.9 M1.5 0.8 L1.5 1.5 M1.15 1.15 L1.85 1.15" },
  radar: { n: "雷達箭", v: [[0, 0], [1.1, .7], [2.3, 1.5], [1.4, 1.6], [2.2, .6], [-.9, -.6]], e: [[5, 0], [0, 1], [1, 2], [2, 3], [2, 4]],
    art: "M-0.9 -0.6 L2.3 1.5 M2.3 1.5 L1.4 1.6 M2.3 1.5 L2.2 0.6 M-0.9 -0.6 L-1.35 -0.3 M-0.9 -0.6 L-1.2 -1.0 M-0.9 0.3 A0.9 0.9 0 0 1 0 -0.6 M-0.9 0.95 A1.55 1.55 0 0 1 0.65 -0.6 M-0.9 1.6 A2.2 2.2 0 0 1 1.3 -0.6" },
  chart: { n: "上升曲線", v: [[0, 0], [-2.2, -1.4], [-1.4, -.6], [-.8, -1], [.8, .9], [1.7, 1.8], [1.1, 1.8], [1.7, 1.2]], e: [[1, 2], [2, 3], [3, 0], [0, 4], [4, 5], [5, 6], [5, 7]],
    art: "M-2.5 -1.9 L-2.5 2 M-2.5 -1.9 L2.3 -1.9 M-2.2 -1.4 L-1.4 -0.6 L-0.8 -1 L0 0 L0.8 0.9 L1.7 1.8 M1.1 1.8 L1.7 1.8 L1.7 1.2 M-1.4 -1.9 L-1.4 -1.3 M-0.4 -1.9 L-0.4 -0.9 M0.6 -1.9 L0.6 -0.4 M1.6 -1.9 L1.6 0.3" },
  book: { n: "書本", art: "M0 -1.2 L0 1.2 M0 1.2 C-0.6 1.5 -1.4 1.5 -2 1.2 L-2 -1.2 C-1.4 -0.9 -0.6 -0.9 0 -1.2 C0.6 -0.9 1.4 -0.9 2 -1.2 L2 1.2 C1.4 1.5 0.6 1.5 0 1.2 M-1.6 0.6 L-0.4 0.75 M0.4 0.75 L1.6 0.6" },
  rocket: { n: "火箭", art: "M0 2.2 C0.6 1.6 0.8 0.6 0.6 -0.8 L-0.6 -0.8 C-0.8 0.6 -0.6 1.6 0 2.2 Z M0.6 -0.2 L1.2 -1.2 L0.55 -0.9 M-0.6 -0.2 L-1.2 -1.2 L-0.55 -0.9 M-0.3 -0.8 L0 -1.9 L0.3 -0.8 M0.25 0.8 A0.25 0.25 0 1 0 -0.25 0.8 A0.25 0.25 0 1 0 0.25 0.8" },
  heart: { n: "愛心", art: "M0 -1.8 C-1 -0.9 -2.1 0 -2.1 0.9 C-2.1 1.8 -1 2.2 0 1.2 C1 2.2 2.1 1.8 2.1 0.9 C2.1 0 1 -0.9 0 -1.8 Z" },
  note: { n: "音符", art: "M-1.4 -1.4 A0.55 0.4 0 1 0 -0.3 -1.4 A0.55 0.4 0 1 0 -1.4 -1.4 M-0.3 -1.4 L-0.3 1.6 L1.6 2 L1.6 -1 M1.6 -1 A0.55 0.4 0 1 0 0.5 -1 A0.55 0.4 0 1 0 1.6 -1 M-0.3 1 L1.6 1.4" },
  globe: { n: "地球", art: "M2 0 A2 2 0 1 0 -2 0 A2 2 0 1 0 2 0 M0 2 C-1 1 -1 -1 0 -2 C1 -1 1 1 0 2 M-2 0 L2 0 M-1.7 1 L1.7 1 M-1.7 -1 L1.7 -1" },
  crown: { n: "皇冠", art: "M-2 -1 L-2 1 L-1 0 L0 1.6 L1 0 L2 1 L2 -1 Z M-2 -1.4 L2 -1.4" },
  leaf: { n: "葉子", art: "M-1.6 -1.6 C-1.8 0.6 -0.2 2 1.8 1.8 C2 -0.2 0.6 -1.8 -1.6 -1.6 Z M-1.6 -1.6 L1.8 1.8 M-0.6 -0.6 L0 -1.5 M0.2 0.2 L1 -0.8 M-0.6 -0.6 L-1.4 0 M0.2 0.2 L-0.6 1" },
  bolt: { n: "閃電", art: "M0.4 2.2 L-1.2 -0.1 L0 -0.1 L-0.6 -2.2 L1.2 0.4 L0 0.4 Z" },
  compass: { n: "羅盤", art: "M1.8 0 A1.8 1.8 0 1 0 -1.8 0 A1.8 1.8 0 1 0 1.8 0 M0 2.3 L0 -2.3 M-2.3 0 L2.3 0 M0 1.2 L0.35 0 L0 -1.2 L-0.35 0 Z" },
  mountain: { n: "山峰", art: "M-2.4 -1.4 L-0.9 1 L-0.3 0 L0.6 1.8 L2.4 -1.4 Z M0.6 1.8 L0.6 2.5 L1.3 2.25 L0.6 2" },
  chip: { n: "晶片", art: "M-1.2 -1.2 L1.2 -1.2 L1.2 1.2 L-1.2 1.2 Z M-0.5 -0.5 L0.5 -0.5 L0.5 0.5 L-0.5 0.5 Z M-0.6 1.2 L-0.6 1.8 M0.6 1.2 L0.6 1.8 M-0.6 -1.2 L-0.6 -1.8 M0.6 -1.2 L0.6 -1.8 M1.2 -0.6 L1.8 -0.6 M1.2 0.6 L1.8 0.6 M-1.2 -0.6 L-1.8 -0.6 M-1.2 0.6 L-1.8 0.6" },
  house: { n: "房屋", art: "M-1.8 -1.6 L-1.8 0.4 L0 2 L1.8 0.4 L1.8 -1.6 Z M-0.5 -1.6 L-0.5 -0.4 L0.5 -0.4 L0.5 -1.6" },
  star: { n: "星芒", art: "M0 2 L0.6 0.6 L2 0.6 L0.9 -0.3 L1.3 -1.8 L0 -0.9 L-1.3 -1.8 L-0.9 -0.3 L-2 0.6 L-0.6 0.6 Z" },
};
const GKW = [[/鳳凰|phoenix|火鳥|涅槃/i, "phoenix"], [/健身|運動|fitness|gym|訓練|跑步|跑|run|體能|瑜珈|yoga|肌/i, "figure"], [/資產|投資|asset|理財|finance|money|股|wealth|錢|財/i, "diamond"],
  [/雷達|radar|監控|觀察|watch|scan|偵測|情報|職缺|job|稽核/i, "radar"], [/收入|income|營收|sales|業績|成長|growth|副業|revenue|kpi|賺/i, "chart"], [/學習|讀書|study|learn|課|book|閱讀|知識|英文|日文|語言|考試/i, "book"],
  [/專案|project|launch|產品|product|開發|dev|code|程式|創業|startup/i, "rocket"], [/家人|家庭|family|愛|love|關係|伴侶|朋友|friend|心/i, "heart"], [/音樂|music|歌|樂器|piano|吉他/i, "note"],
  [/旅行|旅遊|travel|世界|world|國際|global|出國/i, "globe"], [/目標|goal|人生|vision|夢想|願景|領導|lead/i, "crown"], [/生活|life|身心|mind|冥想|meditation|自然|植物|睡眠|sleep/i, "leaf"],
  [/能量|energy|效率|速度|fast|自動化|automation/i, "bolt"], [/策略|strategy|方向|規劃|plan|導航/i, "compass"], [/挑戰|challenge|登山|突破|里程碑|milestone/i, "mountain"],
  [/\bai\b|人工智慧|科技|tech|系統|system|數據|data|claude|gpt/i, "chip"], [/家|home|房|居/i, "house"]];
const GCODE = { PHOENIX: "phoenix", FITNESS: "figure", ASSET: "diamond", RADAR: "radar", INCOME: "chart" };
const GFALL = ["star", "compass", "crown", "bolt", "leaf", "globe", "mountain"];
const autoShapeKey = c => { for (const t of [c.name || "", c.code || ""]) for (const [re, k] of GKW) if (t && re.test(t)) return k; return GCODE[c.code] || GFALL[[...String(c.code || c.name || "x")].reduce((a, ch) => a + ch.charCodeAt(0), 0) % GFALL.length]; };
/* turn line art into stars: sample each stroke evenly, join neighbours, put the main star nearest the centre */
const shapeCache = {};
function sampleArt(art){
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden"); document.body.appendChild(svg);
  const subs = art.split(/(?=M)/).map(d => d.trim()).filter(Boolean), parts = [];
  for (const d of subs){ const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", d); svg.appendChild(p); const L = p.getTotalLength(); if (L > .25) parts.push({ p, L, closed: /z\s*$/i.test(d) }); }
  const tot = parts.reduce((a, q) => a + q.L, 0) || 1, v = [], e = [];
  for (const q of parts){ const k = Math.max(2, Math.round(q.L/tot*16)), base = v.length, n = q.closed ? k : k;
    for (let i = 0; i < n; i++){ const pt = q.p.getPointAtLength(q.closed ? i/n*q.L : i/(n - 1)*q.L); v.push([pt.x, pt.y]); if (i) e.push([base + i - 1, base + i]); }
    if (q.closed && n > 2) e.push([base + n - 1, base]); }
  svg.remove();
  let bi = 0, bd = 1e9; v.forEach(([x, y], i) => { const d = x*x + y*y; if (d < bd){ bd = d; bi = i; } });
  if (bi){ [v[0], v[bi]] = [v[bi], v[0]]; for (const ed of e) for (let j = 0; j < 2; j++) ed[j] = ed[j] === 0 ? bi : ed[j] === bi ? 0 : ed[j]; }
  return { v, e };
}
function libShape(key){ const L = GLIB[key] || GLIB.star; if (!shapeCache[key]) shapeCache[key] = L.v ? { v: L.v, e: L.e, art: L.art } : { ...sampleArt(L.art), art: L.art }; return shapeCache[key]; }
/* the shape a constellation uses: an uploaded picture, a chosen figure, or one picked from its name */
function galShape(c){
  try { if (c.shape === "img" && c.shapeImg?.v?.length > 1) return { v: c.shapeImg.v, e: c.shapeImg.e, img: c.shapeImg.art };
    return libShape(c.shape && c.shape !== "auto" && GLIB[c.shape] ? c.shape : autoShapeKey(c)); } catch { return null; }
}
/* glowing line-art texture for the illustration behind each constellation (units -3..3 across the texture) */
const artTexCache = {};
function galArtTex(SH){
  const key = SH.img ? "img:" + SH.img.length + SH.img.slice(-40) : SH.art; if (artTexCache[key]) return artTexCache[key];
  const cv = document.createElement("canvas"); cv.width = cv.height = 512; const g = cv.getContext("2d"), tx = new THREE.CanvasTexture(cv);
  if (SH.img){ const im = new Image(); im.onload = () => { g.globalCompositeOperation = "lighter"; g.drawImage(im, 0, 0, 512, 512); tx.needsUpdate = true; }; im.src = SH.img; }
  else { const P = new Path2D(SH.art); g.translate(256, 256); g.scale(512/6, -512/6); g.lineCap = g.lineJoin = "round";
    g.strokeStyle = "rgba(255,255,255,.35)"; g.lineWidth = .12; g.shadowColor = "rgba(255,255,255,.9)"; g.shadowBlur = 18; g.stroke(P);
    g.shadowBlur = 6; g.strokeStyle = "rgba(255,255,255,.95)"; g.lineWidth = .035; g.stroke(P); }
  return artTexCache[key] = tx;
}
/* an uploaded picture becomes a constellation: find its silhouette, trace the outline, pick evenly spread stars, link them with a spanning tree */
async function imgToShape(file){
  const url = URL.createObjectURL(file), im = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = url; });
  const S = 160, cv = document.createElement("canvas"); cv.width = cv.height = S; const g = cv.getContext("2d", { willReadFrequently: true });
  const k = Math.min((S - 16)/im.width, (S - 16)/im.height), w = im.width*k, h = im.height*k; g.drawImage(im, (S - w)/2, (S - h)/2, w, h); URL.revokeObjectURL(url);
  const d = g.getImageData(0, 0, S, S).data, N = S*S, lum = new Float32Array(N), alpha = new Uint8Array(N); let transp = 0;
  for (let i = 0; i < N; i++){ alpha[i] = d[i*4 + 3]; lum[i] = (d[i*4]*.3 + d[i*4 + 1]*.59 + d[i*4 + 2]*.11); if (alpha[i] < 128) transp++; }
  const inside = new Uint8Array(N), inImg = i => { const x = i % S, y = (i/S)|0; return x >= (S - w)/2 && x < (S + w)/2 && y >= (S - h)/2 && y < (S + h)/2; };
  if (transp > N*.08 + (N - w*h)){ for (let i = 0; i < N; i++) inside[i] = alpha[i] >= 128 ? 1 : 0; }
  else { const hist = new Array(256).fill(0); let cnt = 0; for (let i = 0; i < N; i++) if (inImg(i)){ hist[lum[i]|0]++; cnt++; }
    let sum = 0; for (let t = 0; t < 256; t++) sum += t*hist[t]; let sB = 0, wB = 0, best = 0, thr = 128;
    for (let t = 0; t < 256; t++){ wB += hist[t]; if (!wB) continue; const wF = cnt - wB; if (!wF) break; sB += t*hist[t]; const mB = sB/wB, mF = (sum - sB)/wF, bv = wB*wF*(mB - mF)*(mB - mF); if (bv > best){ best = bv; thr = t; } }
    let dark = 0; for (let i = 0; i < N; i++) if (inImg(i) && lum[i] < thr) dark++; const fgDark = dark < cnt/2;
    for (let i = 0; i < N; i++) inside[i] = inImg(i) && alpha[i] >= 128 && (fgDark ? lum[i] < thr : lum[i] >= thr) ? 1 : 0; }
  const edge = []; let cx = 0, cy = 0, cn = 0, x0 = S, x1 = 0, y0 = S, y1 = 0;
  for (let y = 1; y < S - 1; y++) for (let x = 1; x < S - 1; x++){ const i = y*S + x; if (!inside[i]) continue; cx += x; cy += y; cn++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    if (!inside[i - 1] || !inside[i + 1] || !inside[i - S] || !inside[i + S]) edge.push([x, y]); }
  if (edge.length < 24 || cn < 60) throw new Error("看不出圖片的主體輪廓，請換一張主體清楚、背景單純的圖片。");
  cx /= cn; cy /= cn; const mx = (x0 + x1)/2, my = (y0 + y1)/2, sc = 2.3/Math.max(1, (x1 - x0)/2, (y1 - y0)/2), U = ([x, y]) => [+((x - mx)*sc).toFixed(3), +(-(y - my)*sc).toFixed(3)];
  // farthest-point sampling over the outline, starting near the centre of mass
  let first = 0, fd = 1e9; edge.forEach((p, i) => { const dd = (p[0] - cx)**2 + (p[1] - cy)**2; if (dd < fd){ fd = dd; first = i; } });
  const pick = [first], dist = edge.map(p => (p[0] - edge[first][0])**2 + (p[1] - edge[first][1])**2);
  while (pick.length < 16){ let bi = 0, bd = -1; for (let i = 0; i < edge.length; i++) if (dist[i] > bd){ bd = dist[i]; bi = i; } if (bd < 9) break; pick.push(bi);
    for (let i = 0; i < edge.length; i++){ const dd = (edge[i][0] - edge[bi][0])**2 + (edge[i][1] - edge[bi][1])**2; if (dd < dist[i]) dist[i] = dd; } }
  const v = pick.map(i => U(edge[i])), e = [], inT = [true], best = v.map((p, i) => i ? [(p[0] - v[0][0])**2 + (p[1] - v[0][1])**2, 0] : [Infinity, -1]);
  for (let n = 1; n < v.length; n++){ let bi = -1, bd = Infinity; for (let i = 1; i < v.length; i++) if (!inT[i] && best[i][0] < bd){ bd = best[i][0]; bi = i; } inT[bi] = true; e.push([best[bi][1], bi]);
    for (let i = 1; i < v.length; i++) if (!inT[i]){ const dd = (v[i][0] - v[bi][0])**2 + (v[i][1] - v[bi][1])**2; if (dd < best[i][0]) best[i] = [dd, bi]; } }
  // the glowing outline drawing, in the same -3..3 frame as the stars
  const ac = document.createElement("canvas"); ac.width = ac.height = 256; const ag = ac.getContext("2d"); ag.fillStyle = "#fff"; ag.shadowColor = "#fff"; ag.shadowBlur = 5;
  for (const p of edge){ const [ux, uy] = U(p); ag.globalAlpha = .55; ag.fillRect(128 + ux*256/6 - .9, 128 - uy*256/6 - .9, 1.8, 1.8); }
  return { v, e, art: ac.toDataURL("image/png") };
}
/* ---------- settings: names, colours, shapes (and, in the custom edition, the constellations themselves) ---------- */
let gcfg = {}, rawClusters = [], rawModules = new Set();
try { gcfg = JSON.parse(localStorage.getItem("phx-galaxy") || "{}") || {}; } catch {}
const DEF_MODS = {};
function applyGalaxy(raw){
  rawClusters = raw;
  if (!PHX_V2) return raw.map(c => { const o = gcfg.over?.[c.code]; return o ? { ...c, name: o.name || c.name, color: o.color || c.color, shape: o.shape, shapeImg: o.img } : c; });
  const list = gcfg.list?.length ? gcfg.list : raw.map(c => ({ code: c.code, name: c.name, color: c.color, shape: "auto", mods: [] }));
  return list.map((cu, i) => { const base = raw.find(r => r.code === cu.code);
    return { ...(base || { status: "idle", task: "", custom: true }), code: cu.code, name: cu.name || cu.code, color: cu.color || base?.color, order: i, shape: cu.shape, shapeImg: cu.img,
      modules: base ? base.modules : (cu.mods || []).map(n => ({ name: n })), custom: !base }; });
}
/* custom edition: route each signal to the constellation that claims its module (first claim wins), else keep its own code if that still exists */
function remapSignal(s){
  if (!PHX_V2) return s; const list = galList(); if (s.module) rawModules.add(String(s.module).split("｜")[0]);
  const cu = list.find(x => (x.mods || []).some(m => m && s.module && (s.module === m || String(s.module).startsWith(m))));
  const code = cu?.code || (list.some(x => x.code === s.cluster) ? s.cluster : null); if (!code) return null;
  const to = s.to && list.some(x => x.code === s.to) ? s.to : undefined; return { ...s, cluster: code, to };
}
const galList = () => gcfg.list?.length ? gcfg.list : rawClusters.map(c => ({ code: c.code, name: c.name, color: c.color, shape: "auto", mods: [] }));
let galDb = null, galVer = 0, galTimer = 0, onGalaxy = null;
function saveGalaxy(){ try { localStorage.setItem("phx-galaxy", JSON.stringify(gcfg)); } catch {}
  clearTimeout(galTimer); galTimer = setTimeout(async () => { if (galDb && canWrite){ try { await galDb.doc("config/galaxy").set({ ...gcfg, at: new Date().toISOString() }); } catch (e){ toast("星系設定沒能存到雲端（" + (e?.code || "錯誤") + "），已先存在這台電腦。"); } } }, 700);
  onGalaxy?.(); }
function wireGalaxyDb(db){ galDb = db; db.doc("config/galaxy").onSnapshot(snap => { if (!snap.exists) return; const d = snap.data() || {}; delete d.at; if (JSON.stringify(d) === JSON.stringify(gcfg)) return; gcfg = d; try { localStorage.setItem("phx-galaxy", JSON.stringify(gcfg)); } catch {} onGalaxy?.(); if (!$("gpanel").hidden) paintGal(); }, () => {}); }

/* the panel */
(() => {
  const css = document.createElement("style"); css.textContent = `
.vpanel.gpanel{width:min(720px,calc(100vw - 32px))}
.grow select{width:auto!important;max-width:160px;margin:0!important}.grow input[type=text]{width:auto;margin:0!important}.grow .gl1 .chip{white-space:nowrap}
.gpanel .glist{display:flex;flex-direction:column;gap:10px;margin-top:6px}
.grow{display:grid;grid-template-columns:64px 1fr;gap:10px;align-items:start;padding:10px;border:1px solid var(--line);border-radius:12px;background:rgba(255,255,255,.025)}
.grow canvas{width:64px;height:64px;border-radius:10px;background:radial-gradient(circle at 50% 45%,rgba(255,255,255,.06),rgba(0,0,0,.25))}
.grow .gl1{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
.grow input[type=text]{flex:1;min-width:120px;background:rgba(0,0,0,.25);border:1px solid var(--line);border-radius:8px;color:inherit;padding:6px 8px;font:inherit;font-size:13px}
.grow input[type=color]{width:34px;height:30px;padding:0;border:1px solid var(--line);border-radius:8px;background:none;cursor:pointer}
.grow select{background:rgba(0,0,0,.35);border:1px solid var(--line);border-radius:8px;color:inherit;padding:6px;font:inherit;font-size:12px}
.grow .gl2{display:flex;gap:6px;align-items:center;flex-wrap:wrap;margin-top:6px;font-size:11px;color:var(--faint)}
.grow .gup{position:relative;overflow:hidden;cursor:pointer}.grow .gup input{position:absolute;inset:0;opacity:0;cursor:pointer}
.grow .gmods{width:100%;margin-top:6px}
.gadd{margin-top:10px}`; document.head.appendChild(css);
  const pn = document.createElement("div"); pn.className = "vpanel gpanel"; pn.id = "gpanel"; pn.hidden = true; pn.setAttribute("role", "dialog"); pn.setAttribute("aria-label", "星系設定");
  pn.innerHTML = `<div class="vh"><b>GALAXY · ${PHX_V2 ? "CUSTOM" : "STYLE"}</b><span>${PHX_V2 ? "自訂星座：數量不限" : "星系自定義"}</span><button type="button" class="x" id="gclose" aria-label="關閉">×</button></div>
    <p class="vnote" style="margin-top:0">${PHX_V2 ? "每個星座可以改名字、顏色、形狀，並指定哪些 Notion 模組的交接要歸到它；沒有模組的星座也能直接在側欄新增自己的待辦。" : "改名字、顏色或星座形狀。形狀預設依名字自動挑選（例如含「鳳凰」就是鳳凰）；也可以上傳圖片，會描出圖片輪廓變成星座。"}</p>
    <div class="glist" id="glist"></div>${PHX_V2 ? `<div class="gadd"><button type="button" class="chip" id="gadd">＋ 新增星座</button></div><datalist id="gmodlist"></datalist>` : ""}
    <div class="gadd"><button type="button" class="chip" id="gpos">↺ 重置星座位置</button> <span class="vnote" style="display:inline">在星空中直接拖曳星座的星星，就能移動它的位置。</span></div><p class="vnote" id="gnote"></p>`;
  document.body.appendChild(pn);
  const shapeOpts = cur => `<option value="auto" ${!cur || cur === "auto" ? "selected" : ""}>自動（依名稱）</option>` + Object.entries(GLIB).map(([k, L]) => `<option value="${k}" ${cur === k ? "selected" : ""}>${L.n}</option>`).join("") + `<option value="img" ${cur === "img" ? "selected" : ""}>上傳的圖片</option>`;
  const rows = () => PHX_V2 ? galList() : rawClusters.map(c => { const o = gcfg.over?.[c.code] || {}; return { code: c.code, name: o.name || c.name, color: o.color || c.color || "#88aaff", shape: o.shape || "auto", img: o.img, base: c.name }; });
  function preview(cv, r){ const g = cv.getContext("2d"); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, 128, 128); const SH = galShape({ ...r, shapeImg: r.img });
    if (!SH) return; g.save(); g.translate(64, 64); g.scale(128/6.4, -128/6.4); g.strokeStyle = r.color || "#9cf"; g.globalAlpha = .55; g.lineWidth = .06;
    if (SH.art){ g.stroke(new Path2D(SH.art)); } g.globalAlpha = 1; g.lineWidth = .05; g.beginPath(); for (const [a, b] of SH.e){ g.moveTo(...SH.v[a]); g.lineTo(...SH.v[b]); } g.stroke();
    g.fillStyle = "#fff"; for (const [i, p] of SH.v.entries()){ g.beginPath(); g.arc(p[0], p[1], i ? .09 : .16, 0, Math.PI*2); g.fill(); } g.restore();
    if (SH.img){ const im = new Image(); im.onload = () => { g.globalAlpha = .7; g.drawImage(im, 0, 0, 128, 128); g.globalAlpha = 1; }; im.src = SH.img; } }
  function paintGal(){
    const L = rows(); $("glist").innerHTML = L.map((r, i) => `<div class="grow" data-i="${i}" data-code="${esc(r.code)}"><canvas width="128" height="128"></canvas><div>
      <div class="gl1"><input type="text" class="gname" value="${esc(r.name || "")}" aria-label="名稱" maxlength="24"><input type="color" class="gcol" value="${esc(/^#[0-9a-f]{6}$/i.test(r.color || "") ? r.color : "#88aaff")}" aria-label="顏色">
        <select class="gshape" aria-label="形狀">${shapeOpts(r.shape)}</select><label class="chip gup">🖼 上傳圖片<input type="file" accept="image/*" aria-label="上傳圖片當星座形狀"></label>${PHX_V2 ? `<button type="button" class="chip gdel" title="刪除這個星座">刪除</button>` : `<button type="button" class="chip grst" title="恢復原本的名稱、顏色和形狀">還原</button>`}</div>
      <div class="gl2">${r.shape === "img" ? "形狀：上傳的圖片" : `形狀：${GLIB[r.shape && r.shape !== "auto" ? r.shape : autoShapeKey(r)]?.n || "—"}${!r.shape || r.shape === "auto" ? "（依名稱自動）" : ""}`}${!PHX_V2 && r.base && r.base !== r.name ? ` · 原名 ${esc(r.base)}` : ""}${PHX_V2 ? ` · 代碼 ${esc(r.code)}` : ""}</div>
      ${PHX_V2 ? `<input type="text" class="gmods" list="gmodlist" value="${esc((r.mods || []).join(", "))}" placeholder="歸到這裡的 Notion 模組，用逗號分隔（例如 Research Notes）" aria-label="對應模組">` : ""}</div></div>`).join("");
    [...$("glist").children].forEach((el, i) => preview(el.querySelector("canvas"), L[i]));
    if (PHX_V2) $("gmodlist").innerHTML = [...rawModules].sort().map(m => `<option value="${esc(m)}">`).join("");
    $("gnote").textContent = canWrite ? "改動會自動存檔，並同步到你其他裝置。" : "你沒有這個頁面的編輯權限，改動只會存在這台電腦。";
  }
  window.paintGal = paintGal;
  const edit = (i, fn) => { if (PHX_V2){ const L = galList().map(x => ({ ...x })); fn(L[i]); gcfg = { ...gcfg, list: L }; }
    else { const r = rows()[i], o = { ...(gcfg.over?.[r.code] || {}) }; fn(o); gcfg = { ...gcfg, over: { ...(gcfg.over || {}), [r.code]: o } }; } saveGalaxy(); };
  pn.addEventListener("change", async e => { const row = e.target.closest(".grow"); if (!row) return; const i = +row.dataset.i, t = e.target;
    if (t.classList.contains("gname")) edit(i, o => { o.name = t.value.trim().slice(0, 24); });
    else if (t.classList.contains("gcol")) edit(i, o => { o.color = t.value; });
    else if (t.classList.contains("gshape")){ if (t.value === "img" && !(PHX_V2 ? galList()[i].img : gcfg.over?.[row.dataset.code]?.img)){ toast("請先按「上傳圖片」選一張圖。"); paintGal(); return; } edit(i, o => { o.shape = t.value; }); }
    else if (t.classList.contains("gmods")) edit(i, o => { o.mods = t.value.split(/[,，、]/).map(s => s.trim()).filter(Boolean).slice(0, 20); });
    else if (t.type === "file" && t.files?.[0]){ try { toast("正在描出圖片輪廓…"); const sh = await imgToShape(t.files[0]); edit(i, o => { o.img = sh; o.shape = "img"; }); toast("已把圖片變成星座。"); } catch (err){ toast(err?.message || "這張圖片無法使用。"); } }
    paintGal(); });
  pn.addEventListener("click", e => { const row = e.target.closest(".grow");
    if (e.target.closest(".grst") && row){ const o = { ...(gcfg.over || {}) }; delete o[row.dataset.code]; gcfg = { ...gcfg, over: o }; saveGalaxy(); paintGal(); }
    else if (e.target.closest(".gdel") && row){ const L = galList(); if (L.length <= 1){ toast("至少要保留一個星座。"); return; } if (!confirm(`刪除「${L[+row.dataset.i].name}」這個星座？`)) return; gcfg = { ...gcfg, list: L.filter((_, k) => k !== +row.dataset.i) }; saveGalaxy(); paintGal(); }
    else if (e.target.id === "gadd"){ const L = galList(), pal = ["#ff8a3d", "#5ee0b4", "#7cc0ff", "#c4b2ff", "#ff8fc8", "#f4cb72", "#8be6ff", "#a3e86b"];
      gcfg = { ...gcfg, list: [...L, { code: "C" + Date.now().toString(36).toUpperCase(), name: "新星座 " + (L.length + 1), color: pal[L.length % pal.length], shape: "auto", mods: [] }] }; saveGalaxy(); paintGal();
      setTimeout(() => { const ins = $("glist").querySelectorAll(".gname"); ins[ins.length - 1]?.focus(); ins[ins.length - 1]?.select(); }, 30); }
    else if (e.target.id === "gpos"){ gcfg = { ...gcfg, pos: {} }; saveGalaxy(); toast("星座位置已重置。"); }
    else if (e.target.id === "gclose") pn.hidden = true; });
  const btn = document.createElement("button"); btn.type = "button"; btn.className = "tool"; btn.id = "b-gal"; btn.title = "星系設定：名稱、顏色、星座形狀"; btn.textContent = "✦ 星系";
  $("b-hud")?.after(btn); btn.addEventListener("click", e => { e.stopPropagation(); pn.hidden = !pn.hidden; if (!pn.hidden) paintGal(); });
  document.addEventListener("pointerdown", e => { if (!pn.hidden && !e.target.closest("#gpanel,#b-gal")) pn.hidden = true; });
  addEventListener("keydown", e => { if (e.key === "Escape" && !pn.hidden){ e.preventDefault(); pn.hidden = true; } });
})();
