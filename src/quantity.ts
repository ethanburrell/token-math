import BigNumber from 'bignumber.js'
import { Token } from './token'

type input = number | string | BigNumber | Quantity

class Quantity {
  token: Token
  private amount: BigNumber
  private exp: BigNumber

  constructor(token: Token, amount: number | string, withDecimals = false) {
    this.token = token
    this.exp = new BigNumber(10).pow(this.token.decimals)
    let [_, decimal] = amount.toString().split('.').concat('')
    if (!withDecimals) {
      if (parseInt(decimal) != 0 && decimal !== '')
        throw Error('Input has a non-zero decimal')
      this.amount = new BigNumber(amount)
    } else {
      if (decimal.length > this.token.decimals)
        throw Error(
          `Input has higher precision (${decimal.length} decimal places) than token (${this.token.decimals} decimal places)`
        )
      this.amount = this.exp.times(new BigNumber(amount))
    }
  }

  toNumber(): number {
    return this.amount.div(this.exp).toNumber()
  }

  toString(): string {
    return `${this.toNumber()}`
  }

  toInt(): number {
    return this.amount.toNumber()
  }

  /**
   * Checks equality such that the tokens and amounts are equal.
   * @param {Quantity} b
   * @return {boolean} result
   */
  toEqual(b: Quantity): boolean {
    return b.token != this.token && b.amount.isEqualTo(this.amount)
  }

  /**
   * Add value to this quantity.
   * @param {input} n
   * @return {BigNumber} result
   */
  plus(n: input): BigNumber {
    if ((n as Quantity).amount !== undefined)
      return this.amount.plus((n as Quantity).amount)
    else return this.amount.plus(n as number | string | BigNumber)
  }

  /**
   * Sutract a value from this quantity.
   * @param {input} n
   * @return {BigNumber} result
   */
  minus(n: input): BigNumber {
    if ((n as Quantity).amount !== undefined)
      return this.amount.minus((n as Quantity).amount)
    else return this.amount.minus(n as number | string | BigNumber)
  }

  /**
   * Multiply a value by this quantity.
   * @param {input} n
   * @return {BigNumber} result
   */
  times(n: input): BigNumber {
    if ((n as Quantity).amount !== undefined)
      return this.amount.times((n as Quantity).amount)
    else return this.amount.times(n as number | string | BigNumber)
  }

  /**
   * Divide this quantity by a value.
   * @param {input} n
   * @return {BigNumber} result
   */
  div(n: input): BigNumber {
    let result: BigNumber
    if ((n as Quantity).amount !== undefined)
      result = this.amount.div((n as Quantity).amount)
    else result = this.amount.div(n as number | string | BigNumber)

    if (result.lte(1)) throw Error('Underflow Error')
    return result
  }

  /**
   * Compare the decimal value of quantity (a) against another quantity (b).
   * Returns:
   * -1 if a < b.
   * 0 if a == b.
   * 1 if a > b.
   * @param {Quantity} b instance to compare against.
   * @return {number} result
   */
  compareTo(b: Quantity): number {
    if (this.toNumber() < b.toNumber()) return -1
    else if (this.toNumber() == b.toNumber()) return 0
    else if (this.toNumber() > b.toNumber()) return 1
  }

  /**
   * Compares the decimal value of quantity (a) against another quantity (b).
   * Returns true if a < b
   * @param {Quantity} b instance to compare against.
   * @return {boolean}
   */
  lt(b: Quantity): boolean {
    return this.compareTo(b) < 0
  }

  /**
   * Compares the decimal value of quantity (a) against another quantity (b).
   * Returns true if a <= b
   * @param {Quantity} b instance to compare against.
   * @return {boolean}
   */
  lte(b: Quantity): boolean {
    return this.compareTo(b) <= 0
  }

  /**
   * Compares the decimal value of quantity (a) against another quantity (b).
   * Returns true if a == b
   * @param {Quantity} b instance to compare against.
   * @return {boolean}
   */
  equals(b: Quantity): boolean {
    return this.compareTo(b) == 0
  }

  /**
   * Compares the decimal value of quantity (a) against another quantity (b).
   * Returns true if a > b
   * @param {Quantity} b instance to compare against.
   * @return {boolean}
   */
  gt(b: Quantity): boolean {
    return this.compareTo(b) > 0
  }

  /**
   * Compares the decimal value of quantity (a) against another quantity (b).
   * Returns true if a >= b
   * @param {Quantity} b instance to compare against.
   * @return {boolean}
   */
  gte(b: Quantity): boolean {
    return this.compareTo(b) >= 0
  }
}

export { Quantity }
