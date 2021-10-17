chrome.runtime.sendMessage({ type: "showPageAction" });

const END = "</span>";
const ZERO = "<span style='color:#000000'>";
const BRONZE = "<span style='color:#8B4513'>";
const SILVER = "<span style='color:#5A78AF'>";
const GOLD = "<span style='color:#FFAF0A'>";
const PLATINIUM = "<span style='color:#22D6B2'>";
const DIAMOND = "<span style='color:#00AFFF'>";
const RUBY = "<span style='color:#FF5675'>";

let innerDict = {};

const lvcolor = {
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

const dict = {};

const htmlBodyList = document.getElementsByClassName("panel-body");

const url = `https://swoonpract1.herokuapp.com/swoon`;
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    for (key in data) {
      dict[key] = data[key];
    }
    repl();
  });

chrome.extension.onMessage.addListener((msg) => {
  if (msg.action === "TOGGLE") {
    chrome.storage.local.get("enabled", (data) => {
      sortData(data);
    });
  }
});

const sortData = (data) => {
  if (data.enabled) {
    //console.log("data sortData");
    for (let i = 0; i < htmlBodyList.length; i++) {
      innerDict[i].sort((a, b) => {
        if (a[0] == b[0]) return a[1] - b[1];
        return b[0] - a[0];
      });
    }
  } else {
    //console.log("sortData disabled");
    for (let i = 0; i < htmlBodyList.length; i++) {
      innerDict[i].sort((a, b) => {
        return a[1] - b[1];
      });
    }
  }
  for (let i = 0; i < htmlBodyList.length; i++) {
    let ret = "\n";
    for (let infos of innerDict[i]) {
      ret += `${infos[2]}\n`;
    }
    htmlBodyList[i].innerHTML = ret;
  }
};

const repl = () => {
  // htmlBodyList = document.getElementsByClassName("panel-body");
  for (let i = 0; i < htmlBodyList.length; i++) {
    innerDict[i] = [];
    const now = htmlBodyList[i].innerHTML;
    const str = htmlBodyList[i].innerText;
    let problemshtml = now.split("/a>");
    let problems = str.split(" ");
    let ret = "\n";
    for (let j = 0; j < problemshtml.length; j++) {
      let instr = parseInt(problems[j]);
      if (instr in dict) {
        problemshtml[j] = problemshtml[j].replace(
          `${instr}<`,
          `${lvcolor[dict[instr]]}${instr}</span></a>`
        );
        innerDict[i].push([dict[instr], instr, problemshtml[j]]);
      }
      ret += `${problemshtml[j]}\n`;
    }
    htmlBodyList[i].innerHTML = ret;
  }

  chrome.storage.local.get("enabled", (data) => {
    sortData(data);
  });
};
