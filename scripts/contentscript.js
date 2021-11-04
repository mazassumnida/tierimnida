"use strict";
chrome.runtime.sendMessage({ type: "showPageAction" });
var END = "</span>";
var ZERO = "<span style='color:#000000'>";
var BRONZE = "<span style='color:#8B4513'>";
var SILVER = "<span style='color:#5A78AF'>";
var GOLD = "<span style='color:#FFAF0A'>";
var PLATINIUM = "<span style='color:#22D6B2'>";
var DIAMOND = "<span style='color:#00AFFF'>";
var RUBY = "<span style='color:#FF5675'>";
var lvcolor = {
    0: ZERO,
    1: BRONZE,
    2: BRONZE,
    3: BRONZE,
    4: BRONZE,
    5: BRONZE,
    6: SILVER,
    7: SILVER,
    8: SILVER,
    9: SILVER,
    10: SILVER,
    11: GOLD,
    12: GOLD,
    13: GOLD,
    14: GOLD,
    15: GOLD,
    16: PLATINIUM,
    17: PLATINIUM,
    18: PLATINIUM,
    19: PLATINIUM,
    20: PLATINIUM,
    21: DIAMOND,
    22: DIAMOND,
    23: DIAMOND,
    24: DIAMOND,
    25: DIAMOND,
    26: RUBY,
    27: RUBY,
    28: RUBY,
    29: RUBY,
    30: RUBY,
};
var innerDict = {};
var dict = {};
var htmlBodyList = document.getElementsByClassName("panel-body");
var url = "https://swoonpract1.herokuapp.com/swoon";
fetch(url)
    .then(function (res) { return res.json(); })
    .then(function (data) {
    for (var key in data) {
        dict[key] = data[key];
    }
    repl();
});
chrome.runtime.onMessage.addListener(function (msg) {
    if (msg.action === "TOGGLE") {
        chrome.storage.local.get("enabled", function (data) {
            sortData(data);
        });
    }
});
var sortData = function (data) {
    if (data.enabled) {
        for (var i = 0; i < htmlBodyList.length; i++) {
            innerDict[i].sort(function (a, b) {
                if (a[0] == b[0])
                    return a[1] - b[1];
                return b[0] - a[0];
            });
        }
    }
    else {
        //console.log("sortData disabled");
        for (var i = 0; i < htmlBodyList.length; i++) {
            innerDict[i].sort(function (a, b) {
                return a[1] - b[1];
            });
        }
    }
    for (var i = 0; i < htmlBodyList.length; i++) {
        var ret = "\n";
        for (var _i = 0, _a = innerDict[i]; _i < _a.length; _i++) {
            var infos = _a[_i];
            ret += infos[2] + "\n";
        }
        htmlBodyList[i].innerHTML = ret;
    }
};
var repl = function () {
    // htmlBodyList = document.getElementsByClassName("panel-body");
    for (var i = 0; i < htmlBodyList.length; i++) {
        innerDict[i] = [];
        var now = htmlBodyList[i].innerHTML;
        var str = htmlBodyList[i].innerText;
        var problemshtml = now.split("/a>");
        var problems = str.split(" ");
        var ret = "\n";
        for (var j = 0; j < problemshtml.length; j++) {
            var instr = parseInt(problems[j]);
            if (instr in dict) {
                problemshtml[j] = problemshtml[j].replace(instr + "<", "" + lvcolor[dict[instr]] + instr + "</span></a>");
                innerDict[i].push([dict[instr], instr, problemshtml[j]]);
            }
            ret += problemshtml[j] + "\n";
        }
        htmlBodyList[i].innerHTML = ret;
    }
    chrome.storage.local.get("enabled", function (data) {
        sortData(data);
    });
};
