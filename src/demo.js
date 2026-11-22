/* ---------- demo data ----------
   Fictional projects shown on first run, so the page has something to show before you connect
   your own data. Times are relative to "now", so the demo always looks current.
   Replace it with your own: tools/notion-sync.mjs (Notion) or the ✦ Galaxy panel (add constellations by hand). */
window.__PHX_DEMO__ = () => {
  const L = window.L || ((zh, en) => en);
  const now = Date.now(), H = 36e5, D = 864e5;
  const at = ms => new Date(now - ms).toISOString();
  const clusters = [
    { code: "PHOENIX", name: L("鳳凰總部", "Phoenix HQ"), color: "#f4cb72", status: "active", load: 62, task: L("排定本週的三個重點", "Setting this week's top three priorities"),
      modules: [{ name: L("每週回顧", "Weekly Review"), status: "active", load: 70, task: L("整理上週完成的事", "Summarizing last week"), updatedAt: at(5 * H) },
                { name: L("每日規劃", "Daily Planner"), status: "active", load: 55, task: L("排今天的時段", "Blocking out today"), updatedAt: at(2 * H) }] },
    { code: "LAUNCH", name: L("產品發表", "Product Launch"), color: "#ff9a4d", status: "alert", load: 81, task: L("Beta 報名表在手機上送不出去", "Beta sign-up form fails on mobile"),
      modules: [{ name: L("登陸頁", "Landing Page"), status: "alert", load: 90, task: L("修正手機版表單", "Fixing the mobile form"), updatedAt: at(1 * H) },
                { name: L("Beta 計畫", "Beta Program"), status: "active", load: 74, task: L("邀請第二批測試者", "Inviting the second tester wave"), updatedAt: at(9 * H) },
                { name: L("使用文件", "User Docs"), status: "idle", load: 30, task: L("快速入門待補", "Quick start still missing"), updatedAt: at(9 * D) }] },
    { code: "LEARN", name: L("學習實驗室", "Learning Lab"), color: "#b48cff", status: "idle", load: 38, task: L("日文 N3 第 7 課", "Japanese N3, lesson 7"),
      modules: [{ name: L("日文 N3", "Japanese N3"), status: "active", load: 45, task: L("文法複習", "Grammar review"), updatedAt: at(20 * H) },
                { name: L("閱讀清單", "Reading List"), status: "idle", load: 20, task: L("《原子習慣》讀到第 5 章", "Atomic Habits, chapter 5"), updatedAt: at(3 * D) }] },
    { code: "HEALTH", name: L("健身與健康", "Health & Fitness"), color: "#3df0c4", status: "active", load: 57, task: L("10K 訓練第 4 週", "10K training, week 4"),
      modules: [{ name: L("跑步計畫", "Running Plan"), status: "active", load: 60, task: L("週六長跑 8 公里", "Saturday long run, 8 km"), updatedAt: at(14 * H) },
                { name: L("睡眠紀錄", "Sleep Log"), status: "idle", load: 50, task: L("維持 7 小時", "Holding at 7 hours"), updatedAt: at(2 * D) }] },
    { code: "RADAR", name: L("市場雷達", "Market Radar"), color: "#5fb4ff", status: "active", load: 46, task: L("整理三家競品的新功能", "Comparing three competitors' new features"),
      modules: [{ name: L("競品觀察", "Competitor Watch"), status: "active", load: 48, task: L("比較定價頁", "Comparing pricing pages"), updatedAt: at(6 * H) },
                { name: L("電子報摘要", "Newsletter Digest"), status: "active", load: 40, task: L("本週 12 封待讀", "12 issues to read this week"), updatedAt: at(30 * H) }] }
  ];
  const sig = (id, ago, cluster, module, verb, zh, en, extra) => ({ id: "demo-" + id, at: at(ago), cluster, module, verb, text: L(zh, en), ...(extra || {}) });
  const signals = [
    sig(1, 40 * 60e3, "LAUNCH", L("登陸頁", "Landing Page"), "待處理", "決定：手機表單要改成單欄還是分步驟？", "Decide: single-column or step-by-step mobile form?", { priority: "High" }),
    sig(2, 3 * H, "LAUNCH", L("Beta 計畫", "Beta Program"), "打回", "第二批邀請信被退回：缺少隱私權連結", "Second invite email was sent back: privacy link missing"),
    sig(3, 5 * H, "RADAR", L("競品觀察", "Competitor Watch"), "交付", "三家競品定價對照表已完成", "Pricing comparison of three competitors is ready", { to: "LAUNCH" }),
    sig(4, 7 * H, "LAUNCH", L("Beta 計畫", "Beta Program"), "待處理", "審核 Beta 測試者回饋（14 則）", "Review beta tester feedback (14 notes)", { priority: "Medium" }),
    sig(5, 9 * H, "PHOENIX", L("每週回顧", "Weekly Review"), "完成", "上週回顧已寫好", "Last week's review is written"),
    sig(6, 14 * H, "HEALTH", L("跑步計畫", "Running Plan"), "完成", "間歇跑 6 × 400 m", "Intervals, 6 × 400 m"),
    sig(7, 20 * H, "LEARN", L("日文 N3", "Japanese N3"), "完成", "第 6 課單字測驗 92 分", "Lesson 6 vocabulary quiz: 92"),
    sig(8, 26 * H, "PHOENIX", L("每日規劃", "Daily Planner"), "Daily", "昨天的 Daily：精力 7/10，可用 5 小時", "Yesterday's Daily: energy 7/10, 5 hours free"),
    sig(9, 30 * H, "RADAR", L("電子報摘要", "Newsletter Digest"), "待處理", "挑出本週值得深讀的 3 篇", "Pick three newsletter issues worth a deep read", { priority: "Low" }),
    sig(10, 2 * D, "HEALTH", L("睡眠紀錄", "Sleep Log"), "交付", "睡眠週報：平均 6 小時 50 分", "Sleep weekly: 6 h 50 min on average", { to: "PHOENIX" }),
    sig(11, 3 * D, "LEARN", L("閱讀清單", "Reading List"), "完成", "讀完第 4 章並寫下 3 個重點", "Finished chapter 4 with three takeaways"),
    sig(12, 4 * D, "LAUNCH", L("使用文件", "User Docs"), "待處理", "寫快速入門的第一版", "Write the first quick-start draft", { priority: "High" })
  ];
  const tasks = [
    { id: "demo-t1", cluster: "PHOENIX", text: L("預約下週的牙醫", "Book next week's dentist appointment"), at: at(4 * H) },
    { id: "demo-t2", cluster: "HEALTH", text: L("買新的跑鞋", "Buy new running shoes"), at: at(28 * H) }
  ];
  const done = {}; for (let i = 1; i <= 6; i++) done["demo-done-" + i] = at(i * 19 * H);
  return { clusters, signals, tasks, done, syncedAt: null };
};
