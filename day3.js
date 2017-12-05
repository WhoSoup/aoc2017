function distance(x) {
  if (x == 1) return 0;

  // find next greatest odd square
  let i = 1;
  while (i**2 < x)
    i += 2;

  let ringMax = i**2;
  let ringMin = ringMax - i*4 + 4
  let circle = Math.floor(i / 2); // the n-th circle

  for (let a = ringMin; a < ringMax; a += i-1)
    if (x >= a && x <= a+i-1)
      return circle + Math.abs(x-a-circle);
}

console.log(distance(1));
console.log(distance(12));
console.log(distance(23));
console.log(distance(1024));
console.log(distance(368078));
