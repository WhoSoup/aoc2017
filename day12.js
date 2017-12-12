const fs = require('fs')
let inp = fs.readFileSync("./day12input").toString('utf-8').trim().split(/[\r\n]+/) // array of lines
  .map((x) => x.split(">")[1].split(", ").map(y => +y))

let visited = []
function reach(i) {
  if (visited.includes(i))
    return 0
  visited.push(i)
  return inp[i].reduce((a,b) => a + reach(b), 1)
}

inp = inp.map((_, k) => reach(k))
console.log("a:", inp[0]);
console.log("b:", inp.filter(x => x > 0).length);
