import { CalcAction, CalcActionTypes, CalcState } from './calc.types'
import { moveItem } from './move-item'

const initialState: CalcState = {
  isEditable: true,
  dragZone: [],
  draggedElement: null,
  isFieldHovered: false,
  currentValue: 0,
  dragTarget: null
}

export function CalcReducer(
  state = initialState,
  action: CalcAction
): CalcState {
  const copy = {
    ...state,
  }
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
    case CalcActionTypes.SET_DRAG_TARGET:
      return {
        ...state,
        dragTarget: action.payload,
      }
    case CalcActionTypes.DROP_ITEM:
      switch (copy.dragTarget) {
        case 'displayFULL':
          return moveItem('display', null, copy)
        case 'operationsUP':
          return moveItem('operations', 'up', copy)
        case 'operationsBOT':
          return moveItem('operations', 'bot', copy)
        case 'numbersUP':
          return moveItem('numbers', 'up', copy)
        case 'numbersBOT':
          return moveItem('numbers', 'bot', copy)
        case 'equalsUP':
          return moveItem('equals', 'up', copy)
        case 'equalsBOT':
          return moveItem('equals', 'bot', copy)
        default:
          if (!copy.dragZone.includes(copy.draggedElement)) {
            return {
              ...state,
              dragZone:
                state.draggedElement === 'display'
                  ? ['display', ...state.dragZone]
                  : [...state.dragZone, state.draggedElement],
              draggedElement: null,
            }
          }
          return copy
      }
    case CalcActionTypes.REMOVE_ITEM:
      return {
        ...state,
        dragZone: copy.dragZone.filter((item) => item !== action.payload)
      }
    default:
      return state
  }
}
