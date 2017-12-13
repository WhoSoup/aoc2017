const fs = require('fs')
let inp = fs.readFileSync("./day13input").toString('utf-8').trim().split(/[\r\n]+/) // array of lines
  .map(x => x.split(": ").map(Number)).reduce((acc, x) => {acc[x[0]] = x[1]; return acc}, {})

let max = Math.max(...Object.keys(inp))

function severity(delay = 0) {
  let severity = 0
  for (let i = delay; i < delay + max; i++)
    if (inp[i - delay] && (i % (inp[i-delay] * 2 - 2)) == 0)
        severity += i * inp[i-delay]
  return severity
}

let i = 0
while (severity(i) > 0)
  i++

console.log(severity(0), i);
