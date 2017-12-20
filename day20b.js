const fs = require('fs')
let inp = fs.readFileSync("./day20.txt").toString('utf-8').trim().split(/[\r\n]+/)

let particles = []
const dist = (x) => x.p.map(Math.abs).reduce((a,b) => a+b)
const vadd = (x, y) => [x[0] + y[0], x[1] + y[1], x[2] + y[2]]

const re = /(p|v|a)=<(-?\d+),(-?\d+),(-?\d+)>/g
// pva
inp.forEach((line, i) => {
  let p = {i: i}, m = null
  while (m = re.exec(line))
    p[m[1]] = [+m[2], +m[3], +m[4]]
  particles.push(p)
})

let i = 0
while (i++ < 1000) {
  let collisions = {}
  particles.forEach((p) => {
    p.v = vadd(p.v, p.a)
    p.p = vadd(p.p, p.v)
    collisions[p.p.join()] = (collisions[p.p.join()] || 0 ) + 1
  })

  Object.keys(collisions).forEach(k => {
    if (collisions[k] > 1)
      particles = particles.filter(y => y.p.join() != k)
  })
}

console.log(particles.length);
