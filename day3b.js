var buf = {'0,0': 1};

function get(x,y) {
  return buf[x+','+y] == undefined ? 0 : buf[x+','+y]
}

function sum(x,y) {
  let s = 0;
  [-1,0,1].forEach(i => [-1,0,1].forEach(j => s += get(x+i,y+j)))
  return s;
}

x = 1
y = 0
s = 0
while (1) {
  s = sum(x,y)
  if (s > 368078)
    break

  buf[x+","+y] = s

  if (get(x-1, y) && get(x,y+1) == 0) // left full & top empty, go up
    y++
  else if (get(x, y-1)) // bot full, go left
    x--
  else if (get(x+1, y)) // right full, go down
    y--
  else if (get(x,y+1)) // top full, go right
    x++
}
console.log(s)
