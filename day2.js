let fs = require('fs');

console.log(fs.readFileSync("./day2input").toString('utf-8').trim().split(/[\r\n]+/).map(l => l.split(/\s+/).map(x => parseInt(x)).reduce((a,b) => [Math.max(a[0], b), Math.min(a[1], b)], [-Infinity, Infinity])).reduce((a,b) => a + b[0] - b[1], 0));

console.log(fs.readFileSync("./day2input").toString('utf-8').trim().split(/[\r\n]+/).map(l => l.split(/\s+/).map(x => parseInt(x))).map(x => {
  for (let i = 0; i < x.length; i++)
    for (let j = i+1; j < x.length; j++) {
      if (x[i] % x[j] == 0)
        return x[i] / x[j];
      if (x[j] % x[i] == 0)
        return x[j] / x[i];
      }
}).reduce((a,b) => a+b));
