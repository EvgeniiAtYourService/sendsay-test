import { CalcState } from '../calc.types'
import { Calc } from './calc'

export const calculate = (
  valOp: number | string,
  state: CalcState
): CalcState => {
  const copy = {
    ...state,
  }

  const isOperator = typeof valOp === 'string' && valOp !== '.' && valOp !== '='
  const isValue = typeof valOp === 'number' || valOp === '.'

  const isDot = valOp === '.'
  const hasDot = copy.displayedResult.includes('.')
  const hasDotNextNum = copy.nextNum.includes('.')

  const isEquals = valOp === '='

  const isZero = copy.displayedResult === '0'
  const isZeroNextNum = copy.nextNum === '0'

  if (copy.displayedResult === 'Не определено') {
    return copy
  }

  if (isValue) {
    if (!copy.operator) {
      if (isZero) {
        if (isDot) {
          copy.displayedResult += valOp.toString()
        } else {
          copy.displayedResult = valOp.toString()
        }
      } else if (isDot) {
        if (!hasDot) {
          copy.displayedResult += valOp.toString()
        }
      } else {
        copy.displayedResult += valOp.toString()
      }
    }

    if (copy.operator) {
      if (isZeroNextNum) {
        if (isDot) {
          copy.nextNum += valOp.toString()
          copy.displayedResult = copy.nextNum
        } else {
          copy.nextNum = valOp.toString()
          copy.displayedResult = copy.nextNum
        }
      } else if (isDot) {
        if (!hasDotNextNum) {
          copy.nextNum += valOp.toString()
          copy.displayedResult = copy.nextNum
        }
      } else {
        copy.nextNum += valOp.toString()
        copy.displayedResult = copy.nextNum
      }
    }
  }

  if (isOperator) {
    if (copy.operator) {
      copy.nextNum = '0'
      copy.operator = valOp
    } else {
      copy.currentValue = copy.displayedResult
      copy.operator = valOp
    }
  }

  if (isEquals) {
    const calc = new Calc(+copy.currentValue, +copy.displayedResult)

    switch (copy.operator) {
      case '/':
        copy.displayedResult = calc.div()
        break
      case '*':
        copy.displayedResult = calc.mult()
        break
      case '-':
        copy.displayedResult = calc.sub()
        break
      case '+':
        copy.displayedResult = calc.sum()
        break
      default:
        break
    }
    if (copy.displayedResult.length >= 17) {
      const zeros = 1000000000000000
      copy.displayedResult = `${
        Math.round(+copy.displayedResult * zeros) / zeros
      }`
    }
    copy.currentValue = copy.displayedResult
    copy.nextNum = '0'
    copy.operator = null
  }

  return copy
}
