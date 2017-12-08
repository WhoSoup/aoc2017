const fs = require('fs')
let file = fs.readFileSync("./day7input").toString('utf-8').trim()

let tree = {}

const reg = /^(\w+) \((\d+)\)( -> ([a-z, ]+))?/gm
var match
while (match = reg.exec(file)) {
  if (tree[match[1]] == undefined)
    tree[match[1]] = false

  if (match[4] != undefined)
    match[4].split(", ").forEach(el => tree[el] = match[1])
}

console.log(tree);

let start = Object.values(tree)[0]
while (tree[start]) {
  start = tree[start]
}
console.log(start);
