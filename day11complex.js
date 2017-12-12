const fs = require('fs')

const DIR = {'n':0, 'ne': 1, 'se': 2, 's':  3, 'sw': 4, 'nw': 5}
const DIRR = ['se', 's', 'sw', 'nw', 'n', 'ne']

class Node {
  constructor(depth = 0) {
    this.depth = depth
    this.siblings = [null, null, null, null, null, null]
    if (!Node.root)
      Node.root = this
  }

  move(direction) {
    if (!this.siblings[DIR[direction]])
      Node.createSubring()
    return this.siblings[DIR[direction]]
  }

  link(target, direction) {
    this.siblings[Node.mod(direction)] = target
    target.siblings[Node.mod(direction + 3)] = this
  }

  // negative-safe mod
  static mod(i, n = 6) {
    return ((i % n) + n) % n
  }

  static createSubring() {
    let el = Node.root
    while (el.siblings[0] != null)
      el = el.siblings[0]

    // each ring has depth * 6 elements
    let depth = el.depth + 1
    let n = depth * 6

    // store unconnected elements of ring
    let initial = []
    for (let i = 0; i < n; i++)
      initial.push(new Node(depth))

    // expand each of the six sides by placing the new elements on the face at direction "i"
    for (let i = 0; i < 6; i++) {
      // each direction has "depth" elements
      for (let k = 0; k < depth; k++) {
        // first element is special, only connected by one face to sub-ring
        if (k > 0) {
          initial[i * depth + k].link(el, i + 3 + 1) // attach first element of sub-ring
          el = el.move(DIRR[i])
        }
        initial[i * depth + k].link(el, i + 3) // attach second element of sub-ring
        initial[i * depth + k].link(initial[Node.mod(i * depth + k + 1, n)], i + 3 - 1) // attach next
      }
    }
  }
}

let max = 0
let pointer = new Node()
for (let d of fs.readFileSync("./day11input").toString('utf-8').trim().split(",")) {
  pointer = pointer.move(d)
  max = Math.max(pointer.depth, max)
}

console.log("distance: " + pointer.depth + ", max distance: " + max);
