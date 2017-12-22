const fs = require('fs')

const get = (x,y) => infected[`${x},${y}`] || 0
const set = (x,y,v) => infected[`${x},${y}`] = v
const vadd = (va, vb) => [va[0] + vb[0], va[1] + vb[1]] // vector addition

let pos = [12, 12],
    direction = [0,-1],
    infections = 0,
    infected = {},
    cycles = 10000

fs.readFileSync("./day22.txt").toString('utf-8').split(/[\r\n]+/)
    .forEach((line, y) => line.split("").forEach( (val, x) => {if (val == '#') infected[`${x},${y}`] = 1}))


function burst() {
  direction = get(...pos) ? [-direction[1], direction[0]] : [direction[1], -direction[0]]
  set(...pos, 1 - get(...pos))
  infections += get(...pos)
  pos = vadd(pos, direction)
}

while (cycles--)
  burst()
console.log(infections);
