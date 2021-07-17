var enabled = true; //disabled by default
var myButton = document.getElementById("toggle");
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (typeof message === "object" && message.type === "reload") {
//     console.log("reloaded");
//     chrome.storage.get("enabled", (data) => {
//       data.enabled = enabled;
//     });
//   }
// });
chrome.storage.local.get("enabled", (data) => {
  enabled = data.enabled;
  myButton.textContent = enabled ? "Disable" : "Sort";
});
myButton.onclick = () => {
  console.log("onclick");
  enabled = !enabled;
  myButton.textContent = enabled ? "Disable" : "Sort";
  chrome.storage.local.set({ enabled: enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE" });
  });
};
