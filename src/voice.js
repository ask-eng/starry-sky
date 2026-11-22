/* ---------- 聲優陣容：original characters; each speaks Chinese, Japanese or English in its own manner ---------- */
const LANGS = { zh: "中文", ja: "日本語", en: "English" };
const CAST = {
  yukina: { name: "雪菜", en: "YUKINA", role: "秘書 · 溫柔知性", color: "#c4b2ff", voice: "airy", rate: .96, g: "f", pitch: 1.08, lang: "ja",
    persona: "Yukina: a gentle, elegant, warm secretary with a soft, clear, refined voice. Japanese: polite feminine speech (です/ます, soft ね/よ), occasional ふふっ, tender pauses with ……. Chinese: warm and polite. English: soft and caring.",
    pick: { zh: [/HsiaoChen/i, /Xiaoxiao/i, /HsiaoYu/i, /Yating/i, /Hanhan/i], ja: [/Nanami/i, /Shiori/i, /Mayu/i, /Aoi/i, /Haruka/i, /Ayumi/i], en: [/Aria/i, /Jenny/i, /Sonia/i, /Zira/i] },
    L: {
      zh: { greet: hi => `${hi}，指揮官。我是雪菜。……呵呵，今天也很高興見到你。`, urgent: "首先，跟你說說比較急的事。", today: "那麼，這是今天的工作。", open: "還有……有一些事情還沒完成。", clusters: "也跟你說說各星系的狀況。", sync: "這是同步的狀態。",
        item: (i, t) => `第${i}件，${t}`, close: "今天的報告就到這裡。別太勉強自己喔。……我會一直為你加油的。", after: { urgent: "沒關係的。我們一件一件，一起處理吧。", today: "先把 Daily 完成，之後一定會輕鬆很多。", open: "不用今天全部做完也沒關係。從需要的開始，好嗎？" },
        signal: c => `指揮官，${c}傳來新的消息了。`, narrOn: "旁白已經開啟了。有任何狀況，我會馬上告訴你。", test: "初次見面，指揮官。我是秘書雪菜。今後請多指教。" },
      ja: { greet: hi => `${hi}、指揮官。雪菜です。……ふふっ、今日もお会いできて嬉しいです。`, urgent: "まずは、急ぎの件からお伝えしますね。", today: "それでは、今日のお仕事です。", open: "それと……まだ終わっていないものが、少しだけ残っています。", clusters: "各星系の様子もお伝えしますね。", sync: "同期の状況です。",
        close: "以上で、今日のご報告はおしまいです。無理はしないでくださいね。……応援しています。", after: { urgent: "大丈夫です。ひとつずつ、一緒に片付けていきましょう。", today: "デイリーを先に済ませると、きっと楽になりますよ。", open: "全部を今日やらなくても、いいんです。必要なものから、ね。" },
        signal: c => `指揮官、${c}から新しい知らせが届きました。`, narrOn: "ナレーションをオンにしました。何かあれば、すぐにお知らせしますね。", test: "はじめまして、指揮官。秘書の雪菜です。これから、よろしくお願いしますね。" },
      en: { greet: hi => `${hi}, Commander. It's Yukina. ...It's lovely to see you again today.`, urgent: "Let me start with the urgent matters.", today: "Now, here's today's work.", open: "And... a few things are still unfinished.", clusters: "Here's how each cluster is doing.", sync: "Here's the sync status.",
        close: "That's all for today's report. Please don't push yourself too hard. ...I'm cheering for you.", after: { urgent: "It's alright. Let's take them one at a time, together.", today: "Finish your Daily first, and things will feel much lighter.", open: "You don't have to do everything today. Start with what matters." },
        signal: c => `Commander, a new message just arrived from ${c}.`, narrOn: "Narration is on. I'll let you know the moment anything happens.", test: "Nice to meet you, Commander. I'm Yukina, your secretary. I look forward to working with you." } } },
  souma: { name: "蒼真", en: "SOUMA", role: "副官 · 低音沉穩", color: "#7cc0ff", voice: "rounded", rate: .94, g: "m", pitch: .84, lang: "ja",
    persona: "Souma: a calm, low-voiced, dependable second-in-command; cool but quietly kind. Japanese: plain masculine speech (だ/だろう/俺/お前), short confident sentences. Chinese: steady and reassuring. English: composed and brief.",
    pick: { zh: [/YunJhe/i, /Yunxi\b/i, /Yunjian/i, /Zhiwei/i, /Kangkang/i], ja: [/Keita/i, /Naoki/i, /Daichi/i, /Ichiro/i, /Otoya/i], en: [/Guy/i, /Davis/i, /Ryan/i, /Christopher/i, /David/i] },
    L: {
      zh: { greet: hi => `${hi}，指揮官。我是副官蒼真。……今天，背後也交給我吧。`, urgent: "最優先的案件。仔細聽好。", today: "傳達今天的任務。", open: "未完成的事項，也確認一下吧。", clusters: "各星系的狀況。", sync: "同步紀錄。",
        item: (i, t) => `第${i}，${t}`, close: "報告到此為止。……你一定做得到。走吧，指揮官。", after: { urgent: "不用著急。順序我會幫你整理好。", today: "從 Daily 開始。那是最快的捷徑。", open: "別一個人扛太多。懂得取捨，也是指揮官的工作。" },
        signal: c => `${c}傳來報告了。`, narrOn: "旁白開始。有任何動靜，我會立刻告訴你。", test: "我是副官蒼真。……放心吧，有我在。" },
      ja: { greet: hi => `${hi}、指揮官。副官の蒼真だ。……今日も、背中は俺に任せろ。`, urgent: "最優先の案件だ。よく聞いてくれ。", today: "今日の任務を伝える。", open: "未完了の件も、確認しておこう。", clusters: "各星系の状況だ。", sync: "同期記録だ。",
        close: "報告は以上だ。……お前ならやれる。行こう、指揮官。", after: { urgent: "焦らなくていい。俺が順番を整えておく。", today: "デイリーから始めろ。それが一番の近道だ。", open: "抱え込みすぎるな。切り捨てる判断も、指揮官の仕事だ。" },
        signal: c => `${c}から報告が入った。`, narrOn: "ナレーションを開始する。動きがあれば、すぐに伝える。", test: "副官の蒼真だ。……安心しろ。俺がついている。" },
      en: { greet: hi => `${hi}, Commander. Souma, your second-in-command. ...I've got your back today, too.`, urgent: "Top priority. Listen closely.", today: "Here are today's orders.", open: "Let's also check what's still open.", clusters: "Cluster status.", sync: "Sync log.",
        close: "That's the report. ...You can do this. Let's go, Commander.", after: { urgent: "No need to rush. I'll line them up for you.", today: "Start with your Daily. It's the shortest path.", open: "Don't carry everything alone. Knowing what to drop is part of command." },
        signal: c => `Report incoming from ${c}.`, narrOn: "Narration on. I'll tell you the moment anything moves.", test: "I'm Souma, your second-in-command. ...Relax. I'm here." } } },
  ruri: { name: "琉璃", en: "RURI", role: "領航員 · 元氣少女", color: "#ff8fc8", voice: "airy", rate: 1.06, g: "f", pitch: 1.25, lang: "ja",
    persona: "Ruri: an energetic, cheerful young navigator girl. Japanese: casual cute speech (だよ/ね/〜！), lots of exclamations. Chinese: lively with 唷/喔/～. English: bubbly.",
    pick: { zh: [/Xiaoyi/i, /HsiaoYu/i, /Xiaoxiao/i, /HsiaoChen/i, /Yating/i, /Hanhan/i], ja: [/Aoi/i, /Mayu/i, /Nanami/i, /Haruka/i, /Ayumi/i, /Kyoko/i], en: [/\bAna\b/i, /Aria/i, /Jenny/i, /Samantha/i, /Zira/i] },
    L: {
      zh: { greet: hi => `${hi}～指揮官！琉璃來報到囉！今天的星雲也閃閃發亮唷！`, urgent: "緊急狀況！這幾件要先處理喔！", today: "今天的任務清單來囉～", open: "還有這些沒完成，別忘了唷！", clusters: "各個星系的狀況是這樣的～", sync: "同步狀態報告！",
        item: (i, t) => `第${i}個！${t}`, close: "播報完畢～今天也一起加油吧！", after: { urgent: "嗚哇，有點多耶……不過按下開始就能直接處理喔！", today: "先把 Daily 做完，其它就好排多了～", open: "一件一件來，琉璃陪你！" },
        signal: c => `叮咚！${c}傳來新消息！`, narrOn: "旁白開啟！有新訊號的話，琉璃馬上告訴你！", test: "指揮官好～我是琉璃，負責導航和播報。今天也請多指教！" },
      ja: { greet: hi => `${hi}、指揮官！ルリだよ！今日も星雲がキラキラしてるね！`, urgent: "緊急事態！これを先に片付けよう！", today: "今日のミッション、いっくよ〜！", open: "まだ終わってないのはこれ！忘れないでね！", clusters: "各星系の様子はこんな感じ！", sync: "同期レポート！",
        close: "以上、ルリの放送でした！今日も一緒にがんばろうね！", after: { urgent: "うわぁ、ちょっと多いね……でも「開始」を押せば、すぐ取りかかれるよ！", today: "まずデイリーを終わらせたら、あとはスムーズだよ〜！", open: "ひとつずつ片付けよう。ルリも一緒だよ！" },
        signal: c => `ピンポーン！${c}から新しい知らせだよ！`, narrOn: "ナレーション、オン！新しいシグナルが来たら、すぐ教えるね！", test: "指揮官、はじめまして！ナビゲーターのルリです。よろしくね！" },
      en: { greet: hi => `${hi}, Commander! Ruri reporting in! The nebula is sparkling today!`, urgent: "Emergency! Let's handle these first!", today: "Here's today's mission list!", open: "These aren't done yet. Don't forget!", clusters: "Here's how each cluster is doing!", sync: "Sync report!",
        close: "That's all from Ruri! Let's do our best today!", after: { urgent: "Whoa, that's a lot... but just press Start to jump right in!", today: "Finish your Daily first, and the rest gets easier!", open: "One at a time. I've got your back!" },
        signal: c => `Ding! New signal from ${c}!`, narrOn: "Narration on! I'll tell you the moment a new signal arrives!", test: "Hi, Commander! I'm Ruri, your navigator. Nice to meet you!" } } },
  phoenix: { name: "鳳凰", en: "PHOENIX", role: "主控 AI · 沉穩管家", color: "#f4cb72", voice: "buttery", rate: .96, g: "m", pitch: .9, lang: "zh",
    persona: "Phoenix: the composed AI core, a refined butler-like system voice. Polite, precise, reassuring in every language.",
    pick: { zh: [/YunJhe/i, /Yunxi\b/i, /Yunyang/i, /Zhiwei/i, /Kangkang/i], ja: [/Keita/i, /Naoki/i, /Daichi/i, /Ichiro/i, /Otoya/i], en: [/Ryan/i, /Guy/i, /Christopher/i, /David/i, /Daniel/i] },
    L: {
      zh: { greet: hi => `${hi}，指揮官。鳳凰系統已上線，所有星系連線正常。`, urgent: "首先，最需要注意的事項。", today: "接著，今天的工作。", open: "最後，尚未完成的項目。", clusters: "各星系概況。", sync: "同步狀態。",
        item: (i, t) => `第${i}，${t}`, close: "以上是今天的簡報。祝你今天順利，指揮官。", after: { urgent: "建議優先處理這幾項。按下「開始」，我會把指令準備好。", today: "完成 Daily 之後，我會依照你的狀態重新排序。", open: "這些項目已經等了一段時間，可以視情況標記完成。" },
        signal: c => `${c}回報。`, narrOn: "語音旁白已開啟。有新的訊號進來時，我會為你播報。", test: "你好，指揮官。我是鳳凰，這座星雲的主控系統。" },
      ja: { greet: hi => `${hi}、指揮官。フェニックス・システム、起動しました。全星系、接続良好です。`, urgent: "まず、最も注意が必要な事項です。", today: "次に、本日の作業です。", open: "最後に、未完了の項目です。", clusters: "各星系の概況です。", sync: "同期状況です。",
        close: "本日のブリーフィングは以上です。良い一日を、指揮官。", after: { urgent: "これらを優先してください。「開始」を押せば、指示を準備します。", today: "デイリーが終わり次第、状況に合わせて並べ替えます。", open: "しばらく待っている項目です。必要に応じて、完了にしてください。" },
        signal: c => `${c}から報告です。`, narrOn: "音声ナレーションを有効にしました。新しいシグナルが届いたら、お知らせします。", test: "こんにちは、指揮官。この星雲のメインシステム、フェニックスです。" },
      en: { greet: hi => `${hi}, Commander. Phoenix systems online. All clusters connected.`, urgent: "First, the items that need your attention most.", today: "Next, today's work.", open: "Finally, the items still open.", clusters: "Cluster overview.", sync: "Sync status.",
        close: "That concludes today's briefing. Have a good day, Commander.", after: { urgent: "I recommend handling these first. Press Start, and I'll prepare the instructions.", today: "Once your Daily is done, I'll reprioritize around it.", open: "These have been waiting a while. Mark them done if they no longer matter." },
        signal: c => `Report from ${c}.`, narrOn: "Voice narration enabled. I'll announce new signals as they arrive.", test: "Hello, Commander. I am Phoenix, the core system of this nebula." } } },
  rin: { name: "凜", en: "RIN", role: "參謀 · 冷靜毒舌", color: "#8be6ff", voice: "glassy", rate: 1.02, g: "f", pitch: 1.05, lang: "ja",
    persona: "Rin: a cool, sharp-tongued strategist girl who secretly cares (a little tsundere). Short, blunt sentences; a hidden soft line at the end.",
    pick: { zh: [/HsiaoChen/i, /Xiaomo|Xiaoxuan|Xiaorui/i, /Xiaoxiao/i, /Yating/i, /Hanhan/i], ja: [/Shiori/i, /Nanami/i, /Sayaka/i, /Haruka/i, /Kyoko/i], en: [/Sonia/i, /Michelle/i, /Aria/i, /Zira/i] },
    L: {
      zh: { greet: hi => `${hi}。指揮官，我是凜。廢話不多說，開始報告。`, urgent: "優先事項。", today: "本日任務。", open: "未完成事項。", clusters: "星系狀態。", sync: "同步紀錄。",
        item: (i, t) => `其${i}，${t}`, close: "報告完畢。……別太勉強自己，我是說工作效率會下降。", after: { urgent: "這些拖下去只會更麻煩。現在就處理。", today: "很合理的份量。應該做得完吧？", open: "堆了不少呢。需要的話，清掉不重要的。" },
        signal: c => `${c}，有新報告。`, narrOn: "旁白開啟。有事我會說，沒事我不會吵你。", test: "……我是凜，負責分析和參謀。有問題就問，別浪費時間。" },
      ja: { greet: hi => `${hi}。指揮官、リンです。無駄話はなし、報告を始めます。`, urgent: "優先事項。", today: "本日のタスク。", open: "未完了の項目。", clusters: "星系ステータス。", sync: "同期記録。",
        close: "報告は以上。……あまり無理しないで。効率が落ちるだけだから。", after: { urgent: "放っておくと面倒になるだけ。今すぐ処理して。", today: "妥当な量ね。終わらせられるでしょう？", open: "ずいぶん溜まってるわね。不要なものは消していいわ。" },
        signal: c => `${c}より報告。`, narrOn: "ナレーション開始。用があれば言う。なければ黙ってる。", test: "……リンよ。分析と参謀担当。質問があるなら、手短に。" },
      en: { greet: hi => `${hi}. Commander, Rin here. No small talk. Beginning report.`, urgent: "Priority items.", today: "Today's tasks.", open: "Open items.", clusters: "Cluster status.", sync: "Sync log.",
        close: "End of report. ...Don't push yourself too hard. Your efficiency drops, that's all.", after: { urgent: "Leaving these will only make things worse. Deal with them now.", today: "A reasonable load. You can finish it, right?", open: "Quite a pile. Clear out what doesn't matter." },
        signal: c => `${c}, reporting.`, narrOn: "Narration on. I'll speak when it matters, and stay quiet when it doesn't.", test: "...I'm Rin. Analysis and strategy. Keep your questions short." } } },
  tetsu: { name: "鐵山", en: "TETSUZAN", role: "艦長 · 熱血大叔", color: "#ff8a5c", voice: "rounded", rate: .95, g: "m", pitch: .78, lang: "zh",
    persona: "Tetsuzan: a hot-blooded veteran fleet captain, loud and encouraging, military commands and hearty laughter.",
    pick: { zh: [/Yunjian/i, /Yunye/i, /Yunyang/i, /YunJhe/i, /Zhiwei/i, /Kangkang/i], ja: [/Daichi/i, /Naoki/i, /Keita/i, /Ichiro/i], en: [/Davis/i, /Tony/i, /Eric/i, /Guy/i, /Mark/i, /David/i] },
    L: {
      zh: { greet: hi => `${hi}，指揮官！鳳凰艦隊全員就位！`, urgent: "警報！以下目標立刻處理！", today: "今日作戰目標！", open: "尚未攻克的目標！", clusters: "艦隊各部狀況！", sync: "通訊紀錄！",
        item: (i, t) => `目標${i}：${t}`, close: "以上！全艦，出擊！", after: { urgent: "不要猶豫，一個一個拿下！", today: "穩紮穩打，今天一定能完成！", open: "撤退不可恥，該放下的就放下！" },
        signal: c => `報告！${c}來電！`, narrOn: "旁白開啟！有任何動靜，本艦長立刻通報！", test: "哈哈！我是艦長鐵山！有我在，什麼困難都不怕！" },
      ja: { greet: hi => `${hi}、指揮官！フェニックス艦隊、総員配置完了！`, urgent: "警報！以下の目標、ただちに処理せよ！", today: "本日の作戦目標！", open: "まだ攻略していない目標！", clusters: "艦隊各部の状況！", sync: "通信記録！",
        close: "以上！全艦、出撃だ！", after: { urgent: "迷うな、一つずつ落としていけ！", today: "着実にいけば、今日中に必ず終わる！", open: "撤退は恥じゃない。手放すものは手放せ！" },
        signal: c => `報告！${c}より入電！`, narrOn: "ナレーション開始！動きがあれば、この艦長がすぐに知らせる！", test: "ははは！艦長のテツザンだ！俺がいれば、どんな困難も怖くない！" },
      en: { greet: hi => `${hi}, Commander! Phoenix fleet, all hands at stations!`, urgent: "Alert! Take these targets down immediately!", today: "Today's battle objectives!", open: "Targets not yet taken!", clusters: "Fleet status!", sync: "Comms log!",
        close: "That's all! All ships, launch!", after: { urgent: "Don't hesitate. Take them one by one!", today: "Steady and sure, you'll get it done today!", open: "There's no shame in retreat. Let go of what you must!" },
        signal: c => `Report! Incoming from ${c}!`, narrOn: "Narration on! Any movement, your captain reports it at once!", test: "Ha ha! I'm Captain Tetsuzan! With me around, there's nothing to fear!" } } },
};
const CAST_KEYS = Object.keys(CAST);
/* extra lines: late at night, when something gets done, when a focus session ends */
const EXTRA = {
  yukina:  { ja: { late: "……もうこんな時間ですね。今日はここまでにして、ゆっくり休んでください。", done: "お疲れさまです。ひとつ片付きましたね、ふふっ。", focus: "集中タイム、おしまいです。少し休憩しましょうね。" },
             zh: { late: "……已經這麼晚了。今天就到這裡，好好休息吧。", done: "辛苦了。又完成一件了呢，呵呵。", focus: "專注時間結束了。稍微休息一下吧。" },
             en: { late: "...It's already this late. Let's stop here for today and get some rest.", done: "Well done. That's one more off the list.", focus: "Focus time is over. Let's take a short break." } },
  souma:   { ja: { late: "夜更かしは効率を落とす。今日はもう休め、指揮官。", done: "よくやった。次に行こう。", focus: "集中終了だ。一度立って、体を伸ばせ。" },
             zh: { late: "熬夜只會降低效率。今天先休息吧，指揮官。", done: "做得好。繼續下一件。", focus: "專注結束。站起來伸展一下。" },
             en: { late: "Staying up late kills efficiency. Get some rest, Commander.", done: "Good work. On to the next one.", focus: "Focus session done. Stand up and stretch." } },
  ruri:    { ja: { late: "もう夜遅いよ〜！今日はここまで、おやすみなさい！", done: "やったー！ひとつクリアだね！", focus: "集中タイム終了〜！ちょっと休憩しよっ！" },
             zh: { late: "已經很晚了唷～今天就到這裡，晚安！", done: "耶！又完成一件了！", focus: "專注時間結束～休息一下吧！" },
             en: { late: "It's really late! That's enough for today, good night!", done: "Yay! One more cleared!", focus: "Focus time's up! Let's take a break!" } },
  phoenix: { ja: { late: "深夜です。休息も計画の一部です、指揮官。", done: "完了を記録しました。良い進捗です。", focus: "集中セッションが終了しました。小休止を推奨します。" },
             zh: { late: "現在是深夜。休息也是計畫的一部分，指揮官。", done: "已記錄完成。進度良好。", focus: "專注時段結束。建議短暫休息。" },
             en: { late: "It's late. Rest is part of the plan, Commander.", done: "Completion logged. Good progress.", focus: "Focus session complete. A short break is recommended." } },
  rin:     { ja: { late: "……まだ起きてるの？寝なさい。明日の効率に響くから。", done: "ふうん、やるじゃない。", focus: "時間よ。休憩しなさい。……別に心配してるわけじゃないから。" },
             zh: { late: "……還沒睡？快去睡。會影響明天的效率。", done: "哼，還不錯嘛。", focus: "時間到了。去休息。……我才不是在擔心你。" },
             en: { late: "...Still up? Go to sleep. It'll hurt tomorrow's efficiency.", done: "Hmph. Not bad.", focus: "Time's up. Take a break. ...Not that I'm worried." } },
  tetsu:   { ja: { late: "夜更かしは禁物だ！全艦、休息せよ！", done: "見事だ！目標撃破！", focus: "集中作戦終了！小休止を取れ！" },
             zh: { late: "不准熬夜！全艦，休息！", done: "漂亮！目標擊破！", focus: "專注作戰結束！小憩片刻！" },
             en: { late: "No late nights! All hands, rest!", done: "Excellent! Target down!", focus: "Focus op complete! Take five!" } },
};
function extraLine(kind){ const k = vset.cast, l = langOf(k), SL = subLang(); const x = EXTRA[k]?.[l]?.[kind]; if (!x) return null;
  return { who: k, lang: l, emo: kind === "done" ? "bright" : "gentle", text: x, sub: SL && SL !== l ? EXTRA[k][SL]?.[kind] || "" : "" }; }
function voiceDone(){ if (!vset.doneVoice || !voice.available() || voice.busy()) return; const ln = extraLine("done"); if (ln) voice.speak([ln]); }
function voiceFocusEnd(){ if (!voice.available()) return; if (voice.busy()) voice.stop(); const ln = extraLine("focus"); if (ln) voice.speak([ln]); }
/* emotion: how a line is delivered (pace and pitch) */
const EMO = { warm: [.95, 1.03], bright: [1.06, 1.07], excited: [1.1, 1.1], serious: [.96, .95], gentle: [.92, 1.02], calm: [1, 1], sad: [.9, .96] };
const EMO_OF = { greet: "warm", urgent: "serious", today: "bright", open: "gentle", clusters: "calm", sync: "calm", close: "warm", stats: "calm", narrOn: "bright", test: "warm", signal: "bright" };
const langOf = k => vset.lang === "auto" ? CAST[k].lang : vset.lang;
const P = k => CAST[k].L[langOf(k)];
const hiOf = (lang, h = new Date().getHours()) => ({ zh: h < 5 ? "夜深了" : h < 11 ? "早安" : h < 14 ? "午安" : h < 18 ? "下午好" : "晚安", ja: h < 5 ? "夜遅くまでお疲れさま" : h < 11 ? "おはようございます" : h < 18 ? "こんにちは" : "こんばんは", en: h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening" })[lang];

/* ---------- voice settings (kept per browser) ---------- */
const VDEF = { cast: "yukina", duo: true, partner: "souma", engine: "auto", lang: window.PHX_LANG === "en" ? "en" : "ja", sv: {}, ai: true, subLang: "auto", rate: 1, sections: { urgent: true, today: true, open: true, clusters: false, sync: false }, greet: true, narr: "all", autoBrief: true, doneVoice: true };
const vset = (() => { try { const v = JSON.parse(localStorage.getItem("phx-voice2") || "null"); const o = v ? { ...VDEF, ...v, sections: { ...VDEF.sections, ...(v.sections || {}) } } : structuredClone(VDEF);
  if (!o.mig3){ o.mig3 = true; if (o.engine === "claude") o.engine = "auto"; }
  if (!CAST[o.cast]) o.cast = VDEF.cast; if (o.lang !== "auto" && !LANGS[o.lang]) o.lang = "auto"; if (!o.sv || typeof o.sv !== "object") o.sv = {}; if (!CAST[o.partner] || o.partner === o.cast) o.partner = CAST_KEYS.find(k => k !== o.cast); return o; } catch { return structuredClone(VDEF); } })();
const saveV = () => { try { localStorage.setItem("phx-voice2", JSON.stringify(vset)); } catch {} };

/* ---------- voice: Claude voices, or the system's voices when the viewer picks them (or Claude's are not offered) ---------- */
const voice = (() => {
  let tts = null, lang, state = "idle", narr = false, blocked = false, onChange = () => {}, onCap = () => {}, onProg = () => {}, script = [], token = 0, watchdog = 0;
  try { narr = localStorage.getItem("phx-narr") === "on"; } catch {}
  const synth = window.speechSynthesis || null;
  const set = st => { state = st; onChange(); if (st === "idle") onCap(null); };
  const ready = (async () => {
    tts = await (window.claude?.use?.("tts") ?? Promise.resolve(null)).catch(() => null);
    if (tts){
      tts.onState(({state: st, reason}) => { if (reason === "not_granted" || reason === "unavailable") blocked = true; if (engine() === "claude") set(st); });
      tts.onLine(({id}) => { const k = Number(id); if (script[k]) onCap(script[k]); });
      tts.onPosition?.(({ms}) => onProg({ ms }));
      const ls = await tts.languages?.().catch(() => undefined); lang = ls && (ls.find(x => /^zh-(TW|Hant)/i.test(x)) || ls.find(x => /^zh$/i.test(x)) || ls.find(x => /^zh/i.test(x)));
    }
    onChange();
  })();
  /* auto: Edge/Chrome natural voices are gender-correct per language, so use them when this computer has them; Claude voice otherwise */
  const natural = () => !!synth && synth.getVoices().some(v => /Natural|Online/i.test(v.name) && /^(ja|zh)/i.test(v.lang));
  const engine = () => !synth ? "claude" : !tts ? "system" : vset.engine === "system" ? "system" : vset.engine === "claude" ? "claude" : natural() ? "system" : "claude";
  const available = () => !blocked && (!!tts || !!synth);
  const why = code => ({ no_gesture: "請先點一下桌布，再按播放。", rate_limited: "語音用量暫時達上限，請稍後再試。", busy: "麥克風或系統正在使用中，稍後再試。", upstream_error: "語音服務暫時出錯，請再按一次。", unavailable: "這個檢視目前無法使用語音。" })[code];
  /* system voices: the viewer's own pick for this character and language, else the best neural voice for it, else any voice in that language */
  const LRE = { zh: /^zh/i, ja: /^ja/i, en: /^en/i };
  const FEM = /female|女|Nanami|Aoi|Mayu|Shiori|Haruka|Ayumi|Sayaka|Kyoko|Hsiao|Xiao|Yating|Hanhan|Mei-?Jia|Sin-?ji|Tingting|Aria|Jenny|Ava|Emma|Sonia|Michelle|Zira|Samantha|Karen|Moira|Libby|Seraphina|Vivienne|Ana\b|Hazel|Susan|Catherine/i;
  const MAL = /\bmale\b|男|Keita|Daichi|Naoki|Ichiro|Otoya|Hattori|YunJhe|Yunxi|Yunjian|Yunyang|Yunye|Yunxia|Yunze|Zhiwei|Kangkang|Guy|Andrew|Brian|Christopher|Eric|Roger|Steffan|Davis|Tony|Ryan|David|Mark|Daniel|Alex|Fred|Florian|Remy|George|Thomas|James/i;
  const gx = v => !v ? "" : FEM.test(v.name) && !/\bmale\b/i.test(v.name.replace(/female/ig, "")) ? "f" : MAL.test(v.name) ? "m" : "";
  const MULTI = /Multilingual/i;
  function voicesFor(lang){ const all = synth ? synth.getVoices() : []; const v = all.filter(x => LRE[lang].test(x.lang)), mv = lang === "en" ? [] : all.filter(x => MULTI.test(x.name) && !LRE[lang].test(x.lang)); const nat = x => /Natural|Online/i.test(x.name);
    const out = lang === "zh" ? v.sort((a, b) => (/TW|Hant/i.test(b.lang) - /TW|Hant/i.test(a.lang)) || (nat(b) - nat(a))) : v.sort((a, b) => nat(b) - nat(a)); return out.concat(mv); }
  /* never hand a male character a female voice (or the reverse): every candidate is gender-checked by its known name */
  function sysVoice(k, lang){
    const ch = CAST[k], all = voicesFor(lang); if (!all.length) return { v: null, good: false, g: "" };
    const ok = v => gx(v) !== (ch.g === "m" ? "f" : "m"), vs = all.filter(ok), nat = v => /Natural|Online/i.test(v.name), R = v => ({ v, good: nat(v), g: gx(v) });
    const own = vset.sv[k + ":" + lang]; if (own){ const v = vs.find(x => x.name === own); if (v) return R(v); }
    const native = vs.filter(v => !MULTI.test(v.name));
    for (const re of ch.pick[lang]){ const v = native.find(x => re.test(x.name) && nat(x)) || native.find(x => re.test(x.name)); if (v) return R(v); }
    const same = vs.filter(v => gx(v) === ch.g);
    const v = same.find(x => nat(x) && !MULTI.test(x.name)) || same.find(nat) || same[0] || vs[0] || all[0];
    return R(v);
  }
  /* lines: [{who, text}] — who is a CAST key */
  async function speak(lines){
    if (window.PHX_LANG === "en" && window.phxT) lines = lines.map(l => ({ ...l, text: l.lang === "en" ? phxT(l.text) : l.text, sub: l.sub ? phxT(l.sub) : l.sub }));
    lines = lines.filter(l => l && l.text).map(l => { const who = CAST[l.who] ? l.who : vset.cast; return { who, lang: LANGS[l.lang] ? l.lang : langOf(who), text: String(l.text).slice(0, 400), sub: l.sub ? String(l.sub).slice(0, 400) : "", emo: EMO[l.emo] ? l.emo : "calm" }; }).slice(0, 100);
    if (!lines.length || blocked) return;
    const my = ++token; script = lines; clearTimeout(watchdog);
    /* Claude voice may read Japanese/Chinese in one default (often female) voice: in auto mode, a male character's line goes to a real male system voice when this computer has one */
    const useSys = engine() === "system" || (vset.engine !== "claude" && !!synth && lines.some(l => CAST[l.who].g === "m" && l.lang !== "en" && sysVoice(l.who, l.lang).g === "m"));
    if (!useSys && tts){
      set("starting");
      watchdog = setTimeout(() => { if (my === token && state === "starting"){ tts.stop().catch(() => {}); set("idle"); toast("語音沒有回應，已重設。請再按一次播放。"); } }, 15000);
      try {
        await tts.speak(lines.map((l, i) => { const ch = CAST[l.who]; return { text: l.text, voice: ch.voice, rate: Math.max(.7, Math.min(1.5, ch.rate*vset.rate*EMO[l.emo][0])), id: String(i), language: l.lang === "zh" ? (lang || "zh-TW") : l.lang }; }));
      } catch (e){
        const code = e?.code; if (code === "not_granted" || code === "unavailable") blocked = true;
        if (code && code !== "stopped" && why(code)) toast(why(code));
      } finally {
        clearTimeout(watchdog);
        if (my === token && !(tts.active?.() ?? false)) set("idle"); else onChange();
      }
      return;
    }
    if (synth){
      synth.cancel(); set("speaking");
      lines.forEach((l, i) => { const ch = CAST[l.who], u = new SpeechSynthesisUtterance(l.text), pk = sysVoice(l.who, l.lang); u.lang = { zh: "zh-TW", ja: "ja-JP", en: "en-US" }[l.lang];
        const em = EMO[l.emo]; u.rate = Math.max(.5, Math.min(2, ch.rate*vset.rate*em[0])); u.pitch = Math.max(.1, Math.min(2, (pk.good && pk.g === ch.g ? 1 + (ch.pitch - 1)*.25 : pk.g === ch.g ? 1 + (ch.pitch - 1)*.6 : ch.pitch*(ch.g === "m" ? .85 : 1.1))*em[1])); if (pk.v){ u.voice = pk.v; u.lang = pk.v.lang; }
        u.onstart = () => { if (my === token) onCap(l); };
        u.onboundary = e => { if (my === token && typeof e.charIndex === "number") onProg({ ch: e.charIndex }); };
        if (i === lines.length - 1){ u.onend = u.onerror = () => { if (my === token) set("idle"); }; }
        synth.speak(u); });
      // Chromium can drop the end event; never leave the button stuck
      const est = lines.reduce((s, l) => s + l.text.length, 0)*260/vset.rate + 4000;
      watchdog = setTimeout(() => { if (my === token && state !== "idle" && !synth.speaking) set("idle"); }, est);
    }
  }
  function stop(){ token++; clearTimeout(watchdog); if (tts) tts.stop().catch(() => {}); if (synth) synth.cancel(); set("idle"); }
  return {
    ready, speak, stop, available, engine, claude: () => !!tts, synth: () => !!synth, sysVoice, voicesFor, gx, natural,
    busy: () => state !== "idle",
    narrating: () => narr,
    setNarr(v){ narr = v; try { localStorage.setItem("phx-narr", v ? "on" : "off"); } catch {} onChange(); },
    onChange(fn){ onChange = fn; }, onCaption(fn){ onCap = fn; }, onProgress(fn){ onProg = fn; },
  };
})();

/* ---------- live caption: who is speaking, and what — long lines page along with the voice ---------- */
const capS = { l: null, pages: [], subs: [], t0: 0, ch: -1, ms: -1, k: -1 };
function paginate(text, lang){
  const max = lang === "en" ? 120 : 52, parts = String(text).split(/(?<=[。！？!?；;、，,])\s*|(?<=\.)\s+/).filter(Boolean), out = [];
  let cur = ""; for (const p of parts){ if (cur && (cur + p).length > max){ out.push(cur); cur = p; } else cur += p; } if (cur) out.push(cur);
  return out.flatMap(x => x.length <= max*1.4 ? [x] : x.match(new RegExp(`.{1,${max}}`, "gs")));
}
function capShow(k){
  const el = $("cap"); if (!el || !capS.l || k === capS.k) return; capS.k = k;
  el.querySelector("span").textContent = capS.pages[k] || "";
  const sb = el.querySelector(".sub"), si = capS.subs.length ? Math.min(capS.subs.length - 1, Math.floor(k/capS.pages.length*capS.subs.length)) : -1;
  sb.textContent = si >= 0 ? capS.subs[si] : ""; sb.hidden = si < 0;
  el.querySelector(".pg").textContent = capS.pages.length > 1 ? `${k + 1}/${capS.pages.length}` : "";
}
voice.onCaption(l => {
  const el = $("cap"); if (!el) return;
  if (!l){ el.hidden = true; capS.l = null; return; }
  const ch = CAST[l.who]; el.hidden = false; el.style.setProperty("--c", ch.color);
  el.querySelector("strong").textContent = ch.name; el.querySelector("em").textContent = ch.en;
  Object.assign(capS, { l, pages: paginate(l.text, l.lang), subs: l.sub ? paginate(l.sub, subLang() || "zh") : [], t0: performance.now(), ch: -1, ms: -1, k: -1 });
  capShow(0); engine.pulse?.(.35);
});
voice.onProgress(p => { if (p.ch != null) capS.ch = p.ch; if (p.ms != null) capS.ms = p.ms; });
setInterval(() => {
  const l = capS.l; if (!l || capS.pages.length < 2) return;
  let pos;   // characters already spoken
  if (capS.ch >= 0) pos = capS.ch;
  else { const cps = { zh: 4.4, ja: 6.2, en: 14 }[l.lang]*vset.rate*(EMO[l.emo]?.[0] || 1)*CAST[l.who].rate; pos = (capS.ms >= 0 ? capS.ms : performance.now() - capS.t0)/1000*cps; }
  let acc = 0, k = 0; for (; k < capS.pages.length - 1; k++){ acc += capS.pages[k].length; if (pos < acc - 2) break; }
  capShow(k);
}, 200);

/* the daily briefing: what to do today, what is still open, what is urgent — built from the live data */
function buildBrief(){
  const tnow = Date.now(), today = dkey(new Date()), h = new Date().getHours();
  const hi = h < 5 ? "夜深了" : h < 11 ? "早安" : h < 14 ? "午安" : h < 18 ? "下午好" : "晚安";
  const dailies = signals.filter(s => s.verb === "Daily");
  const dToday = dailies.find(s => dkey(new Date(s.at)) === today), dLast = dailies[0];
  const open = signals.filter(isOpen);
  const urgent = [
    ...clusters.filter(c => c.status === "alert").map(c => ({ c, text: `${c.name}：${c.task || "狀態為警示"}`, sub: "星系警示" })),
    ...open.filter(s => s.priority === "Critical" || s.priority === "High").map(s => ({ c: byCode(s.cluster), text: s.text, sub: `${byCode(s.cluster)?.name || s.cluster} · ${s.priority} · ${ago(s.at)}` })),
    ...signals.filter(s => NEG.test(s.verb||"") && tnow - new Date(s.at) < 7*DAY).map(s => ({ c: byCode(s.cluster), text: s.text, sub: `${byCode(s.cluster)?.name || s.cluster} · ${s.verb} · ${ago(s.at)}` })),
  ].slice(0, 5);
  const todo = [];
  if (dToday) todo.push({ c: byCode("PHOENIX"), text: dToday.text, sub: "今日 Daily（Notion 每日紀錄）" });
  else todo.push({ c: byCode("PHOENIX"), text: L("今天的 Daily 還沒做：寫下今天的狀態、可用時間和精力。", "Today's Daily isn't done yet: note your status, available time and energy."), sub: dLast ? `上一次：${dLast.text}` : "尚無 Daily 紀錄" });
  for (const c of clusters){ if (c.task && c.status === "active") todo.push({ c, text: c.task, sub: `${c.name} · 目前任務` }); }
  const mods = allMods(), stale = mods.filter(x => !x.m.updatedAt || tnow - new Date(x.m.updatedAt) > 7*DAY);
  const pending = open.slice().sort((a,b) => String(a.at).localeCompare(String(b.at)));
  const notDone = [
    ...pending.slice(0, 4).map(s => ({ c: byCode(s.cluster), text: s.text, sub: `${byCode(s.cluster)?.name || s.cluster} · ${s.verb} · 已等 ${ago(s.at).replace("前","")}` })),
    ...(stale.length ? [{ c: null, text: `${stale.length} 個模組超過 7 天沒有回報，包括 ${stale.slice(0, 3).map(x => x.m.name).join("、")}。`, sub: "模組回報" }] : []),
  ];
  const dateTx = new Date().toLocaleDateString("zh-TW",{month:"long",day:"numeric",weekday:"long"});
  const stats = `今天是 ${dateTx}。${clusters.length} 個星系在線，有 ${open.length} 項交接等待處理，其中 ${urgent.length} 項需要優先注意。`;
  const lead = `${hi}，指揮官。${stats}`;
  const overview = clusters.map(c => { const op = open.filter(s => s.cluster === c.code).length; return { c, text: `${c.name}：負載 ${typeof c.load === "number" ? c.load + "%" : "未回報"}，${op ? op + " 項待處理" : "沒有待處理"}，狀態 ${({active:"運行中", idle:"待命", alert:"警示"})[c.status] || "未知"}。`, sub: c.task || "" }; });
  const sync = [{ c: null, text: notionSyncedAt ? L(`Notion 最近一次同步在 ${ago(notionSyncedAt)}。`, `Last Notion sync: ${ago(notionSyncedAt)}.`) : L("還沒有收到 Notion 同步。", "No Notion sync received yet."), sub: L("同步排程由你自己設定", "Sync runs on your own schedule") },
    ...(dLast ? [{ c: byCode("PHOENIX"), text: `最近一筆 Daily：${dLast.text}`, sub: ago(dLast.at) }] : [])];

  /* the template script: one character or two taking turns, each in their own language, with subtitles; Notion content is read in Chinese */
  const A = vset.cast, B = vset.duo ? vset.partner : vset.cast, la = langOf(A), lb = langOf(B), SL = subLang();
  const Lx = (k, g) => CAST[k].L[g];
  const sf = (lang, get) => SL && SL !== lang ? get(SL) : "";
  const clean = t => String(t).replace(/[｜|]/g, "，").slice(0, 120);
  const statsOf = (lang, n, op, ur) => ({
    zh: `今天是 ${dateTx}。${n} 個星系在線，有 ${op} 項交接等待處理，其中 ${ur} 項需要優先注意。`,
    ja: `今日は${new Date().toLocaleDateString("ja-JP",{month:"long",day:"numeric",weekday:"long"})}。${n}つの星系がオンライン、引き継ぎ待ちは${op}件、そのうち${ur}件が優先です。`,
    en: `Today is ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"})}. ${n} clusters online, ${op} handoffs waiting, ${ur} of them high priority.` })[lang];
  const lines = [], nC = clusters.length, nO = open.length, nU = urgent.length;
  if (vset.greet) lines.push({ who: A, lang: la, emo: "warm", text: Lx(A, la).greet(hiOf(la)), sub: sf(la, g => Lx(A, g).greet(hiOf(g))) });
  if (h >= 23 || h < 5){ const x = EXTRA[A]?.[la]?.late; if (x) lines.push({ who: A, lang: la, emo: "gentle", text: x, sub: sf(la, g => EXTRA[A]?.[g]?.late || "") }); }
  lines.push({ who: B, lang: lb, emo: "calm", text: statsOf(lb, nC, nO, nU), sub: sf(lb, g => statsOf(g, nC, nO, nU)) });
  const S = vset.sections;
  // one line per item, so every line stays short enough to read on screen
  const block = (who, lang, key, texts, numbered) => {
    lines.push({ who, lang, emo: EMO_OF[key], text: Lx(who, lang)[key], sub: sf(lang, g => Lx(who, g)[key]) });
    texts.forEach((t, i) => lines.push({ who, lang: "zh", emo: key === "urgent" ? "serious" : "calm", text: (numbered ? (lang === "zh" ? Lx(who, "zh").item(i + 1, clean(t)) : `${i + 1}、${clean(t)}`) : clean(t)) + "。" })); };
  const sec = (key, items) => { if (!items.length) return; block(A, la, key, items.map(it => it.text), true);
    if (vset.duo) lines.push({ who: B, lang: lb, emo: key === "urgent" ? "serious" : "gentle", text: Lx(B, lb).after[key], sub: sf(lb, g => Lx(B, g).after[key]) }); };
  if (S.urgent) sec("urgent", urgent);
  if (S.today) sec("today", todo.slice(0, 4));
  if (S.open) sec("open", notDone);
  if (S.clusters) block(B, lb, "clusters", overview.map(o => o.text), false);
  if (S.sync) block(B, lb, "sync", sync.map(o => o.text), false);
  lines.push({ who: A, lang: la, emo: "warm", text: Lx(A, la).close, sub: sf(la, g => Lx(A, g).close) });
  return { lead, urgent, todo: todo.slice(0, 5), notDone, overview, sync, lines };
}
function renderBrief(){
  const b = buildBrief(), el = $("view");
  const sec = (title, items, empty) => `<h3><i style="--c:var(--cyan)"></i>${title}</h3><ul>${items.map(it => `<li style="--c:${it.c ? esc(colorOf(it.c)) : "var(--cyan)"}">${esc(it.text)}<small>${esc(it.sub)}</small></li>`).join("") || `<li style="--c:var(--line)">${empty}</li>`}</ul>`;
  const who = [vset.cast, ...(vset.duo ? [vset.partner] : [])].map(k => `<span class="castchip" style="--c:${CAST[k].color}">${esc(CAST[k].name)} · ${LANGS[langOf(k)]}</span>`).join("");
  el.innerHTML = `<div class="brief"><h2>DAILY BRIEFING 今日簡報 <span>${who} <button class="x" type="button" data-speak>${voice.busy() ? "■ 停止" : "🔊 播放"}</button><button class="x" type="button" data-close>關閉 ×</button></span></h2>
    <p class="lead">${esc(b.lead)}</p>
    ${sec("URGENT · 最著急", b.urgent, "目前沒有緊急事項。")}
    ${sec("TODAY · 今天該做", b.todo, "沒有排定的任務。")}
    ${sec("OPEN · 還沒完成", b.notDone, "沒有積壓的事項。")}
    ${vset.sections.clusters ? sec("CLUSTERS · 各星系概況", b.overview, "") : ""}
    ${vset.sections.sync ? sec("SYNC · 同步狀態", b.sync, "") : ""}
    ${voice.available() ? "" : `<p class="empty" style="margin-top:12px">這個檢視無法播放語音（或你已在此頁面的權限選單關閉朗讀），簡報以文字顯示。</p>`}</div>`;
}
/* subtitles follow the viewer's system language unless they pick one */
function sysLang(){ if (window.PHX_LANG) return window.PHX_LANG; const l = String(navigator.languages?.[0] || navigator.language || "zh-TW").toLowerCase(); return l.startsWith("ja") ? "ja" : l.startsWith("en") ? "en" : l.startsWith("zh") ? "zh" : "en"; }
function subLang(){ return vset.subLang === "off" ? null : LANGS[vset.subLang] ? vset.subLang : sysLang(); }

/* AI script: Claude rewrites today's briefing in character — emotional, translated, with subtitles. Falls back to the template. */
let sampleFn = null, aiOff = false;
(async () => { sampleFn = await (window.claude?.use?.("sample") ?? Promise.resolve(null)).catch(() => null); })();
const LN = { zh: "Traditional Chinese (Taiwan Mandarin)", ja: "Japanese", en: "English" };
async function aiScript(b){
  if (!vset.ai || aiOff || !sampleFn) return null;
  const A = vset.cast, B = vset.duo ? vset.partner : null, la = langOf(A), lb = B ? langOf(B) : null, SL = subLang(), S = vset.sections;
  const pick = items => items.map(it => ({ task: String(it.text).slice(0, 140), info: String(it.sub || "").slice(0, 80) }));
  const data = { date: new Date().toDateString(), local_time: new Date().toTimeString().slice(0, 5), clusters_online: clusters.length, handoffs_waiting: signals.filter(isOpen).length, high_priority: b.urgent.length,
    urgent: S.urgent ? pick(b.urgent) : [], today: S.today ? pick(b.todo.slice(0, 4)) : [], still_open: S.open ? pick(b.notDone) : [],
    clusters: S.clusters ? b.overview.map(o => o.text) : [], sync: S.sync ? b.sync.map(o => o.text) : [] };
  const key = hashStr(JSON.stringify([data, A, B, la, lb, SL, vset.greet]));
  try { const c = JSON.parse(localStorage.getItem("phx-script") || "null"); if (c && c.key === key && Array.isArray(c.lines)) return c.lines; } catch {}
  const prompt = `Write the spoken script for a short daily work briefing on a sci-fi dashboard, performed like an anime drama by voice actors. The listener is called 指揮官 (Commander).
Speakers:
A = ${CAST[A].name}. ${CAST[A].persona} A speaks ${LN[la]}.
${B ? `B = ${CAST[B].name}. ${CAST[B].persona} B speaks ${LN[lb]}.` : "Only A speaks."}
Rules:
- Every fact must come from DATA. Never invent tasks, numbers, names or dates. Keep proper nouns (product names, tickers, Daily, Notion …) as written.
- The tasks are written in Chinese: translate them naturally into the speaker's language and weave them into speech; shorten long titles but keep their meaning.
- Make it emotional and natural: ${vset.greet ? "a greeting, " : ""}reactions, pauses (……), warmth${B ? ", light banter between A and B" : ""}. Urgent items sound serious; the closing is warm and encouraging.
- Order: ${vset.greet ? "greeting → " : ""}overview (numbers) → urgent → today → still open → closing. Skip empty sections.
- 8 to 16 lines; each "text" at most 110 characters.
- "emo" is one of: warm, bright, excited, serious, gentle, calm, sad.
- "sub": ${SL ? `a natural subtitle of that line in ${SL === "zh" ? "Traditional Chinese as used in Taiwan" : LN[SL]}; use "" when the line is already in that language.` : `always "".`}
Return only a JSON array like [{"who":"A","emo":"warm","text":"...","sub":"..."}].
DATA:
${JSON.stringify(data)}`;
  try {
    const res = await Promise.race([sampleFn.json(prompt, { modelTier: "quick" }), new Promise((_, rej) => setTimeout(() => rej({ code: "timeout" }), 35000))]);
    if (!Array.isArray(res)) return null;
    const lines = res.filter(x => x && typeof x.text === "string" && x.text.trim()).slice(0, 24).map(x => { const isB = B && x.who === "B", lang = isB ? lb : la;
      return { who: isB ? B : A, lang, emo: EMO[x.emo] ? x.emo : "calm", text: x.text.trim().slice(0, 300), sub: SL && SL !== lang && typeof x.sub === "string" ? x.sub.trim().slice(0, 300) : "" }; });
    if (lines.length < 3) return null;
    try { localStorage.setItem("phx-script", JSON.stringify({ key, lines })); } catch {}
    return lines;
  } catch (e){ if (e?.code === "not_granted") aiOff = true; return null; }
}
let preparing = false;
async function playBrief(quiet){
  if (voice.busy()){ voice.stop(); return; }
  if (preparing) return;
  if (quiet !== true) setView("brief");   // the daily auto-briefing only speaks, with captions, and leaves the screen alone
  if (!voice.available()){ toast("這個檢視無法播放語音，簡報以文字顯示。"); return; }
  const b = buildBrief(); let lines = null;
  if (vset.ai && sampleFn && !aiOff){ preparing = true; $("b-brief").textContent = "✎ 編寫台本中…"; toast("AI 正在依角色編寫今天的台本（約數秒）…");
    lines = await aiScript(b); preparing = false; $("b-brief").textContent = "🔊 今日簡報"; }
  voice.speak(lines || b.lines);
}
voice.onChange(() => {
  $("b-brief").textContent = voice.busy() ? "■ 停止播報" : "🔊 今日簡報"; $("b-brief").classList.toggle("live", voice.busy());
  $("b-narr").textContent = voice.narrating() ? "旁白 開" : "旁白 關"; $("b-narr").classList.toggle("live", voice.narrating());
  if (view === "brief") renderBrief();
  if (!$("vpanel").hidden) paintVFoot();
});

/* the day's first click plays the briefing (speech needs a click first, so it cannot start by itself) */
addEventListener("pointerdown", e => {
  if (!vset.autoBrief || e.target.closest("#b-brief,#vpanel,#beatpop,#hpanel")) return;
  const today = new Date().toDateString(); let last = ""; try { last = localStorage.getItem("phx-brief-day") || ""; } catch {}
  if (last === today) return; try { localStorage.setItem("phx-brief-day", today); } catch {}
  setTimeout(() => { if (!voice.busy()) playBrief(true); }, 400);
}, { capture: true });
