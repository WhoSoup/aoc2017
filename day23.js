const fs = require('fs')
let inp = fs.readFileSync("./day23.txt").toString('utf-8').trim().split(/[\r\n]+/)

class Prog {
  constructor() {
    this.register = {}
    this.pos = 0
    this.mulcount = 0
  }

  val (x) { return /\d+/.test(x) ? +x : (this.register[x] || 0) }
  set (x,y) { this.register[x] = this.val(y) }
  sub (x,y) { this.register[x] -= this.val(y) }
  mul (x,y) { this.register[x] *= this.val(y); this.mulcount++ }
  jnz (x,y) { if (this.val(x) != 0) this.pos += this.val(y) - 1 }

  run () { this[inp[this.pos].substr(0,3)](...inp[this.pos++].substr(4).split(" ")) }
}

const p = new Prog()

try {
  while (true) p.run()
} catch (e) {
    console.log(p.mulcount);
}
