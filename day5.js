let fs = require('fs')

var file = fs.readFileSync("./day5input").toString('utf-8').trim().split(/[\r\n]+/).map(x => parseInt(x))

let i = 0
let steps = 0
while (i >= 0 && i < file.length) {
  let j = i
  i += file[i]
  file[j] += file[j] >= 3 ? -1 : 1
  steps++
}
console.log(steps);
