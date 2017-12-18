const fs = require('fs')
let inp = fs.readFileSync("./day18input").toString('utf-8').trim().split(/[\r\n]+/)

let register = {}
let lastplayed = 0
let pos = 0

const val = (x) => /\d+/.test(x) ? +x : register[x]
const fn = {
  'snd': (x) => lastplayed = val(x),
  'set': (x,y) => register[x] = val(y),
  'add': (x,y) => register[x] += val(y),
  'mul': (x,y) => register[x] *= val(y),
  'mod': (x,y) => register[x] %= val(y),
  'rcv': (x) => { if (x != 0) pos = -Infinity},
  'jgz': (x, y) => { if (val(x) > 0) pos = (pos + val(y) - 1) }
}

while (pos >= 0) {
  fn[inp[pos].substr(0,3)](...inp[pos].substr(4).split(" "))
  pos++
}

console.log(lastplayed);
