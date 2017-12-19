const fs = require('fs')
let inp = fs.readFileSync("./day19.txt").toString('utf-8').split(/[\r\n]+/)

const coord = (x,y) => inp[x][y]
const vadd = (va, vb) => [va[0] + vb[0], va[1] + vb[1]] // vector addition

let pos = [0, inp[0].indexOf("|")],
    direction = [1,0],
    letters = "",
    steps = 0

while (++steps) {
  pos = vadd(pos, direction)
  let char = coord(...pos)

  if (char == ' ') break
  if (/[A-Z]/.test(char))
    letters += char
  if (char == '+') {
    let ldir = [direction[1], -direction[0]]
    let rdir = [-direction[1], direction[0]]
    direction = coord(...vadd(pos, ldir)) != ' ' ? ldir : rdir
  }
}
console.log(letters);
console.log(steps);
