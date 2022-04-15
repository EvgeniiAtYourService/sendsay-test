import React, { DragEvent } from 'react'
import cn from 'classnames'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'

function Equals({ inZone, isDraggable }: ItemProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
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
      setDragTarget('equalsUP')
    }
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      // setIsShown(false)
      setDragTarget('equalsBOT')
    }
  }
  return (
    <div
      className={cn(styles.equals, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('equals') && !inZone,
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
        <Button size="xl">=</Button>
      </div>
    </div>
  )
}

export default Equals
