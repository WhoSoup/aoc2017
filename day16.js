const fs = require('fs')
let inp = fs.readFileSync("./day16input").toString('utf-8').trim().split(",")

let fn = {
  'x': (a,b) => [dancer[a], dancer[b]] = [dancer[b], dancer[a]],
  'p': (a,b) => fn.x(dancer.indexOf(a), dancer.indexOf(b)),
  's': (x) => dancer = [...dancer.slice(-x), ...dancer.slice(0,-x)]
}
let dance = () => inp.forEach(x => fn[x.charAt(0)](...x.substr(1).split('/')))

let dancer = "abcdefghijklmnop".split("")
let perms = []

do {
  perms.push(dancer.join(""))
  dance()
} while (dancer.join("") != "abcdefghijklmnop")

console.log(perms[1]);
console.log(perms[1000000000 % perms.length]);
