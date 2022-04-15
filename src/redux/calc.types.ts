export type draggedElement =
  | 'display'
  | 'operations'
  | 'numbers'
  | 'equals'
  | null

export type dragTarget =
  | 'displayFULL'
  | 'operationsUP'
  | 'operationsBOT'
  | 'numbersUP'
  | 'numbersBOT'
  | 'equalsUP'
  | 'equalsBOT'
  | null

export interface CalcState {
  isEditable: boolean
  dragZone: Array<draggedElement>
  draggedElement: draggedElement
  isFieldHovered: boolean
  currentValue: number
  dragTarget: dragTarget
}

export enum CalcActionTypes {
  TOGGLE_SWITCHER = 'TOGGLE_SWITCHER',
  LEAVE_ELEMENT = 'LEAVE_ELEMENT',
  TAKE_ELEMENT = 'TAKE_ELEMENT',
  HOVER_FIELD = 'HOVER_FIELD',
  SET_DRAG_TARGET = 'SET_DRAG_TARGET',
  DROP_ITEM = 'DROP_ITEM',
  REMOVE_ITEM = 'REMOVE_ITEM',
}

interface ToggleSwitcherAction {
  type: CalcActionTypes.TOGGLE_SWITCHER
  payload: boolean
}

interface leaveElement {
  type: CalcActionTypes.LEAVE_ELEMENT
}

interface takeElement {
  type: CalcActionTypes.TAKE_ELEMENT
  payload: draggedElement
}

interface hoverField {
  type: CalcActionTypes.HOVER_FIELD
  payload: boolean
}

interface setDragTarget {
  type: CalcActionTypes.SET_DRAG_TARGET
  payload: dragTarget
}

interface dropItem {
  type: CalcActionTypes.DROP_ITEM
}

interface removeItem {
  type: CalcActionTypes.REMOVE_ITEM
  payload: draggedElement
}

export type CalcAction =
  | ToggleSwitcherAction
  | leaveElement
  | takeElement
  | hoverField
  | setDragTarget
  | dropItem
  | removeItem
