# Contributing to Phoenix Nebula

Thanks for taking the time! This project is young, and right now the most valuable thing is **feedback**: what you tried, what confused you, what you'd want it to do.

## Ways to help

- **Give feedback.** Use the *Feedback* issue form or a Discussion. Screenshots of your setup are great.
- **Report bugs.** Use the *Bug report* form. Include your browser, OS, GPU (if 3D is involved) and the quality setting (HUD → Quality).
- **Improve translations.** The UI source is written in Traditional Chinese, and English comes from the dictionary in `src/i18n.js`. Each line is `中文 => English`. A line starting with `=` matches only when it is the whole text of an element. If you see Chinese text in English mode, add a line. New languages are welcome; open an issue first so we can agree on the approach.
- **Add a data source.** Anything that writes `phx-data.js` in the format below can feed the dashboard: Linear, GitHub Issues, Todoist, Trello, a CSV…
- **Improve performance**, especially on laptops and integrated graphics.

## Development

There is no build toolchain besides Python 3.

```bash
python3 tools/build.py          # src/ → index.html
python3 -m http.server 8000     # then open http://localhost:8000
```

- Edit files in `src/`, never `index.html` directly. Commit both `src/` and the rebuilt `index.html`, so the page keeps working when someone just downloads the repo.
- `src/main.html` holds the layout, styles, the three.js scene and the app logic; the other files in `src/` are stitched in at `/*@@NAME@@*/` placeholders (see `tools/build.py`).
- The page must keep working as a single file opened from disk (`file://`) and as a claude.ai Artifact. Don't add a framework or bundler, and only load scripts from cdnjs.cloudflare.com or cdn.jsdelivr.net with a pinned version.
- Eye comfort is a design rule: no camera fly-throughs, no full-screen flashing.
- Never put real personal data (Notion IDs, names, tasks) in commits. Use the demo projects in `src/demo.js`.

## `phx-data.js` format

```js
(window.__phxData || (d => window.__PHX_DATA__ = d))({
  syncedAt: "2026-11-22T08:00:00Z",
  clusters: [ { code: "LAUNCH", name: "Product Launch", color: "#ff9a4d", status: "active", task: "…",
                modules: [ { name: "Landing Page", status: "active", load: 80, task: "…", updatedAt: "…" } ] } ],
  events:   [ { id: "unique-id", at: "2026-11-22T07:00:00Z", cluster: "LAUNCH", module: "Landing Page",
                verb: "Pending", text: "Decide the mobile form layout", priority: "High", to: "PHOENIX" } ]
});
```

`verb` is one of `Pending`, `In progress`, `Done`, `Delivered`, `Rejected`, `Failed`, `Cancelled`, `Blocked` (or `Daily` for a daily check-in). `status` is `active`, `idle` or `alert`.

## Pull requests

1. Open an issue first for anything bigger than a small fix, so we can agree on the direction.
2. Keep pull requests focused: one change per PR.
3. Check both languages (the 中文 / EN button) and at least the Balanced quality setting.
4. Describe what you changed and how you tested it; add a screenshot for visual changes.

By contributing, you agree that your contributions are licensed under the MIT License.
