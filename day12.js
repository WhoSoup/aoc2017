const fs = require('fs')
let inp = fs.readFileSync("./day12input").toString('utf-8').trim().split(/[\r\n]+/)
  .map((x) => x.split(" <-> ")[1].split(", ").map(y => parseInt(y)))


let nodes = []
function Node() {
  this.visited = 0
  this.neighbors = []
  this.reach = function() {
    if (this.visited++) return 0
    let sum = 0
    for (let i of this.neighbors)
      sum += nodes[i].reach()
    return 1 + sum
  }
}

for (let i of inp) {
  let n = new Node()
  n.neighbors = i
  nodes.push(n)
}

let groups = 0
for (let i in inp) {
  let reach = nodes[i].reach()
  if (reach > 0) {
    groups++
  }
  if (i == 0)
    console.log(reach);
}

console.log(groups);
