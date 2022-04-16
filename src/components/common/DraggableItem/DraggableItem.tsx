import React, { ReactNode } from 'react'
import cn from 'classnames'
import { CalcAction, draggedElement } from '../../../redux/calc.types'

interface DraggableItemProps {
  item: 'equals' | 'numbers' | 'operations'
  children: ReactNode
  takeElement: (payload: draggedElement) => CalcAction
  leaveElement: () => CalcAction
  isDraggable: boolean
  isEditable: boolean
  inZone: boolean
  dragZone: Array<draggedElement>
}

function DraggableItem({
  item,
  children,
  takeElement,
  leaveElement,
  isDraggable,
  isEditable,
  inZone,
  dragZone,
}: DraggableItemProps): JSX.Element {
  const dragStartHandler = () => {
    takeElement(item)
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div
      draggable={isDraggable && isEditable}
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      className={cn({
        cursorMove: !inZone || (inZone && isEditable),
        cursorDefault: inZone && !isEditable,
      })}
      style={
    !inZone && dragZone.includes(item)
      ? {
        cursor: 'default',
      }
      : undefined
  }
    >
      {children}
    </div>
  )
}

export default DraggableItem
