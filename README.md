# tepco-cache-parser

./cache配下にCacheStorageのフォルダをいれて node index.js
./out配下に出力される


### ちょっと便利スクリプト
CacheStorageの永続化（ほんと？）
(await window.navigator.storage.persist())

デイリーを順にクリック
let t = 0;
let current = $0;

t = setInterval(() => {
    current = current.nextSibling;
    if (current) current.click();
    else clearInterval(t);
}, 1000);

