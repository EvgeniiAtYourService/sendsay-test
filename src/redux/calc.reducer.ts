import { CalcAction, CalcActionTypes, CalcState } from './calc.types'

const initialState: CalcState = {
  isEditable: true,
}

export const CalcReducer = (state = initialState, action: CalcAction) => {
  switch (action.type) {
    case CalcActionTypes.TOGGLE_SWITCHER:
      return {
        ...state,
        isEditable: action.payload,
      }
    default:
      return state
  }
}
