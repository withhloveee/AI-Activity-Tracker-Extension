console.log("🚀 Background Service Worker Started")

const AI_SITES = [
  "chatgpt.com",
  "claude.ai",
  "gemini.google.com"
]

// Track last-recorded tab+url so we don't double count
// repeated "complete" events for the same page load
const lastRecorded = new Map() // tabId -> url

function getLocalDateKey() {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

// Serialize storage writes so concurrent calls don't race
let writeQueue = Promise.resolve()

function incrementToday(site) {
  writeQueue = writeQueue.then(() => {
    return new Promise((resolve) => {
      const today = getLocalDateKey()

      chrome.storage.local.get(["usage"], (result) => {
        const usage = result.usage || {}

        usage[today] = (usage[today] || 0) + 1

        chrome.storage.local.set({ usage }, () => {
          console.log(`✅ Added visit for ${site}`, usage)
          resolve()
        })
      })
    })
  })
}

chrome.tabs.onUpdated.addListener(
  (tabId, changeInfo, tab) => {

    if (changeInfo.status !== "complete")
      return

    const url = tab.url || ""

    const matchedSite = AI_SITES.find(site =>
      url.includes(site)
    )

    if (!matchedSite)
      return

    // Skip if we already counted this exact tab+url combo
    if (lastRecorded.get(tabId) === url)
      return

    lastRecorded.set(tabId, url)

    console.log("🤖 AI Site Detected:", matchedSite)

    incrementToday(matchedSite)
  }
)

chrome.storage.local.set({ usage: { test: 1 } }, () => {
  chrome.storage.local.get("usage", console.log)
})

// Clean up map entries when tabs close, to avoid a memory leak
chrome.tabs.onRemoved.addListener((tabId) => {
  lastRecorded.delete(tabId)
})
