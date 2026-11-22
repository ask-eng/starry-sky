/* Copy this file to phx-config.js (same folder as index.html) and edit.
   Everything is optional. phx-config.js is git-ignored, so your settings stay private. */
window.PHX_CONFIG = {
  // "en" or "zh" (Traditional Chinese). The 中文 / EN button in the dock overrides this per browser.
  lang: "en",

  // The cluster that carries the daily check-in ("Today's Daily isn't done yet"). Set to null to turn it off.
  dailyCluster: "PHOENIX",
  // Optional links shown on cards.
  dailyUrl: null,      // e.g. the Notion page where you write your Daily
  inboxUrl: null,      // e.g. your handoff inbox database
  homeUrl: null,       // e.g. your Notion home page

  // Let people add and remove constellations in the ✦ Galaxy panel (on by default outside claude.ai).
  // customGalaxy: true,

  // Only used when the page runs as a claude.ai Artifact with the Notion connector:
  // the page then reads Notion live, without tools/notion-sync.mjs.
  notion: {
    inboxView: null,     // "view://…" URL of the database view to read
    dailyPage: null,     // page that holds your Daily entries
    dailyHeading: null,  // regex for a Daily heading, with year, month, day groups
    dailyModule: "Daily",
    moduleMap: {}        // { "Notion module name": "CLUSTER_CODE" }
  }
};
