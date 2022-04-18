import { CalcState, draggedElement } from '../calc.types'

export const moveItem = (
  dropTarget: draggedElement,
  to: 'up' | 'bot' | null,
  state: CalcState
): CalcState => {
  const copy = {
    ...state,
  }

  const elementIndex = copy.dragZone.indexOf(copy.draggedElement)
  const targetIndex = copy.dragZone.indexOf(dropTarget)

  if (copy.draggedElement === 'display') {
    copy.dragZone.splice(0, 0, copy.draggedElement)
    copy.dragTarget = null
    return copy
  }

  if (dropTarget === 'display') {
    if (copy.dragZone.includes(copy.draggedElement)) {
      copy.dragZone.splice(elementIndex, 1)
      copy.dragZone.splice(1, 0, copy.draggedElement)
    } else {
      copy.dragZone.splice(1, 0, copy.draggedElement)
    }
    copy.dragTarget = null
    return copy
  }

  if (copy.dragZone.includes(copy.draggedElement)) {
    copy.dragZone.splice(elementIndex, 1)
    if (elementIndex > targetIndex) {
      copy.dragZone.splice(
        to === 'up' ? targetIndex : targetIndex + 1,
        0,
        copy.draggedElement
      )
    } else {
      copy.dragZone.splice(
        to === 'up' ? targetIndex - 1 : targetIndex,
        0,
        copy.draggedElement
      )
    }
  } else {
    copy.dragZone.splice(
      to === 'up' ? targetIndex : targetIndex + 1,
      0,
      copy.draggedElement
    )
  }

  copy.dragTarget = null
  return copy
}
