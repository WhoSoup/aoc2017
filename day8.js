const fs = require('fs')
let fileInput = fs.readFileSync("./day8input").toString('utf-8').trim()
Object.prototype._max = function() { return Object.values(this).reduce((a,b) => a > b ? a : b, -Infinity) }

let reg = {}
let s = (i, val) => reg[i] = val
let g = i => reg[i] == undefined ? 0 : reg[i]

const re = /([a-z]+) (inc|dec) (-?\d+) if ([a-z]+) ([><=!]+) (-?\d+)/gm
let cap = -Infinity
while (m = re.exec(fileInput)) {
  eval(`if (${g(m[4])} ${m[5]} ${m[6]}) s('${m[1]}', ${g(m[1])} ${m[2] == 'inc' ? '+' : '-'} ${m[3]})`)
  cap = Math.max(cap, reg._max())
}
console.log("8a",reg._max());
console.log("8b",cap);
