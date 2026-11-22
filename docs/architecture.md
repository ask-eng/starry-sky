# Architecture

Phoenix Nebula is one HTML page with no framework and no bundler. `tools/build.py` stitches `src/` into `index.html`.

## Two runtimes, one API

The app talks to its environment through `window.claude.use(name)`:

| Capability | As a claude.ai Artifact | Standalone (`src/runtime.js`) |
|---|---|---|
| `db` | shared database for everyone who opens the artifact | a document store in localStorage, synced across tabs |
| `user` | who is viewing; edit rights | the local viewer can always edit |
| `sample` | Claude, no key needed | your own Anthropic API key (optional) |
| `tts` | Claude voices | not available; the system voices are used |
| `mcp` | the viewer's Notion connector (live read) | not available; use `tools/notion-sync.mjs` |
| `downloads` | save a file | a normal browser download |

`src/runtime.js` only runs when `window.claude` is missing, so the same `index.html` works in both places.

## Data model

The `db` collections:

- `clusters/<CODE>`: a constellation with `name, color, order, status, task, load, modules[]`.
- `signals/<id>`: events written by the app (imports).
- `feeds/notion`: `{ events[], syncedAt }`, the synced events.
- `mytasks/<id>`: tasks you add by hand.
- `done/<needId>`, `snooze/<needId>`: what you marked done or snoozed.
- `links/<CODE>`: the Claude Project bound to a constellation.
- `ideas/`, `skills/`: the AI-DLC panel.
- `config/galaxy`: names, colors and shapes from the ✦ Galaxy panel.

"Needs" (the cards in *Needs you*) are derived from these on every render: alerts, rejected work in the last 7 days, open handoffs, the daily check-in and modules that haven't reported in 7 days. Each need has a stable ID, so marking it done or snoozing it sticks.

Internally, event verbs are stored in Chinese (`待處理` pending, `完成` done, `打回` rejected …); `runtime.js` maps English verbs from `phx-data.js` on import, and `i18n.js` shows them in English.

## Rendering

three.js r128 with an EffectComposer chain: render pass → UnrealBloom → film/grade → FXAA, plus a custom temporal anti-aliasing pass (jittered projection, clamped history). The sky is a procedural shader rendered to a render target. The quality setting (Eco / Balanced / Ultra / 4K) changes the frame cap, pixel ratio, particle counts and which passes run. If WebGL isn't available, the work lists still work.

## i18n

The UI source is written in Traditional Chinese. In English mode, `src/i18n.js` translates rendered text with a dictionary through a MutationObserver (text nodes, `title`, `placeholder`, `aria-label`, and `alert` / `confirm` / `prompt`). Prompts sent to Claude are written in both languages in the source (`L(zh, en)`). Moving the UI source to English-first message keys would be a welcome contribution.
