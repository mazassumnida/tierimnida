/*

document.addEventListener("DOMContentLoaded", function () {
  var checkbox = document.querySelector('input[type="checkbox"]');
  console.log("checkbox");
  chrome.storage.local.get("enabled", function (result) {
    if (result.enabled != null) {
      checkbox.checked = result.enabled;
    }
  });
  checkbox.addEventListener("click", function () {
    console.log(checkbox.checked);
    chrome.storage.local.set({ enabled: checkbox.checked }, function () {
      console.log("confirmed");
    });
  });
});*/

var enabled = false; //disabled by default
var myButton = document.getElementById("toggle");
chrome.storage.local.get("enabled", (data) => {
  enabled = !!data.enabled;
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
