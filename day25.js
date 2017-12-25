// A = 0, B = 1, C = 2, D = 3, E = 4, F = 5
let cursor = 0
let state = 0
let checksum = 12523873
let tape = {0: 0}

const machine = {
  0: [ [1,1,1] , [1,-1,4] ],
  1: [ [1,1,2] , [1,1,5] ],
  2: [ [1,-1,3] , [0,1,1] ],
  3: [ [1,1,4] , [0,-1,2] ],
  4: [ [1,-1,0] , [0,1,3] ],
  5: [ [1,1,0] , [1,1,2] ],
}
const val = () => tape[cursor] || 0
const act = (v, m, n) => {
  tape[cursor] = v
  cursor += m
  state = n
}

while (checksum-- > 0) {
  act(...machine[state][val()])
}
console.log(Object.values(tape).filter(x => x == 1).length);
