const allTabUrls = {}
const EXIT_URL = 'https://acc-ita.paprika-worldwide2.com/logOff/logOff'
const VALID_HOST = 'acc-ita.paprika-worldwide2.com'

// this only works because paprika code is shitty: no CORS control, get request for logout

function paprikout(url) {
  const isFromPaprika = url.includes(VALID_HOST)
  if (!isFromPaprika) return
  const wasLastPaprika = !Object.values(allTabUrls).some(u => u.includes(VALID_HOST))
  if (!wasLastPaprika) return
  const img = new Image()
  img.src = EXIT_URL
}

chrome.tabs.query({}, tabs => {
  for (const tab of tabs) {
    allTabUrls[tab.id] = tab.url
  }
})

chrome.tabs.onUpdated.addListener((id, _, tab) => {
  allTabUrls[id] = tab.url
})

chrome.tabs.onRemoved.addListener(id => {
  const url = allTabUrls[id]
  delete allTabUrls[id]
  paprikout(url)
})
