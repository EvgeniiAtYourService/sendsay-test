import { CalcAction, CalcActionTypes, CalcState } from './calc.types'

const initialState: CalcState = {
  isEditable: true,
  dragZone: [],
  draggedElement: null,
  isFieldHovered: false,
}

export function CalcReducer(
  state = initialState,
  action: CalcAction,
): CalcState {
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
      // if (state.isFieldHovered && state.draggedElement === 'display') {
      //   const copyState = {
      //     ...state,
      //   }
      //   copyState.dragZone.push('display')
      //   copyState.draggedElement = null
      //   return copyState
      // }
      return {
        ...state,
        draggedElement: null,
        dragZone: [...state.dragZone, state.draggedElement],
      }
    // copyState.dragZone.push('display')
    // return state
    case CalcActionTypes.HOVER_FIELD:
      return {
        ...state,
        isFieldHovered: action.payload,
      }
    default:
      return state
  }
}
