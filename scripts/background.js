"use strict";
chrome.runtime.onMessage.addListener(function (message, sender) {
    if (typeof message === 'object' && message.type === 'showPageAction') {
        chrome.pageAction.show(sender.tab.id);
    }
});
