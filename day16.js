const fs = require('fs')
let inp = fs.readFileSync("./day16input").toString('utf-8').trim().split(",")

const exchange = (a,b) => [dancer[a], dancer[b]] = [dancer[b], dancer[a]]
const partner = (a,b) => exchange(dancer.indexOf(a), dancer.indexOf(b))
const spin = (x) => dancer = [...dancer.slice(-x), ...dancer.slice(0,-x)]

let dancer = "abcdefghijklmnop".split("")
let perms = []

function dance() {
    inp.forEach(x => {
      if (x.charAt(0) == 'x')
        exchange(...x.substr(1).split('/').map(x => +x))
      else if (x.charAt(0) == 's')
        spin(+x.substr(1))
      else if (x.charAt(0) == 'p')
        partner(...x.substr(1).split('/'))
  })
  perms.push(dancer)
}

// part one
dance()
console.log(dancer.join(""));

// part two
while (dancer.join("") != "abcdefghijklmnop")
  dance()

console.log(perms[1000000000 % perms.length - 1].join(""));
