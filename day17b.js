let z = 0, neighbor = 0, pos = 0, step = 343

for (let i = 1; i < 50000000; i++, pos++) {
  pos = (pos + step) % i // increased by 1 at end of loop
  if (pos == z)
    neighbor = i
  if (pos < z)
    z++
}
console.log(neighbor);
