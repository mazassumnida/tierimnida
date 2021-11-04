chrome.runtime.onMessage.addListener(function (message, sender) {
  if (typeof message === 'object' && message.type === 'showPageAction') {
    chrome.pageAction.show((<{ tab: { id: number } }>sender).tab.id);
  }
});
