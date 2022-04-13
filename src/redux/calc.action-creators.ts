import { CalcAction, CalcActionTypes } from './calc.types'

export const toggleSwitcher = (payload: boolean): CalcAction => ({
  type: CalcActionTypes.TOGGLE_SWITCHER,
  payload,
})
