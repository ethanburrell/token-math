import { Token } from '../src/token'

describe('Test Token', () => {
  test('Token Creation', () => {
    const token = new Token('AAA', '0xaaa', 6)
    expect(token.symbol).toBe('AAA')
    expect(token.address).toBe('0xaaa')
    expect(token.decimals).toBe(6)
  })

  test('Basic Sorting', () => {
    const unsortedTokens = [
      new Token('CCC', '0xccc', 8),
      new Token('BBB', '0xbbb', 7),
      new Token('AAA', '0xaaa', 6),
    ]

    const sortedTokens = unsortedTokens.sort(Token.compare)

    expect(sortedTokens[0].address).toBe('0xaaa')
    expect(sortedTokens[1].address).toBe('0xbbb')
    expect(sortedTokens[2].address).toBe('0xccc')
  })

  test('Sorting with addresses in mixed cases', () => {
    const unsortedTokens = [
      new Token('CCC', '0xccc', 8),
      new Token('BBB', '0xbbb', 7),
      new Token('AAA', '0xAAA', 6),
    ]

    const sortedTokens = unsortedTokens.sort(Token.compare)

    expect(sortedTokens[0].address).toBe('0xAAA')
    expect(sortedTokens[1].address).toBe('0xbbb')
    expect(sortedTokens[2].address).toBe('0xccc')
  })
})
