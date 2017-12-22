const fs = require('fs')

const get = (x,y) => infected[`${x},${y}`] || 0
const set = (x,y,v) => infected[`${x},${y}`] = v
const vadd = (va, vb) => [va[0] + vb[0], va[1] + vb[1]] // vector addition

let pos = [12, 12],
    direction = [0,-1], // up
    infections = 0,
    cycles = 10000000,
    infected = {}

fs.readFileSync("./day22.txt").toString('utf-8').split(/[\r\n]+/)
    .forEach((line, y) => line.split("").forEach( (val, x) => {if (val == '#') infected[`${x},${y}`] = 2}))

while (cycles--) {
  switch (get(...pos)) {
    // clean, turn left
    case 0: direction = [direction[1], -direction[0]]; break
    // weakened, no turn
    case 1: infections++; break
      // infected, turn right
    case 2: direction = [-direction[1], direction[0]]; break
    // flagged, reverse
    case 3: direction = [-direction[0], -direction[1]]; break
  }

  set(...pos, (get(...pos) + 1) % 4)
  pos = vadd(pos, direction)
}

console.log(infections);
