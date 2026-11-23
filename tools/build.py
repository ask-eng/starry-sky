#!/usr/bin/env python3
"""Assemble index.html from src/. Usage: python3 tools/build.py

The page is one self-contained HTML file (handy for wallpaper apps and file:// use).
Optional files read at runtime from the same folder:
  phx-config.js  your settings (see phx-config.example.js)
  phx-data.js    your data, written by tools/notion-sync.mjs
"""
import pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
read = lambda n: (SRC / n).read_text(encoding="utf-8")

s = read("main.html")
PARTS = [("/*@@VCSS@@*/", "vcss.css"), ("<!--@@VPANEL@@-->", "vpanel.html"), ("/*@@VOICE@@*/", "voice.js"),
         ("/*@@NARR@@*/", "narr.js"), ("/*@@AUDIO@@*/", "audio.js"), ("/*@@GALAXY@@*/", "galaxy.js"),
         ("/*@@VPOP@@*/", "vpop.js"), ("/*@@DLC@@*/", "dlc.js"), ("/*@@IMPORT@@*/", "import.js"),
         ("/*@@HUDCSS@@*/", "hud.css"), ("<!--@@HUDHTML@@-->", "hud.html"), ("/*@@HUD@@*/", "hud.js")]
for ph, f in PARTS:
    assert s.count(ph) == 1, f"placeholder {ph} found {s.count(ph)} times"
    s = s.replace(ph, read(f))

cut = s.index("</style>") + len("</style>")
head, body = s[:cut], s[cut:]
boot = "\n".join(f"<script data-phx>\n{read(n)}\n</script>" for n in ("i18n.js", "runtime.js", "demo.js"))
page = f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Phoenix Nebula: a living 3D nebula that shows your projects, tasks and AI handoffs at a glance.">
<meta property="og:type" content="website">
<meta property="og:title" content="Phoenix Nebula: your projects as a living 3D nebula">
<meta property="og:description" content="A free, open-source dashboard for your projects, tasks and AI handoffs. Runs in the browser or as a desktop wallpaper.">
<meta property="og:url" content="https://ask-eng.github.io/starry-sky/">
<meta property="og:image" content="https://ask-eng.github.io/starry-sky/docs/social.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://ask-eng.github.io/starry-sky/docs/social.jpg">
{head}
<script src="phx-config.js"></script>
{boot}
<script src="phx-data.js"></script>
</head>
<body>
{body}
<script data-phx>
{read("settings.js")}
</script>
</body>
</html>
"""
(ROOT / "index.html").write_text(page, encoding="utf-8")
print(f"index.html: {len(page):,} bytes")
