import { CalcAction, CalcActionTypes, CalcState } from './calc.types'

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
          if (copy.dragZone.includes(copy.draggedElement)) {
            const index = copy.dragZone.indexOf(copy.draggedElement)
            copy.dragZone.splice(index, 1)
            copy.dragZone.splice(1, 0, copy.draggedElement)
          } else {
            copy.dragZone.splice(1, 0, copy.draggedElement)
          }
          copy.dragTarget = null
          return copy
        default:
          return {
            ...state,
            dragZone:
              state.draggedElement === 'display'
                ? ['display', ...state.dragZone]
                : [...state.dragZone, state.draggedElement],
            draggedElement: null,
          }
      }
    default:
      return state
  }
}
