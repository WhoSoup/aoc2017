let fs = require('fs')
console.log(fs.readFileSync("./day4input").toString('utf-8').trim().split(/[\r\n]+/).map(l => l.split(/\s+/)).filter(l => (new Set(l)).size == l.length).length)
console.log(fs.readFileSync("./day4input").toString('utf-8').trim().split(/[\r\n]+/).map(l => l.split(/\s+/).map(l => l.split("").sort().join())).filter(l => (new Set(l)).size == l.length).length)
