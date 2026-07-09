const TRACKED_SITES = [
  "chatgpt.com",
  "claude.ai",
  "gemini.google.com"
]

const STORAGE_KEY = "usage"

// Tracks the last counted URL per tab to avoid duplicate "complete" events.
const lastRecordedUrlByTab = new Map()
let storageWriteQueue = Promise.resolve()

function getLocalDateKey() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

async function getUsageData() {
  const result = await chrome.storage.local.get(STORAGE_KEY)
  return result[STORAGE_KEY] || {}
}

// triggers: chrome.storage.onChanged to fire (Heatmap.vue)
// returns a Promise
function saveUsageData(usage) {
  return chrome.storage.local.set({ [STORAGE_KEY]: usage })
}

// This function deals with { race condition }
async function incrementToday() {
  // working structure:-
  // first tab: resolved = p0.then()
  // second tab: po.then() = p1.then()
  storageWriteQueue = storageWriteQueue.then(async () => {
    const today = getLocalDateKey()
    const usage = await getUsageData()
    usage[today] = (usage[today] || 0) + 1
    await saveUsageData(usage)
  }).catch(error => console.error("Failed to save usage data:", error))

  await storageWriteQueue
}

function findTrackedSite(url) {
  return TRACKED_SITES.find((site) => url.includes(site))
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // only take {fully loaded} pages.
  if (changeInfo.status !== "complete") {
    return
  }

  const url = tab.url || ""
  const trackedSite = findTrackedSite(url)

  // not match or { bail out to avoid double-counting }
  if (!trackedSite || lastRecordedUrlByTab.get(tabId) === url) {
    return
  }

  lastRecordedUrlByTab.set(tabId, url)
  incrementToday()
})

chrome.tabs.onRemoved.addListener((tabId) => {
  lastRecordedUrlByTab.delete(tabId)
})
