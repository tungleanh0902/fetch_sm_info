export default class SignRequestQueue {
  constructor() {
    this.queue = []
    this.unqueueSignRequest('') // to reset the icon in the beginning
  }

  queueSignRequest(args) {
    this.queue.push({
      ...args,
      id: Date.now()
    })
    chrome.browserAction.setIcon({ path: 'icons/128x128-alert.png' })
  }

  unqueueSignRequest(id) {
    const signRequest = this.queue.find(({ id: storedId }) => storedId === id)
    this.queue = this.queue.filter(({ id: storedId }) => storedId !== id)
    if (this.queue.length === 0) {
      chrome.browserAction.setIcon({ path: 'icons/128x128.png' })
    }
    return signRequest
  }

  unqueueSignRequestForTab(tabID) {
    this.queue
      .filter(({ tabID: storedtabID }) => storedtabID === tabID)
      .map(({ id }) => {
        this.unqueueSignRequest(id)
      })
  }

  getQueueLength() {
    return this.queue.length
  }

  getSignRequest() {
    return this.queue.length > 0 ? this.queue[0] : undefined
  }
}
