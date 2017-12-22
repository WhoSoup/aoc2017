const fs = require('fs')
const rulesRaw = fs.readFileSync("./day21.txt").toString('utf-8').trim()
  .split(/[\r\n]+/).map(x => x.split(" => "))

const rules = {}
for (let rule of rulesRaw)
  rules[rule[0]] = rule[1]

String.prototype.reverse = function () { return this.split('').reverse().join('') }
const flip = str => str.split('/').map(x => x.reverse()).join('/')
const countOn = str => str.split('').filter(x => x == '#').length

function rotate(str) {
  const t = str.split('/')
  let n = ""
  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < t.length; j++) {
      n += t[t.length - j - 1][i]
    }
    n+='/'
  }
  return n.substr(0, n.length - 1)
}

function applyRule(str) {
  for (let s of [str, flip(str)]) {
    let i = 0
    do {
      if (rules[s])
        return rules[s]
      s = rotate(s)
    } while (i++ < 3)
  }
}

function step(str) {
  const grid = str.split('/')
  const size = grid[0].length % 2 == 0 ? 2 : 3

  let g = []
  for (let i = 0; i < grid[0].length; i += size) {
    let gr = []
    for (let j = 0; j < grid[0].length; j += size) {
      let n = ""
      for (let x = i; x < i + size; x++) {
      for (let y = j; y < j + size; y++) {
          n += grid[x][y]
        }
        n += '/'
      }
      gr.push(n.substr(0, n.length - 1))
    }
    g.push(gr)
  }

  return g.map(x => myReduce(x.map(y => applyRule(y).split('/')))).join('/')
}

function myReduce(line) {
  let nl = []
  for (let i = 0; i < line[0].length; i++) {
    let z = ""
    for (let j = 0; j < line.length; j++) {
      z += line[j][i]
    }
    nl.push(z)
  }
  return nl.join('/')
}

let start = ".#./..#/###"

let i = 0
while (i++ < 18) {
  start = step(start)
  if (i == 5 || i == 18)
    console.log(countOn(start));
}
