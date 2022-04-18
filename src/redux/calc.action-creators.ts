import { CalcAction,
  CalcActionTypes,
  draggedElement,
  dragTarget, } from './calc.types'

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

export const setDragTarget = (payload: dragTarget): CalcAction => ({
  type: CalcActionTypes.SET_DRAG_TARGET,
  payload,
})

export const dropItem = (): CalcAction => ({
  type: CalcActionTypes.DROP_ITEM,
})

export const removeItem = (payload: draggedElement): CalcAction => ({
  type: CalcActionTypes.REMOVE_ITEM,
  payload,
})

export const hoverItem = (payload: boolean): CalcAction => ({
  type: CalcActionTypes.HOVER_ITEM,
  payload,
})

export const calculate = (payload: number | string): CalcAction => ({
  type: CalcActionTypes.CALCULATE,
  payload
})
