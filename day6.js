const fs = require('fs')

let banks = fs.readFileSync("./day6input").toString('utf-8').trim().split(/[\s]+/).map(x => parseInt(x))

let seen = {}
let step = 0

while (!seen[banks]) {
  seen[banks] = step++

  // get max[ index, value ]
  let [i, max] = banks.reduce( (t, v, z) => t[1] >= v ? t : [z,v], [-1, -Infinity])

  banks[i] = 0
  while (max-- > 0)
    banks[++i % banks.length]++
}

console.log(step, step - seen[banks])
