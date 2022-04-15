import React, { DragEvent } from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'

function Operations({ inZone, isDraggable }: ItemProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget } = useActions()
  const dragStartHandler = () => {
    takeElement('operations')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    // if (inZone) {
    // setIsShown(true)
    // }
  }
  const dropHandlerUp = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      // setIsShown(false)
      setDragTarget('operationsUP')
    }
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      // setIsShown(false)
      setDragTarget('operationsBOT')
    }
  }
  return (
    <div
      className={cn(styles.operations, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('operations') && !inZone,
      })}
    >
      <div
        draggable={isDraggable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      >
        <div
          onDragOver={dragOverHandler}
          onDrop={dropHandlerUp}
          className={cn('dropArea', {
            [styles.dropAreaUp]: inZone
          })}
        />
        <div
          onDragOver={dragOverHandler}
          onDrop={dropHandlerBot}
          className={cn('dropArea', {
            [styles.dropAreaBot]: inZone
          })}
        />
        <Button size="s">/</Button>
        <Button size="s">x</Button>
        <Button size="s">-</Button>
        <Button size="s" noRightMargin>
          +
        </Button>
      </div>

    </div>
  )
}

export default Operations
