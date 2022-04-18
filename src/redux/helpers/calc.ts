export class Calc {
  a: number

  b: number

  constructor(a: number, b: number) {
    this.a = a
    this.b = b
  }

  sum() {
    return (this.a + this.b).toString()
  }

  sub() {
    return (this.a - this.b).toString()
  }

  mult() {
    return (this.a * this.b).toString()
  }

  div() {
    return this.b !== 0 ? (this.a / this.b).toString() : 'Не определено'
  }
}
