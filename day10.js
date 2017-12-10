const fs = require('fs')

let inp = fs.readFileSync("./day10input").toString('utf-8').trim().split(",").map(x => parseInt(x))
let n = 256

Array.prototype.reverseSection = function (start, len) {
  for (let i = 0; i < len/2; i++) {
    let a = (start + i) % this.length,
        b = (start + len - i - 1) % this.length; // semicolon needed
    [this[a], this[b]] = [this[b], this[a]]
  }
}

let list = [], pos = 0, skip = 0
while (--n != -1)
  list.unshift(n)

for (let length of inp) {
  list.reverseSection(pos, length)
  pos = (pos + length + skip++) % list.length
}

console.log(list[0] * list[1]);
