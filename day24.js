const fs = require('fs')

let pool = {}
const add = x => {_add(x[0], x); _add(x[1], x)}
const _add = (x,y) => pool[x] = (pool[x] ? pool[x].concat([y]) : [y])

fs.readFileSync("./day24.txt").toString('utf-8').trim()
  .split(/[\r\n]+/).map(x => x.split("/").map(Number)).map(add)

let max = -Infinity, longest = -Infinity, longestSum = -Infinity

function build(start = 0, history = [], sum = 0) {
  let tail = true
  pool[start].forEach(c => {
    if (!history.includes(c)) {
      build(c[0] == start ? c[1] : c[0], history.concat([c]), sum + c[0] + c[1])
      tail = false
    }
  })
  if (tail) {
    max = Math.max(sum, max)
    if (history.length >= longest) {
      longestSum = (history.length == longest) ? Math.max(longestSum, sum) : sum
      longest = history.length
    }
  }
}

build()
console.log(`Strongest Bridge: ${max}\nLongest Bridge: ${longestSum} (length: ${longest})`);
