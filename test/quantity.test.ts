import { Token } from '../src/token'

const tokenA = new Token('TKNA', '0xaaa', 6)

describe('Quantity tests', () => {
  test('Create quantity without decimals', () => {
    const ten = tokenA.createQuanity(10)
    const tenDecimal = tokenA.createQuanity(10.0)
    const tenDecimalString = tokenA.createQuanity('10.0')
    const thousand = tokenA.createQuanity(1000)
    const million = tokenA.createQuanity(1000000)
    const fiveMillionTwoFifty = tokenA.createQuanity(5000250)

    // Check that the correct BigInt is saved
    expect(ten.toInt()).toBe(10)
    expect(tenDecimal.toInt()).toBe(10)
    expect(tenDecimalString.toInt()).toBe(10)
    expect(thousand.toInt()).toBe(1000)
    expect(million.toInt()).toBe(1000000)
    expect(fiveMillionTwoFifty.toInt()).toBe(5000250)

    // Check that decimal conversion is correct
    expect(ten.toString()).toBe('0.00001')
    expect(ten.toInt()).toBe(10)
    expect(tenDecimal.toInt()).toBe(10)
    expect(tenDecimalString.toInt()).toBe(10)
    expect(thousand.toString()).toBe('0.001')
    expect(thousand.toInt()).toBe(1000)
    expect(million.toString()).toBe('1')
    expect(million.toInt()).toBe(1000000)
    expect(fiveMillionTwoFifty.toString()).toBe('5.00025')
    expect(fiveMillionTwoFifty.toInt()).toBe(5000250)
  })

  test('Create quantity from decimal', () => {
    const oneTenThousandth = tokenA.createQuanity('0.00001', true)
    const halfInt = tokenA.createQuanity(0.5, true)
    const halfString = tokenA.createQuanity('.5', true)
    const ten = tokenA.createQuanity(10, true)
    const elevenHalf = tokenA.createQuanity(11.5, true)

    expect(oneTenThousandth.toInt()).toBe(10)
    expect(halfInt.toInt()).toBe(500000)
    expect(halfString.toInt()).toBe(500000)
    expect(ten.toInt()).toBe(10000000)
    expect(elevenHalf.toInt()).toBe(11500000)

    expect(oneTenThousandth.toString()).toBe('0.00001')
    expect(halfInt.toString()).toBe('0.5')
    expect(halfString.toString()).toBe('0.5')
    expect(ten.toString()).toBe('10')
    expect(elevenHalf.toString()).toBe('11.5')
  })

  test('Create invalid quantities', () => {
    expect(() => tokenA.createQuanity(5.01)).toThrow(
      'Input has a non-zero decimal'
    )

    expect(() => tokenA.createQuanity(0.03)).toThrow(
      'Input has a non-zero decimal'
    )

    expect(() => tokenA.createQuanity(0.02)).toThrow(
      'Input has a non-zero decimal'
    )

    expect(() => tokenA.createQuanity(5.00000000001, true)).toThrow(
      'Input has higher precision (11 decimal places) than token (6 decimal places)'
    )

    expect(() => tokenA.createQuanity(5.0000001, true)).toThrow(
      'Input has higher precision (7 decimal places) than token (6 decimal places)'
    )

    // 6 decimal places
    expect(tokenA.createQuanity(5.000001, true).toNumber()).toBe(5.000001)
  })
})

describe('Operations', () => {
  const half = tokenA.createQuanity('.5', true)
  const one = tokenA.createQuanity(1, true)
  const two = tokenA.createQuanity(2, true)
  const five = tokenA.createQuanity(5, true)
  const ten = tokenA.createQuanity(10, true)

  test('plus', () => {
    expect(ten.plus(one).toString()).toBe('11000000')
    expect(half.plus(five).toString()).toBe('5500000')
  })

  test('minus', () => {
    expect(ten.minus(one).toString()).toBe('9000000')
    expect(five.minus(half).toString()).toBe('4500000')
  })

  test('times', () => {
    expect(ten.times(2).toString()).toBe('20000000')
    expect(ten.times(0.5).toString()).toBe('5000000')
    expect(five.times(half).toString()).toBe('2500000000000')
  })

  test('div', () => {
    const twoValue = tokenA.createQuanity(2)
    expect(ten.div(twoValue).toString()).toBe('5000000')

    expect(ten.div(two).toString()).toBe('5')
    expect(five.div(half).toString()).toBe('10')

    const hundred = tokenA.createQuanity(100, true)
    expect(() => ten.div(hundred)).toThrow('Underflow Error')
  })

  test('comparator', () => {
    expect(one.compareTo(half)).toBe(1)
    expect(one.compareTo(one)).toBe(0)
    expect(one.compareTo(five)).toBe(-1)
  })

  test('lt', () => {
    expect(one.lt(half)).toBe(false)
    expect(half.lt(one)).toBe(true)
    expect(one.lt(one)).toBe(false)
  })

  test('lte', () => {
    expect(one.lte(half)).toBe(false)
    expect(half.lte(one)).toBe(true)
    expect(one.lte(one)).toBe(true)
  })

  test('equals', () => {
    expect(one.equals(half)).toBe(false)
    expect(half.equals(one)).toBe(false)
    expect(one.equals(one)).toBe(true)
  })

  test('gt', () => {
    expect(one.gt(half)).toBe(true)
    expect(half.gt(one)).toBe(false)
    expect(one.gt(one)).toBe(false)
  })

  test('gte', () => {
    expect(one.gte(half)).toBe(true)
    expect(half.gte(one)).toBe(false)
    expect(one.gte(one)).toBe(true)
  })
})
