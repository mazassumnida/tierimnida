"use strict";
var enabled = true; //초기 정렬상태
var myButton = document.getElementById('toggle');
var check = $("input[type='checkbox']");
chrome.storage.local.get('enabled', function (data) {
    enabled = data.enabled;
    if (enabled) {
        $('input:checkbox').prop('checked', true);
    }
});
check.click(function () {
    enabled = !enabled;
    chrome.storage.local.set({ enabled: enabled });
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var _a, _b;
        chrome.tabs.sendMessage((_b = (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : 0, { action: 'TOGGLE' });
    });
});
