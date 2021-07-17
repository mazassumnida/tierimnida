chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (typeof message === "object" && message.type === "showPageAction") {
    chrome.pageAction.show(sender.tab.id);
  }
});
chrome.webNavigation.onCommitted.addListener(function (data) {
  if (data.transitionType == "reload") {
    chrome.runtime.sendMessage({ type: "reload" });
  }
});
