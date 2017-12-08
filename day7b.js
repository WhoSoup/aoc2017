const fs = require('fs')
let file = fs.readFileSync("./day7input").toString('utf-8').trim()

tree = {}
class Element {
  constructor (tag) {
    this.tag = tag
    this.weight = 0
    this.children = []
    this.parent = false
  }
  child(key) {
    this.children.push( Element.get(key) )
    Element.get(key).parent = this
  }
  w() {
    return this.weight + this.children.reduce((a, b) => a + b.w(), 0)
  }

  balanced() {
    if (this.children.length == 0)
      return true

    let w = this.children[0].w()
    for (let i = 0; i < this.children.length; i++)
      if (w != this.children[i].w() || !this.children[i].balanced())
        return false

    return true
  }

  static get(key) {
    return tree[key] != undefined ? tree[key] : tree[key] = new Element(key)
  }
}

const reg = /^(\w+) \((\d+)\)( -> ([a-z, ]+))?/gm
let e
while (match = reg.exec(file)) {
  e = Element.get(match[1])
  e.weight = parseInt(match[2])
  if (match[4] != undefined)
    match[4].split(", ").forEach(x => { e.child(x) })
}

while (e.parent)
  e = e.parent

console.log("7a",e.tag);

let s = Array.from(new Set(e.children.map(x => x.w())))
let diff = Math.abs(s[0] - s[1]) // difference in weight
Object.keys(tree).forEach(x => {
  tree[x].weight += diff
  if (e.balanced())
    console.log("7b",tree[x].weight);
  tree[x].weight -= 2*diff
  if (e.balanced())
    console.log("7b",tree[x].weight)
  tree[x].weight += diff
})
