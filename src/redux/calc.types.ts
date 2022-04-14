export type draggedElement =
  | 'display'
  | 'operations'
  | 'numbers'
  | 'equals'
  | null

export interface CalcState {
  isEditable: boolean
  dragZone: Array<draggedElement>
  draggedElement: draggedElement
  isFieldHovered: boolean
  currentValue: number
}

export enum CalcActionTypes {
  TOGGLE_SWITCHER = 'TOGGLE_SWITCHER',
  LEAVE_ELEMENT = 'LEAVE_ELEMENT',
  TAKE_ELEMENT = 'TAKE_ELEMENT',
  HOVER_FIELD = 'HOVER_FIELD',
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

export type CalcAction =
  | ToggleSwitcherAction
  | leaveElement
  | takeElement
  | hoverField
