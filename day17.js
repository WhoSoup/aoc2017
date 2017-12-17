// part one
let buffer = [0], pos = 0, step = 343

for (let i = 1; i <= 2017; i++) {
  pos = (pos + step + 1) % i
  buffer = [...buffer.slice(0,pos), i, ...buffer.slice(pos)]
}
console.log(buffer[buffer.indexOf(2017) + 1]);
