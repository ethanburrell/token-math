import { Quantity } from './quantity'

class Token {
  address: string
  symbol: string
  decimals: number

  constructor(symbol: string, address: string, decimals: number) {
    this.symbol = symbol
    this.address = address
    this.decimals = decimals
  }

  /**
   * Create Quantity of `amount` formatted `withDecimals`
   * @param {number | string} amount Input amount of tokens
   * @param {boolean} withDecimals If input is formatted with decimals, defaults to false.
   * @return {Quantity}
   */
  createQuanity(amount: number | string, withDecimals = false): Quantity {
    return new Quantity(this, amount, withDecimals)
  }

  /**
   * Compare token based on token addresses.
   * @param {Token} tokenA First token to compare
   * @param {Token} tokenB Second token to compare.
   * @return {number} -1, 0, 1 if A is less than, equal to, or greater than B, respectively.
   */
  static compare(tokenA: Token, tokenB: Token): number {
    return tokenA.address
      .toLowerCase()
      .localeCompare(tokenB.address.toLowerCase())
  }
}

export { Token }
