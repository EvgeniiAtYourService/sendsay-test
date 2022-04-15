import React, { DragEvent, useState } from 'react'
import cn from 'classnames'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../Line/Line'

function Equals({ inZone, isDraggable }: ItemProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone, isEditable } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverUpHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(true)
    setLineUp(true)
  }
  const dragOverBotHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(true)
    setLineUp(false)
  }
  const dragLeaveUpHandler = () => {
    setIsShown(false)
  }
  const dragLeaveBotHandler = () => {
    setIsShown(false)
  }
  const dropHandlerUp = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragTarget('equalsUP')
    setIsShown(false)
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragTarget('equalsBOT')
    setIsShown(false)
  }
  const handleRemoveItem = () => {
    removeItem('equals')
  }
  const handleClick = () => {
    if (inZone) {
      alert('=')
    }
  }
  return (
    <div
      className={cn(styles.equals, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('equals') && !inZone,
      })}
      onDoubleClick={inZone && isEditable ? handleRemoveItem : undefined}
    >
      <div
        draggable={isDraggable && isEditable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        className={cn({
          cursorMove: !inZone || (inZone && isEditable),
          cursorDefault: inZone && !isEditable,
        })}
        style={
          !inZone && dragZone.includes('equals')
            ? {
              cursor: 'default',
            }
            : undefined
        }
      >
        { isEditable && (
          <>
            <div
              onDragOver={dragOverUpHandler}
              onDragLeave={dragLeaveUpHandler}
              onDrop={dropHandlerUp}
              className={cn('dropArea', {
                [styles.dropAreaUp]: inZone
              })}
            />
            <div
              onDragOver={dragOverBotHandler}
              onDragLeave={dragLeaveBotHandler}
              onDrop={dropHandlerBot}
              className={cn('dropArea', {
                [styles.dropAreaBot]: inZone
              })}
            />
          </>
        ) }

        <Button size="xl" onClick={handleClick}>=</Button>
        {inZone ? (
          <Line
            isShown={isShown}
            up={lineUp}
          />
        ) : undefined}
      </div>
    </div>
  )
}

export default Equals
