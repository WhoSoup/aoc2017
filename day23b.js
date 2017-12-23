function isPrime(value) {
    for (let i = 2; i < Math.sqrt(value); i++)
      if (value % i == 0) return false
    return true
}

let h = 0
for (let b = 108400; b <= 125400; b += 17)
  if (!isPrime(b))
    h++

console.log(h);
