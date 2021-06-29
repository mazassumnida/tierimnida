var level = {};
fetch("https://solved.ac/api/v3/search/problem?query=")
    .then((response) => response.json())
    .then((data) => console.log(data));
    for (let i of data) {
        console.log(data);
    }


let arr = document.getElementsByClassName("result-ac");
for (let i of arr) {
    let now = i.innerHTML;
    let str = i.innerText;
    i.innerHTML = now;
    alert(now);
}
