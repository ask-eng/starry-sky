/* ---------- i18n: English by default, Traditional Chinese kept ----------
   The UI source is written in Traditional Chinese. In English mode this layer
   translates rendered text (text nodes, title / placeholder / aria-label, dialogs)
   with the dictionary below, so the app code stays a single source.

   How the dictionary works (one entry per line, "中文 => English"):
     - a plain entry is replaced wherever it appears inside a text node (longest first);
     - an entry starting with "=" only matches when it is the WHOLE text of a node;
     - the PATTERNS list handles numbers ("3 項" → "3 items").
   Missing a translation? Add a line and open a pull request — see CONTRIBUTING.md. */
(() => {
"use strict";
let lang = "en";
try { lang = localStorage.getItem("phx-lang") || (window.PHX_CONFIG && window.PHX_CONFIG.lang) || "en"; } catch {}
if (lang !== "zh") lang = "en";
window.PHX_LANG = lang;
window.L = (zh, en) => lang === "en" ? en : zh;
window.LOCALE = lang === "en" ? "en-US" : "zh-TW";
window.AI_LANG_NOTE = () => lang === "en" ? "\n\nWrite every human-readable string value in English. Keep enum / category values exactly as they are listed above." : "";
document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
window.phxSetLang = l => { try { localStorage.setItem("phx-lang", l); } catch {} location.reload(); };
window.phxT = s => s;
if (lang !== "en") return;

const DICT = String.raw`
=鳳凰星雲工作台 => Phoenix Nebula
=鳳凰星雲 => Phoenix Nebula
鳳凰星雲：中央原恆星伸出五條分支，每條分支末端是一個專案。點分支或專案名稱，看它在做什麼、需要你做什麼 => Phoenix Nebula: a protostar with branches; each branch ends in a project. Click a branch or project to see what it is doing and what it needs from you
鳳凰星雲日報 => Phoenix Nebula daily report
=下一步 => Next
展開今日計劃 => Show today's plan
NEXT · 下一步 => NEXT
正在整理你的工作… => Organizing your work…
今日完成進度 => Today's progress
=工作卡 => Work card
分支與工具 => Branches and tools
🔊 今日簡報 => 🔊 Briefing
AI-DLC：想法入口、任務拆解、Skill 庫（快捷鍵 I） => AI-DLC: idea inbox, task breakdown, skill library (key I)
把今天完成與待辦整理成日報並複製（快捷鍵 R） => Turn today's done and open items into a report and copy it (key R)
📋 日報 => 📋 Report
旁白 關 => Narration off
旁白 開 => Narration on
語音設定 => Voice settings
專注計時（25 分鐘） => Focus timer (25 min)
⏱ 專注 => ⏱ Focus
HUD 與視覺設定 => HUD and visual settings
流星雨：關 / 少量 / 大量 / 流星暴 => Meteors: off / few / many / storm
☄ 流星 => ☄ Meteors
畫質：省電 / 平衡 / 極致 / 4K => Quality: eco / balanced / ultra / 4K
=畫質 => Quality
=暫停 => Pause
暫停動畫 => Pause animation
▶ 播放動畫 => ▶ Play animation
＋ 匯入 => ＋ Import
=狀態 => Status
=連線中 => Connecting
警示 ·  => Alert · 
待處理 ·  => Pending · 
待完成 ·  => In progress · 
打回 ·  => Rejected · 
交付 ·  => Delivered · 
失敗 ·  => Failed · 
完成 ·  => Done · 
畫質 => Quality
把一般優先與「請回報」類的待辦全部延到明天 => Snooze all normal-priority and "please report" items to tomorrow
=日 => Sun
=一 => Mon
=二 => Tue
=三 => Wed
=四 => Thu
=五 => Fri
=六 => Sat
星雲甦醒中 => The nebula is waking up
點擊略過 => Click to skip
原恆星點燃 => Protostar ignites
物質沿分支聚集 => Matter gathers along the branches
專案星雲成形 => Project nebulae take shape
準備就緒 => Ready
」要開進哪個 Claude Project？ => ": which Claude Project should it open?
綁定一次，之後按 ▶ 就會直接進到這個分支的 Project，並把該做的指令帶進輸入框。 => Bind it once. After that, ▶ opens this branch's Project and puts the instructions in the input box.
打開我的 Projects 列表 ↗ => Open my Projects list ↗
點進對應的 Project，從上方網址列複製網址（claude.ai/project/…） => Open the matching Project and copy its URL from the address bar (claude.ai/project/…)
貼在下面，按「綁定並開始」 => Paste it below and press "Bind and start"
Claude Project 網址 => Claude Project URL
綁定並開始 => Bind and start
這次先用新對話開始（指令已帶入） => Start in a new chat this time (instructions included)
=取消 => Cancel
這次開啟期間不要再問 => Don't ask again this session
=匯入資料 => Import data
貼上 GPT 或 Claude 輸出的星雲 JSON，一次可以貼好幾段。 => Paste Nebula JSON produced by Claude or another assistant. You can paste several blocks at once.
星雲 JSON => Nebula JSON
等待貼上 => Waiting for input
寫入星雲 => Write to nebula
=清空 => Clear
=關閉 => Close
關閉 × => Close ×
給模組的回報格式 => Report format for modules
複製格式 => Copy format
=已複製 => Copied
請手動選取上方文字 => Select the text above manually
目前是警示狀態 => is in alert
星系狀態為警示 => Cluster status is alert
今天的 Daily 還沒做 => Today's Daily isn't done yet
每天開始工作的第一步 => The first step of every workday
我的待辦 => My tasks
=我的待辦 => My tasks
上次回報 => Last report
從未回報 => Never reported
已延到明天早上 6:00 => Snoozed until 6:00 tomorrow
正在開啟「 => Opening "
」Project，指令已帶入並複製；若輸入框是空的，直接貼上即可。 => " Project. The instructions are copied; paste them if the input box is empty.
正在開新的 Claude 對話，指令已帶入並複製。 => Opening a new Claude chat. The instructions are copied.
▶ 開始 => ▶ Start
▶ 打開 => ▶ Open
看指令 => Show prompt
=展開 => Expand
=收合 => Collapse
都處理好了 › => All clear ›
都處理好了 => All clear
正在載入你的專案… => Loading your projects…
點星雲上的分支或下方的專案，看它正在做什麼、需要你做什麼。 => Click a branch in the nebula or a project below to see what it is doing and what it needs from you.
個模組 => modules
=運行中 => Active
=待命 => Idle
=警示 => Alert
關閉工作卡 => Close work card
它正在做 => Working on
還沒有回報目前任務。 => No current task reported yet.
=負載 => Load
負載 => Load
=更新 => Updated
更新 => Updated
需要你做 => Needs you
需要你 => Needs you
這個分支目前不需要你做任何事。 => Nothing on this branch needs you right now.
已標記完成 => Marked done
全部恢復 => Restore all
=各模組 => Modules
未回報 => Not reported
還沒有回報 => No report yet
=最近動態 => Recent
沒有最近的訊號。 => No recent signals.
=儲存 => Save
最近 7 天每天標記完成的件數 => Items marked done per day, last 7 days
今天完成（ => Done today (
- （尚無） => - (none yet)
還待處理（ => Still open (
項｜最優先： =>  | top priority:
- 延到明天： => - Snoozed to tomorrow:
各分支目前任務 => Current task per branch
件一般優先／請回報類的待辦延到明天早上？ =>  normal-priority / report-request items to tomorrow morning?
=已延後 => Snoozed
件，今天專心處理高優先與 Daily。 =>  items. Focus on high priority and the Daily today.
=今日 => Today
✦ 今日主軸 => ✦ Today's theme
驗收： => Done when:
注意： => Watch out:
點一下收合 · 按 P 重新產生 => Click to collapse · press P to regenerate
下一段 => Next up
（點一下展開） => (click to expand)
筆交接（點一下看清單） =>  handoffs (click for the list)
筆交接 =>  handoffs
搜尋星座、模組或待辦…（Enter 前往、Esc 關閉） => Search constellations, modules or tasks… (Enter to go, Esc to close)
=搜尋 => Search
=星座 => Constellations
模組 · => Module ·
待辦 · => Task ·
找不到符合的項目 => No matches
✦ 上週回顧 => ✦ Last week
件完成 =>  done
最有產出的一天： => Most productive day:
· 推進最多： => · Most progress:
上週沒有標記完成的事項。這週我們從最重要的一件開始吧。 => Nothing was marked done last week. Let's start this week with the most important thing.
上週沒有標記完成的事項。 => Nothing was marked done last week.
🔊 播報 => 🔊 Read aloud
繼續這週 => On with this week
上週你一共完成了 => Last week you finished
件事。最有產出的是 =>  things. Your most productive day was
，完成了 => , with
推進最多的是 => Most progress:
這週也一起加油吧。 => Let's keep it up this week.
沒有未完成的交接。 => No open handoffs.
這個環境無法啟動 3D（WebGL）。右側與下方的工作清單仍可正常使用。 => 3D (WebGL) can't start here. The work lists on the right and below still work.
=關 => Off
=少量 => Few
=大量 => Many
=流星暴 => Storm
=完成 => Done
✓ 完成 => ✓ Done
⏳ 最久已等 => ⏳ Longest wait
· 完成 => · done
新增： =>  new:
=即時 => Live
即時同步 => Live sync
讀取 Notion 同步失敗： => Couldn't read the Notion sync:
讀取星雲失敗： => Couldn't read the nebula:
讀取訊號失敗： => Couldn't read signals:
連線不穩 => Unstable connection
需登入才能讀取 => Sign in to read data
離線版 · 資料截至 => Offline · data as of
請重新連接 Notion => Reconnect Notion
未連接 Notion（用排程資料） => Notion not connected (using synced data)
待允許讀取 Notion => Waiting for permission to read Notion
=排程 => Synced
使用排程同步資料 => Using synced data
直接讀取你的 Notion（每 20 分鐘與切回頁面時更新） => Reading your Notion directly (refreshes every 20 min and when you return to the page)
桌布資料已自動更新。 => Wallpaper data updated.
今天的待辦全部清空了，辛苦了！ => Today's list is clear. Nice work!
今日 Daily => Today's Daily
=被打回 => Sent back
待處理交接 => Open handoff
=沒有回報 => No report
=待處理 => Pending
=待完成 => In progress
=打回 => Rejected
=失敗 => Failed
=取消 => Cancelled
=交付 => Delivered
=任務 => Task
=想法 => Idea
=文檔 => Doc
=方案 => Plan
AI 執行 => AI runs it
驗收＆復盤 => Review & retro
AI-DLC 工作流 => AI-DLC workflow
目前沒有需要你處理的事。 => Nothing needs you right now.
可以休息，或點任一分支看看它在做什麼。 => Take a break, or click a branch to see what it is doing.
看分支 => Open branch
=略過 => Skip
⏭ 明天 => ⏭ Tomorrow
今天先不做，明天早上再出現 => Not today; show it again tomorrow morning
⏭ 低優先延後 => ⏭ Snooze low priority
沒有可延後的低優先待辦。 => No low-priority items to snooze.
AI-DLC：定義問題、拆成子步驟、驗收標準 => AI-DLC: define the problem, split into steps, set acceptance criteria
✦ 拆解 => ✦ Break down
◈ 處理中： => ◈ Working on:
目前任務： => Current task:
已綁定：▶ 會直接開進這個分支的 Claude Project，並帶入接續目前任務的指令 => Bound: ▶ opens this branch's Claude Project with instructions to continue the current task
已綁定，之後 ▶ 會直接開進這個 Project。 => Bound. From now on ▶ opens this Project.
已清除綁定。 => Binding cleared.
請貼上 claude.ai 開頭的 Project 網址。 => Paste a Project URL starting with claude.ai.
要貼的是 claude.ai/project/… 開頭的網址（在 Project 頁面上方網址列複製）。 => It must be a claude.ai/project/… URL (copy it from the address bar on the Project page).
連結你的工作 => Link your work
開始工作 => Start working
快捷鍵：/ 搜尋 · N 下一件 · S 開始 · D 完成 · Z 延到明天 · 1–9 星座 · B 簡報 · F 專注 · => Keys: / search · N next · S start · D done · Z tomorrow · 1–9 constellation · B briefing · F focus ·
日報已複製，可直接貼到 Notion 或 Claude。 => Report copied. Paste it into Notion or Claude.
無法自動複製；請展開「看指令」手動複製。 => Couldn't copy automatically. Open "Show prompt" and copy it by hand.
無法複製，請再按一次。 => Couldn't copy. Please try again.
你沒有編輯權限，無法標記。 => You don't have edit access, so you can't mark this.
你沒有這個頁面的編輯權限，改動只會存在這台電腦。 => You don't have edit access to this page; changes stay on this computer.
改動會自動存檔，並同步到你其他裝置。 => Changes save automatically and sync to your other devices.
標記失敗，請再試一次。 => Couldn't mark it. Please try again.
已新增待辦。 => Task added.
新增失敗： => Couldn't add:
＋ 新增 => ＋ Add
至少要保留一個星座。 => Keep at least one constellation.
已記住「 => Saved the new position of "
」的新位置。 => ".
專注 25 分鐘開始。星雲會安靜下來，時間到會提醒你。 => 25-minute focus started. The nebula quiets down and will let you know when time is up.
專注時間結束，起來動一動、喝口水吧。 => Focus time is over. Stretch and drink some water.
已停止專注計時。 => Focus timer stopped.
畫面錯誤： => Display error:
匯出沒有完成： => Export didn't finish:
未知原因 => unknown reason
已匯出最新離線桌布。到 Lively 換掉舊檔即可。 => Exported a fresh offline wallpaper. Swap it in your wallpaper app.
這個檢視無法下載檔案：請在瀏覽器開啟線上版再匯出。 => This view can't download files. Open the page in a browser and export again.
這個檢視無法使用 AI 計劃。 => AI planning isn't available here. Add an API key in HUD → Data.
這個檢視無法使用 AI。 => AI isn't available here. Add an API key in HUD → Data.
AI 正在排今天的計劃… => AI is planning your day…
AI 計劃沒有產生成功（ => The AI plan didn't come through (
今日計劃已排好。 => Today's plan is ready.
目前沒有待辦，不需要計劃。 => No open tasks, so no plan needed.
=省電 => Eco
=平衡 => Balanced
=極致 => Ultra
省電：30 FPS、較低解析度，適合筆電與內顯。 => Eco: 30 FPS, lower resolution. Good for laptops and integrated graphics.
平衡：60 FPS、原生解析度（最高 4K），清晰度與效能兼顧（推薦）。 => Balanced: 60 FPS at native resolution (up to 4K). Sharp and smooth (recommended).
極致：原生解析度、光束與最細雲層，不限幀數，建議獨立顯卡。 => Ultra: native resolution, light shafts and the finest clouds, uncapped FPS. A dedicated GPU is recommended.
4K：以 3840×2160 渲染再縮放到螢幕（超取樣），最清晰也最吃顯卡，建議獨立顯卡。 => 4K: renders at 3840×2160 and scales to your screen (supersampling). Sharpest and heaviest; a dedicated GPU is recommended.
鳳凰 => Phoenix
健身人形 => Athlete
鑽石 => Diamond
雷達箭 => Radar arrow
上升曲線 => Rising chart
書本 => Book
火箭 => Rocket
愛心 => Heart
音符 => Music note
地球 => Globe
皇冠 => Crown
葉子 => Leaf
閃電 => Lightning
羅盤 => Compass
山峰 => Mountain
晶片 => Chip
房屋 => House
星芒 => Star
看不出圖片的主體輪廓，請換一張主體清楚、背景單純的圖片。 => Couldn't find the subject's outline. Try an image with a clear subject and a plain background.
星系設定沒能存到雲端（ => Couldn't save galaxy settings to the cloud (
），已先存在這台電腦。 => ); saved on this computer for now.
），先存在這台電腦。 => ); saved on this computer for now.
星系設定：名稱、顏色、星座形狀 => Galaxy settings: names, colors, constellation shapes
=星系設定 => Galaxy settings
星系自定義 => Customize galaxy
自訂星座：數量不限 => Custom constellations: unlimited
✦ 星系 => ✦ Galaxy
＋ 新增星座 => ＋ Add constellation
↺ 重置星座位置 => ↺ Reset positions
在星空中直接拖曳星座的星星，就能移動它的位置。 => Drag a constellation's stars in the sky to move it.
自動（依名稱） => Auto (from name)
上傳的圖片 => Uploaded image
=名稱 => Name
=顏色 => Color
=形狀 => Shape
🖼 上傳圖片 => 🖼 Upload image
上傳圖片當星座形狀 => Use an image as the constellation shape
刪除這個星座 => Delete this constellation
=刪除 => Delete
恢復原本的名稱、顏色和形狀 => Restore the original name, color and shape
=還原 => Restore
形狀：上傳的圖片 => Shape: uploaded image
形狀： => Shape:
（依名稱自動） =>  (auto from name)
· 原名 => · original name
· 代碼 => · code
歸到這裡的 Notion 模組，用逗號分隔（例如 Research Notes） => Notion modules that belong here, comma-separated (e.g. Research Notes)
對應模組 => Mapped modules
刪除「 => Delete "
」這個星座？ => "?
新星座 => New constellation
星座位置已重置。 => Positions reset.
已把圖片變成星座。 => Turned the image into a constellation.
正在描出圖片輪廓… => Tracing the image outline…
請先按「上傳圖片」選一張圖。 => Press "Upload image" and pick a picture first.
這張圖片無法使用。 => This image can't be used.
每個星座可以改名字、顏色、形狀，並指定哪些 Notion 模組的交接要歸到它；沒有模組的星座也能直接在側欄新增自己的待辦。 => Each constellation can have its own name, color and shape, and you can choose which Notion modules feed it. Constellations without modules can still hold your own tasks.
改名字、顏色或星座形狀。形狀預設依名字自動挑選（例如含「鳳凰」就是鳳凰）；也可以上傳圖片，會描出圖片輪廓變成星座。 => Change the name, color or constellation shape. The shape is picked from the name by default (e.g. "phoenix" gives a phoenix); you can also upload an image and its outline becomes the constellation.
星河藍紫 => Galactic violet
極光翠綠 => Aurora green
熔金日冕 => Molten corona
深空黑曜 => Deep obsidian
=柔和 => Soft
=適中 => Medium
=標準 => Standard
=明亮 => Bright
行星地平線 => Planet horizon
=軌道環 => Orbit rings
=極光 => Aurora
日出光芒 => Sunrise rays
遠方螺旋星系 => Distant spiral galaxy
星座連線 => Constellation lines
前景星雲薄霧 => Foreground nebula haze
人造衛星 => Satellites
慢速彗星 => Slow comet
核心吸積盤 => Core accretion disk
全息戰術網格 => Holographic grid
變形鏡頭光暈 => Anamorphic lens streaks
事件音效 => Event sounds
星座插畫輪廓 => Constellation artwork
交接航道 => Handoff routes
深空星系 => Deep-space galaxies
核心資料環 => Core data ring
時間抗鋸齒 TAA => Temporal anti-aliasing (TAA)
核心體積光霧 => Core volumetric fog
巡航飛船 => Cruising ships
協作星雲帶 => Collaboration bands
軌道環週曆 => Week ring
視差星雲層 => Parallax nebula layers
小行星帶 => Asteroid belt
星座衛星 => Constellation moons
新交接探測器 => New-handoff probes
核心空間站 => Core space station
夜間自動調暗（22–6 點） => Dim automatically at night (22:00–6:00)
依時間變化天空 => Sky follows the time of day
星雲雷暴 => Nebula lightning
選取時景深（背景微模糊） => Depth of field when selected (soft background)
=青 => Cyan
=金 => Gold
=紫 => Violet
=綠 => Green
畫面角框與座標 => Corner frames and coordinates
頂部方位刻度 => Top bearing scale
核心鎖定準星 => Core lock reticle
即時數據讀數 => Live readouts
雷達小地圖 => Radar minimap
=掃描線 => Scanlines
只看高優先 => High priority only
只看選取的星座 => Selected constellation only
翠綠簾幕 => Green curtains
紫紅波浪 => Magenta waves
全彩流光 => Full spectrum
用目前的即時資料（含完成紀錄）產生一份離線桌布檔，存到下載資料夾；再到 Lively 換掉舊檔即可。 => Packs the current data (including what you marked done) into a single offline wallpaper file in your downloads.
這是離線版。要更新資料：在瀏覽器開啟線上版，從這裡匯出新的離線桌布。 => This is an offline copy. To refresh it, open the live page and export a new wallpaper from here.
抬頭顯示與視覺設定 => HUD and visual settings
顯示 HUD => Show HUD
=透明度 => Opacity
=元件 => Parts
=流星雨 => Meteors
場景主題 => Scene theme
星星亮度 => Star brightness
極光樣式 => Aurora style
交接航道篩選 => Route filter
場景元素 => Scene elements
=資料 => Data
⬇ 匯出最新離線桌布 => ⬇ Export offline wallpaper
聲優陣容 · 語音設定 => Voice cast · settings
=主播 => Lead voice
播報方式 => Format
=搭檔 => Partner
播報語言 => Spoken language
字幕語言 => Subtitle language
AI 台本：由 Claude 依角色把今天的事項寫成有感情的台詞並翻譯字幕（線上版） => AI script: Claude writes today's items as in-character lines with translated subtitles
聲音來源 => Voice source
整體語速 => Speaking rate
今日簡報內容 => Briefing sections
角色開場問候 => Character greeting
每天第一次點擊時自動播放今日簡報 => Play the briefing on the first click of the day
完成任務時角色回應一句 => Character reacts when you finish a task
旁白播報範圍 => Narration scope
停止播報 => Stop
■ 停止播報 => ■ Stop
最著急（警示、High、打回） => Most urgent (alerts, High, rejected)
今天該做（Daily 與各星系任務） => Today (Daily and cluster tasks)
還沒完成（待處理交接、未回報模組） => Still open (handoffs, silent modules)
各星系概況（負載與待處理數） => Cluster overview (load and open items)
同步狀態（Notion 與最近 Daily） => Sync status (Notion and latest Daily)
全部新訊號 => All new signals
每筆新進的訊號都播 => Announce every new signal
只播重要的 => Important only
打回、警示、High => Rejected, alerts, High
■ 停止 => ■ Stop
▶ 試聽對談 => ▶ Preview dialogue
▶ 試聽 => ▶ Preview
=試聽 => Preview
🔊 播放今日簡報 => 🔊 Play today's briefing
🔊 播放 => 🔊 Play
單人播報 => Solo
主播一人從頭講到尾 => The lead voice reads everything
雙人對談 => Duo
主播報告，搭檔接話補充 => The lead reports and the partner chimes in
自動（建議） => Auto (recommended)
=自動 => Auto
自動 => Auto
跟系統： => System:
=中文 => Chinese
=繁體 => Traditional Chinese
不顯示 => Off
此環境不提供 => Not available here
（找不到這個語言的語音） =>  (no voice for this language)
（多語） =>  (multilingual)
這台電腦缺少 => This computer has no
語音。Windows：設定 → 時間與語言 → 語音 → 新增語音（中文（台灣）／日本語）。用 Microsoft Edge 開啟時，還會多出更自然的線上神經語音。 =>  voice. Windows: Settings → Time & language → Speech → Add voices. Microsoft Edge uses more natural online voices automatically.
這個檢視無法播放語音，或你已在此頁面的權限選單關閉朗讀；簡報仍會以文字顯示。 => Speech isn't available in this view, or it was turned off in the page permissions; the briefing still shows as text.
這個檢視無法播放語音（或你已在此頁面的權限選單關閉朗讀），簡報以文字顯示。 => Speech isn't available here (or was turned off in the page permissions); the briefing shows as text.
這個檢視無法播放語音，簡報以文字顯示。 => Speech isn't available here; the briefing shows as text.
這個檢視目前無法使用語音。 => Speech isn't available in this view right now.
角色都是原創的。旁白要在底部「旁白 開」時才會播報新訊號；播報中按 Esc 或字幕上的 ■ 可以停止。 => All characters are original. Narration announces new signals only when "Narration on" is set at the bottom; press Esc or ■ on the caption to stop.
日語為主（推薦） => Mostly Japanese (recommended)
=依角色 => Per character
雪菜・蒼真・琉璃・凜：日語｜鳳凰・鐵山：中文 => Yukina, Souma, Ruri, Rin: Japanese | Phoenix, Tetsuzan: Chinese
全部中文 => All Chinese
台灣華語 => Taiwan Mandarin
全部日本語 => All Japanese
全部 English => All English
=男聲 => male
=女聲 => female
男聲 => male
女聲 => female
Claude 聲音 => Claude voices
Edge／系統神經語音 => Edge / system neural voices
沒有自然語音時用 Claude 聲音 => Use Claude voices when no natural voice is installed
男女分明，可逐一指定、試聽 => Clear male and female voices you can assign and preview
偵測到 Edge 自然語音：男女聲線正確 => Edge natural voices detected: male and female voices are correct
非英文時可能都變成同一種聲線 => Non-English lines may all use the same voice
的聲音 => 's voice
DAILY BRIEFING 今日簡報 => DAILY BRIEFING
✎ 編寫台本中… => ✎ Writing script…
AI 正在依角色編寫今天的台本（約數秒）… => AI is writing today's script for the cast (a few seconds)…
請先點一下桌布，再按播放。 => Click the wallpaper once, then press play.
語音服務暫時出錯，請再按一次。 => The voice service hit an error. Please press again.
語音沒有回應，已重設。請再按一次播放。 => The voice didn't respond and was reset. Press play again.
語音用量暫時達上限，請稍後再試。 => Voice usage limit reached for now. Try again later.
麥克風或系統正在使用中，稍後再試。 => The audio device is busy. Try again later.
雪菜 => Yukina
蒼真 => Souma
琉璃 => Ruri
=凜 => Rin
鐵山 => Tetsuzan
秘書 · 溫柔知性 => Secretary · gentle
副官 · 低音沉穩 => Second-in-command · calm
領航員 · 元氣少女 => Navigator · cheerful
主控 AI · 沉穩管家 => Core AI · composed butler
參謀 · 冷靜毒舌 => Strategist · sharp-tongued
艦長 · 熱血豪爽 => Captain · fiery
=工作台任務 => Workbench task
=項目資料 => Project material
=長期知識 => Long-term knowledge
=臨時想法 => Passing thought
可沉澱 Skill => Skill candidate
=沒能存到雲端（ => Couldn't save to the cloud (
沒能存到雲端（ => Couldn't save to the cloud (
AI 沒有回應成功（ => The AI didn't respond (
），請再試一次。 => ). Please try again.
先寫下一個想法。 => Write down an idea first.
已歸檔： => Filed:
已先存進想法入口，稍後可以再請 AI 歸檔。 => Saved to the idea inbox. You can ask AI to file it later.
沒有可加入的分支。 => No branch to add it to.
沒有編輯權限，無法新增待辦。 => No edit access; can't add tasks.
已加入「 => Added to "
」的待辦。 => " tasks.
找不到這件待辦。 => Couldn't find that task.
已把 => Added
個子步驟加入「 =>  steps to "
=未歸檔 => Not filed
已轉待辦 => Turned into a task
底層問題 => Underlying problem
＋ 轉成待辦 => ＋ Make it a task
✦ 沉澱為 Skill => ✦ Save as skill
✦ AI 歸檔 => ✦ File with AI
AI 歸檔中… => Filing with AI…
先存起來 => Just save it
AI 驅動項目全生命週期：把模糊想法拆成可落地的生產鏈 => AI-driven project lifecycle: turn fuzzy ideas into a production line you can ship
① 想法入口 => ① Idea inbox
② 任務拆解 => ② Breakdown
③ Skill 庫 => ③ Skills
④ 結構地圖 => ④ Structure map
知識庫的第一層是信息入口，不是筆記。散落的想法先放這裡，不讓資訊失控。 => The first layer of a knowledge base is an inbox, not notes. Drop loose ideas here so nothing gets lost.
AI 正在拆解… => AI is breaking it down…
驗收標準 => Acceptance criteria
＋ 子步驟加入待辦 => ＋ Add steps as tasks
✦ 存成 Skill => ✦ Save as skill
重新拆解 => Break down again
在任何待辦卡片按「✦ 拆解」，或從下面挑一件： => Press "✦ Break down" on any task card, or pick one below:
AI 分析中… => AI is analyzing…
✦ 找可沉澱的重複工作 => ✦ Find repeated work worth saving
=建議 => Suggested
=情境 => When
=例子 => Examples
＋ 存進 Skill 庫 => ＋ Save to skills
=用過 => Used
用過 => Used
▶ 在 Claude 使用 => ▶ Use in Claude
複製指令 => Copy prompt
重複做的事沉澱成 Skill：一段固定指令，下次一鍵帶進 Claude，不用重想。 => Turn repeated work into a skill: a fixed prompt you can send to Claude in one click next time.
所有想法、待辦與 Skill 落在同一張圖上：從零散文件變成戰略地圖。 => All ideas, tasks and skills on one map: from scattered files to a strategic map.
=待辦 => Tasks
=未歸屬 => Unassigned
未歸屬 => Unassigned
Skill 庫 => Skill library
📋 複製日報 => 📋 Copy report
✦ 重排今日計劃 => ✦ Re-plan today
已存進 Skill 庫。 => Saved to skills.
新 Skill => New skill
已存進 Skill 庫，可到「③ Skill 庫」修改。 => Saved. Edit it under "③ Skills".
指令已複製。 => Prompt copied.
已在 Claude 開啟並帶入指令。 => Opened in Claude with the prompt.
目前沒找到明顯重複的工作。 => No clearly repeated work found yet.
：不是物件 => : not an object
：缺少 cluster => : missing cluster
：找不到星系 => : cluster not found
（可用： =>  (available:
：缺少 module => : missing module
：load 要是 0-100 的數字 => : load must be a number 0-100
：status 只能是 active / idle / alert => : status must be active / idle / alert
可寫入 =>  ready:
筆訊號：\n =>  signals:\n
筆訊號。 =>  signals.
已寫入 => Written:
個模組、 =>  modules,
寫入被拒絕：你目前沒有編輯權限。 => Write refused: you don't have edit access.
資料庫已滿，請 Claude 清理舊訊號。 => The database is full. Remove old signals first.
寫入失敗，請稍後再試一次。（ => Write failed. Please try again later. (
=夜深了 => Working late
=早安 => Good morning
=午安 => Good afternoon
=下午好 => Good afternoon
=晚安 => Good evening
，指揮官。 => , Commander.
個星系中 =>  clusters,
個在線， =>  online,
項交接等待處理。 =>  handoffs waiting.
→ 核心 => → core
=接收 => received
=訊號 => signal
優先事項： => Priority:
目前沒有高優先的待處理交接。 => No high-priority handoffs right now.
模組回報率 => Module report rate
個模組超過 7 天未回報。 =>  modules haven't reported in over 7 days.
Notion 最近一次同步在 => Last Notion sync
，下一次排程會自動更新。 => ; the next scheduled sync will refresh it.
尚未收到 Notion 同步。 => No Notion sync yet.
點任一條分支，可以看它正在做什麼、需要你做什麼；拖曳可以旋轉星雲。 => Click any branch to see what it's doing and what it needs; drag to rotate the nebula.
新訊號 => New signal
狀態為警示 =>  is in alert
星系警示 => Cluster alert
今日 Daily（Notion 每日紀錄） => Today's Daily
上一次： => Last:
尚無 Daily 紀錄 => No Daily yet
· 目前任務 => · current task
個模組超過 7 天沒有回報，包括 =>  modules haven't reported in 7+ days, including
模組回報 => Module reports
今天是 => Today is
個星系在線，有 =>  clusters online,
項交接等待處理，其中 =>  handoffs waiting,
項需要優先注意。 =>  need attention first.
：負載 => : load
項待處理 =>  open
沒有待處理 => nothing open
，狀態 => , status
=未知 => unknown
最近一筆 Daily： => Latest Daily:
連線中 => Connecting
接收 => Incoming:
還沒綁定這個分支的 Claude Project。貼上 Project 網址，▶ 就會直接開進該 Project： => This branch isn't bound to a Claude Project yet. Paste a Project URL and ▶ will open that Project directly:
新增一件待辦到這個星座… => Add a task to this constellation…
新增待辦 => Add task
想法、資料、經驗……先丟進來。AI 會找出底層問題、判斷類型、歸到對應專案，並給下一步。（Ctrl+Enter 歸檔） => Ideas, material, lessons… drop them here. AI finds the underlying problem, picks a type, files it under a project and suggests the next step. (Ctrl+Enter to file)
艦長 · 熱血大叔 => Captain · fiery veteran
=全部 => All
● 青 => ● Cyan
● 金 => ● Gold
● 紫 => ● Violet
● 綠 => ● Green
大量 => many
少量 => few
流星暴 => storm
平衡 => balanced
省電 => eco
極致 => ultra
=雪 => Y
=蒼 => S
=琉 => R
=鳳 => P
=鐵 => T
`;

const PATTERNS = [
  [/(\d+)\s*分前/g, "$1m ago"], [/(\d+)\s*小時前/g, "$1h ago"], [/(\d+)\s*天前/g, "$1d ago"], [/剛剛/g, "just now"],
  [/已等\s*/g, "waiting "], [/(\d+)\s*小時/g, "$1h"], [/(\d+)\s*分(?!鐘)/g, "$1m"], [/(\d+)\s*天/g, "$1d"],
  [/第\s*(\d+)\s*筆/g, "Item $1"],
  [/(\d+)\s*項\s*›/g, "$1 items ›"], [/(\d+)\s*項/g, "$1 items"], [/(\d+)\s*件/g, "$1"], [/(\d+)\s*個/g, "$1"], [/(\d+)\s*筆/g, "$1"], [/(\d+)\s*次/g, "$1×"],
  [/需要你\s*(\d+)/g, "Needs you $1"], [/待辦\s*(\d+)/g, "Tasks $1"], [/完成\s*(\d+)%/g, "done $1%"], [/(\d+)\s*今日/g, "$1 today"], [/完成\s*(\d+)\/(\d+)/g, "Done $1/$2"], [/\s關$/g, " off"], [/今日\s*(\d)/g, "Today $1"]
];
const PRE = [[/週([日一二三四五六])/g, (_, d) => " " + ({ 日: "Sun", 一: "Mon", 二: "Tue", 三: "Wed", 四: "Thu", 五: "Fri", 六: "Sat" })[d] + " "]];
const EXACT = new Map(), FRAG = [];
for (const line of DICT.split("\n")){
  const i = line.indexOf(" => "); if (i < 0) continue;
  let k = line.slice(0, i), v = line.slice(i + 4).replace(/\\n/g, "\n").trim();
  if (/"$/.test(v) && (v.match(/"/g) || []).length % 2) v = v.slice(0, -1) + "“";      // value opens a quote: Opening “
  else if (/^"/.test(v) && (v.match(/"/g) || []).length % 2) v = "”" + v.slice(1);    // value closes a quote: ”: which …
  if (k.startsWith("=")) EXACT.set(k.slice(1).trim(), v); else if (k.trim()) FRAG.push([k.replace(/\\n/g, "\n"), v]);
}
FRAG.sort((a, b) => b[0].length - a[0].length);
const fragRe = FRAG.length ? new RegExp(FRAG.map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g") : null;
const fragMap = new Map(FRAG);
const CJK = /[㐀-鿿]/;
const PUNCT = [[/：/g, ": "], [/，/g, ", "], [/。/g, ". "], [/、/g, ", "], [/「/g, "“"], [/」/g, "”"], [/（/g, " ("], [/）/g, ") "], [/｜/g, " | "], [/；/g, "; "], [/？/g, "?"], [/！/g, "!"]];
const cache = new Map();
function T(str){
  if (!str || !CJK.test(str)) return str;
  if (cache.has(str)) return cache.get(str);
  const lead = str.match(/^\s*/)[0], tail = str.match(/\s*$/)[0], core = str.trim();
  let out;
  if (EXACT.has(core)) out = lead + EXACT.get(core) + tail;
  else {
    out = str;
    for (const [re, to] of PRE) out = out.replace(re, to);
    if (fragRe) out = out.replace(fragRe, m => " " + fragMap.get(m) + " ");
    for (const [re, to] of PATTERNS) out = out.replace(re, to);
    if (EXACT.has(out.trim())) out = EXACT.get(out.trim());
    if (!CJK.test(out)) for (const [re, to] of PUNCT) out = out.replace(re, to);
    out = lead + out.replace(/[ \t]{2,}/g, " ").replace(/ ([,.:;)?!”])/g, "$1").replace(/([(“]) /g, "$1").replace(/“”/g, "").replace(/ 's\b/g, "'s").trim() + tail;
  }
  if (cache.size > 4000) cache.clear();
  cache.set(str, out); return out;
}
window.phxT = T;

const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "CODE", "PRE"]);
const ATTRS = ["title", "placeholder", "aria-label", "data-tip"];
const skip = el => { for (let e = el; e; e = e.parentElement){ if (SKIP.has(e.tagName) || e.hasAttribute?.("data-noi18n") || e.isContentEditable) return true; } return false; };
function doText(n){ const v = n.nodeValue; if (!CJK.test(v) || skip(n.parentElement)) return; const t = T(v); if (t !== v) n.nodeValue = t; }
function doEl(el){
  if (el.nodeType !== 1 || el.hasAttribute("data-noi18n") || skip(el.parentElement)) return;
  for (const a of ATTRS){ const v = el.getAttribute(a); if (v && CJK.test(v)){ const t = T(v); if (t !== v) el.setAttribute(a, t); } }
  if (el.tagName === "OPTION" || el.tagName === "BUTTON" || el.tagName === "INPUT"){ const v = el.getAttribute("value"); if (el.tagName === "INPUT" && (el.type === "button" || el.type === "submit") && v && CJK.test(v)) el.value = T(v); }
}
function walk(root){
  if (root.nodeType === 3) return doText(root);
  if (root.nodeType !== 1) return;
  doEl(root);
  const w = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) n.nodeType === 3 ? doText(n) : doEl(n);
}
const mo = new MutationObserver(list => {
  for (const m of list){
    if (m.type === "characterData") doText(m.target);
    else if (m.type === "attributes") doEl(m.target);
    else m.addedNodes.forEach(walk);
  }
  if (CJK.test(document.title)) document.title = T(document.title);
});
mo.observe(document.documentElement, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
document.addEventListener("DOMContentLoaded", () => { walk(document.body); document.title = T(document.title); });
for (const fn of ["alert", "confirm", "prompt"]){ const o = window[fn]; if (o) window[fn] = (msg, ...r) => o.call(window, T(String(msg ?? "")), ...r); }
})();
