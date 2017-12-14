let input = "xlqgujun", grid = [], used = 0
for (let i = 0; i < 128; i++) {
  let h = hash(input + "-" + i).split("").map(x => parseInt(x, 16))
  used += h.map(countBits).reduce((a,b) => a+b)
  grid.push(h.map(x => ("0000"+ x.toString(2)).substr(-4)).join("").split("")) // convert hash to binary
}
console.log(used);

let c = (x,y) => (x < 0 || y < 0 || x > 127 || y > 127) ? 0 : grid[x][y]
function countBits(num) {
  return num > 0 ? (num % 2) + countBits(num >> 1) : 0
}

function removeGroup(x,y) {
  if (c(x, y) == 0) return
  grid[x][y] = 0
  removeGroup(x + 1, y)
  removeGroup(x - 1, y)
  removeGroup(x, y + 1)
  removeGroup(x, y - 1)
}

let groups = 0
for (let x = 0; x < 128; x++)
  for (let y = 0; y < 128; y++)
    if (c(x,y) == 1) {
      groups++
      removeGroup(x, y)
    }
console.log(groups);

//
// code below from day 10
//
function hash(inx) {
  if (!Array.prototype.reverseSection) {
    Array.prototype.reverseSection = function (start, len) {
      for (let i = 0; i < len/2; i++) {
        let a = (start + i) % this.length,
            b = (start + len - i - 1) % this.length; // semicolon needed
        [this[a], this[b]] = [this[b], this[a]]
      }
    }
  }

  let inp = inx.split("").map(x => x.charCodeAt(0)).concat([17, 31, 73, 47, 23])
  let n = 256
  let cycles = 64
  let list = [], pos = 0, skip = 0
  while (--n != -1)
    list.unshift(n)

  // calculate hash
  while (cycles--)
    for (let length of inp) {
      list.reverseSection(pos, length)
      pos = (pos + length + skip++) % list.length
    }

    let dense = []
    for (let i = 0; i < 256; i += 16)
      dense.push(list.slice(i, i + 16).reduce((a, b) => a^b))

      // ugly hack because javascript doesn't do leading zeroes
      return dense.map(x => ("0" + x.toString(16)).substr(-2)).join("")
}
