export interface CalcState {
  isEditable: boolean
}

export enum CalcActionTypes {
  TOGGLE_SWITCHER = 'TOGGLE_SWITCHER',
}

interface ToggleSwitcherAction {
  type: CalcActionTypes.TOGGLE_SWITCHER
  payload: boolean
}

export type CalcAction = ToggleSwitcherAction
