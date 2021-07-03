document.getElementById("toggle_sort").onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE_SORT" });
    console.log("toggle sort");
  });
};

document.getElementById("toggle_origin").onclick = function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: "TOGGLE_ORIGIN" });
    console.log("toggle origin");
  });
};
