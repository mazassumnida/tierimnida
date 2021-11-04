var enabled = true; //초기 정렬상태
var myButton = document.getElementById('toggle');
var check = $("input[type='checkbox']");

chrome.storage.local.get('enabled', (data) => {
  enabled = data.enabled;
  if (enabled) {
    $('input:checkbox').prop('checked', true);
  }
});

check.click(function () {
  enabled = !enabled;
  chrome.storage.local.set({ enabled: enabled });
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0]?.id ?? 0, { action: 'TOGGLE' });
  });
});
