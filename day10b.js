const fs = require('fs')

let inp = fs.readFileSync("./day10input").toString('utf-8').trim().split("")
  .map(x => x.charCodeAt(0)).concat([17, 31, 73, 47, 23])
let n = 256
let cycles = 64

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

// calculate hash
while (cycles--)
  for (let length of inp) {
    list.reverseSection(pos, length)
    pos = (pos + length + skip++) % list.length
  }

let dense = []
for (let i = 0; i < 256; i += 16)
  dense.push(list.slice(i, i + 16).reduce((a, b) => a^b))

// ugly hack because javascript doesn't do leading zeroes
console.log(dense.map(x => ("0" + x.toString(16)).substr(-2)).join(""));
