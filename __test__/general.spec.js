// @ts-nocheck

const truth = () => {
  return true
}

const power = (base, exponent) => {
  let res, final
  if (exp === 1) res = 1
  else res = base * power(base, Math.abs(exp - 1))

  if (exp < 0) final = 1 / res
  else final = res

  return final
}

describe("testing nothing with jest", () => {
  it("compare trueand true", () => {
    const resp = truth()
    expect(resp).toEqual(true)
  })
})

describe("testing power function with jest", () => {
  it("compare trueand true", () => {
    const resp = truth()
    expect(resp).toEqual(true)
  })
})

console.log(power(3, 3))
