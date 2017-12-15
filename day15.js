let factorA = 16807, factorB = 48271, rem = 2147483647
const next = (val, factor, div) => (val = (val * factor % rem)) % div ? next(val, factor, div) : val

// part one
let a = 699, b = 124, c = 0
for (let i = 0; i < 40000000; i++) {
  a = next(a, factorA, 1)
  b = next(b, factorB, 1)
  c += (a & 0xFFFF) == (b &0xFFFF)
}
console.log(c);

// part b
a = 699, b = 124, c = 0
for (let i = 0; i < 5000000; i++) {
  a = next(a, factorA, 4)
  b = next(b, factorB, 8)
  c += (a & 0xFFFF) == (b &0xFFFF)
}
console.log(c);
