import {
  fullDecimals,
  shortDecimals,
  prettyLong,
  pretty,
  prettyInt,
  percent,
  percentInt,
  bigFigure,
  prettyDecimals,
  roundObjectPercentages,
} from "scripts/num"
import {
  bigFigureOrShortDecimals,
  bigFigureOrPercent,
} from "../../../../src/scripts/num"

const tally = {
  yes: 13.626332,
  no: 47.989636,
  abstain: 9.596008,
  no_with_veto: 28.788024,
}

const tally2 = {
  yes: 96.11111,
  no: 1.3224,
  abstain: 1.2555,
  no_with_veto: 1.31099,
}

const tally3 = {
  yes: 95.12123,
  no: 0,
  abstain: 0,
  no_with_veto: 4.87877,
}

const sum = (a, b) => a + b
const getValues = (dataMap) => Object.values(dataMap)
const sumOfValues = (x) => getValues(x).reduce(sum, 0)

describe(`roundObjectPercentages`, () => {
  it(`should sum to 100`, () => {
    expect(sumOfValues(roundObjectPercentages(tally))).toBe(100)
  })

  it(`should sum another to 100`, () => {
    expect(sumOfValues(roundObjectPercentages(tally2))).toBe(100)
  })

  it(`should sum again to 100`, () => {
    expect(sumOfValues(roundObjectPercentages(tally3))).toBe(100)
  })
})

describe(`number helper`, () => {
  it(`should format numbers showing many decimals`, () => {
    expect(fullDecimals(1001950.123456)).toBe(`1,001,950.123456`)
  })

  it(`should format numbers showing many decimals`, () => {
    expect(shortDecimals(1.123456789)).toBe(`1.123`)
  })

  it(`should format numbers showing few decimals`, () => {
    expect(pretty(1001950.123456)).toBe(`1,001,950.12`)
  })

  it(`should format numbers showing no decimals`, () => {
    expect(prettyInt(1001950.123456)).toBe(`1,001,950`)
  })

  it(`should format percent without decimals`, () => {
    expect(percentInt(0.2612)).toBe(`26%`)
  })

  it(`should format numbers showing many decimals and separator`, () => {
    expect(prettyLong(1001950.123456789)).toBe(`1,001,950.123456789`)
  })

  it(`should format percent with decimals`, () => {
    expect(percent(0.2612)).toBe(`26.12%`)
  })

  it(`should format a very big number. Convert it to trillions`, () => {
    expect(bigFigure(`-8719010560462937.9`)).toBe(`-8,719 T`)
  })

  it(`should format a very big number. Convert it to billions`, () => {
    expect(bigFigure(`719010560462.9379`)).toBe(`719 B`)
  })

  it(`should format a very big number. Convert it to millions`, () => {
    expect(bigFigure(`7010560.46`)).toBe(`7 M`)
  })

  it(`should apply the shortDecimals filter over the bigFigure one`, () => {
    expect(bigFigureOrShortDecimals(`701560.4658221`)).toBe(`701,560.466`)
  })

  it(`should apply the percent filter over the bigFigure one`, () => {
    expect(bigFigureOrPercent(`701560.4658221`)).toBe(`70.2 M %`)
  })

  it(`should format long decimals well`, () => {
    expect(prettyDecimals(1e-8)).toBe(`0.00000001`)
  })

  it(`should format long decimals well if whole number`, () => {
    expect(prettyDecimals(12)).toBe(`12`)
  })
})
