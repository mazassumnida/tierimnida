import requests
import json
from collections import OrderedDict
from time import sleep

data = OrderedDict()

for i in range(1, 201):
    info = requests.get(f"https://solved.ac/api/v3/search/problem?query=&page={i}").json()
    for item in info["items"]:
        data[item["problemId"]] = item["level"]
    sleep(5);



with open("level.json", "w", encoding="utf-8") as data_file:
    json.dump(data, data_file, ensure_ascii=False, indent="\t")
