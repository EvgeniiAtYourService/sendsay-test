import { CalcAction, CalcActionTypes, draggedElement } from './calc.types'

export const toggleSwitcher = (payload: boolean): CalcAction => ({
  type: CalcActionTypes.TOGGLE_SWITCHER,
  payload,
})

export const leaveElement = (): CalcAction => ({
  type: CalcActionTypes.LEAVE_ELEMENT,
})

export const takeElement = (payload: draggedElement): CalcAction => ({
  type: CalcActionTypes.TAKE_ELEMENT,
  payload,
})

export const hoverField = (payload: boolean): CalcAction => ({
  type: CalcActionTypes.HOVER_FIELD,
  payload,
})
