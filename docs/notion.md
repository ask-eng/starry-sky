# Connect your Notion

`tools/notion-sync.mjs` reads **one Notion database** and writes `phx-data.js` next to `index.html`. It only reads; it never changes anything in Notion. The page loads `phx-data.js` on start and re-reads it every 30 minutes, so a scheduled sync shows up by itself.

> The sync script is new and has been tested against mocked API responses, not against many real workspaces yet. If something doesn't map the way you expect, please [open an issue](../../../issues/new/choose).

## 1. Shape of the database

Each row is one event: a task, a handoff or an update. You need at least:

| Property | Type | Used as |
|---|---|---|
| Title | Title | the event text |
| Module | Select, Status or Text | which module it came from; mapped to a constellation |
| Status | Status or Select | Pending / In progress / Done / Rejected … |

Optional: **Priority** (Select: Critical, High, Medium, Low), **Target** (the module it is handed to) and a **created** date (the row's created time is used otherwise). Property names are configurable.

## 2. Create an integration

1. Go to https://www.notion.so/profile/integrations and create an **internal integration** with read access.
2. Copy its secret.
3. Open your database in Notion → **⋯ → Connections → add your integration**.
4. Copy the database ID from its URL: `notion.so/<workspace>/<DATABASE_ID>?v=…`.

## 3. Configure

```bash
cp tools/notion-sync.config.example.json tools/notion-sync.config.json
```

Edit it:

- `database`: the database ID.
- `properties`: your property names.
- `clusters`: your constellations (code, name, color). Codes are short uppercase IDs.
- `moduleMap`: which module belongs to which constellation (`"Landing Page": "LAUNCH"`). Rows from unmapped modules are skipped.
- `statusMap` (optional): map your own status names, e.g. `{ "Waiting": "Pending" }`.
- `skip` (optional): a regular expression; matching titles are ignored (test rows, for example).

`tools/notion-sync.config.json` is git-ignored. Keep your token out of it and pass it as an environment variable instead.

## 4. Run it

Node 18 or newer, no dependencies:

```bash
NOTION_TOKEN=secret_xxx node tools/notion-sync.mjs
```

Open `index.html`. Your constellations replace the demo; anything you marked done or added by hand stays in your browser.

## 5. Keep it fresh

Run the command on a schedule:

- **macOS / Linux**, with `crontab -e`, every 30 minutes:
  ```
  */30 * * * * cd /path/to/phoenix-nebula && NOTION_TOKEN=secret_xxx node tools/notion-sync.mjs
  ```
- **Windows**: Task Scheduler → Create Basic Task → action `node`, arguments `tools\notion-sync.mjs`, start in the repository folder; set `NOTION_TOKEN` as a user environment variable.

## Running as a claude.ai Artifact instead

If you publish the page as a claude.ai Artifact and connect Notion there, the page can read Notion live, with no script. Fill in `notion` in `phx-config.js` (`inboxView`, `moduleMap`, and optionally `dailyPage` / `dailyHeading`). See [architecture.md](architecture.md).
