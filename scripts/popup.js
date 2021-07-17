var enabled = true; //초기 정렬상태
var myButton = document.getElementById("toggle");
chrome.storage.local.get("enabled", (data) => {
  enabled = data.enabled;
  myButton.textContent = enabled ? "Disable" : "Sort";
});
myButton.onclick = () => {
  enabled = !enabled;
  myButton.textContent = enabled ? "Disable" : "Sort";
  chrome.storage.local.set({ enabled: enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE" });
  });
};
