import { CalcAction, CalcActionTypes, CalcState } from './calc.types'

const initialState: CalcState = {
  isEditable: true,
  dragZone: [],
  draggedElement: null,
  isFieldHovered: false,
}

export function CalcReducer(state = initialState, action: CalcAction) {
  // const copyState = {
  //   ...state,
  // }
  switch (action.type) {
    case CalcActionTypes.TOGGLE_SWITCHER:
      return {
        ...state,
        isEditable: action.payload,
      }
    case CalcActionTypes.TAKE_ELEMENT:
      return {
        ...state,
        draggedElement: action.payload,
      }
    case CalcActionTypes.LEAVE_ELEMENT:
      return {
        ...state,
        draggedElement: null,
      }
    case CalcActionTypes.HOVER_FIELD:
      return {
        ...state,
        isFieldHovered: action.payload,
      }
    default:
      return state
  }
}
