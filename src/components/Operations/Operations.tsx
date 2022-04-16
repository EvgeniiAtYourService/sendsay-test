import React, { DragEvent, useState } from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../common/Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'

function Operations({ inZone, isDraggable }: ItemProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone, isEditable, draggedElement, isFieldHovered, itemHovered } =
    useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem, hoverItem } =
    useActions()
  const isElementLast = dragZone.indexOf('operations') === dragZone.length - 1
  const notMaxLength = dragZone.length !== 4
  const dragStartHandler = () => {
    takeElement('operations')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverUpHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(true)
    setLineUp(true)
    hoverItem(true)
  }
  const dragOverBotHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(true)
    setLineUp(false)
    hoverItem(true)
  }
  const dragLeaveUpHandler = () => {
    setIsShown(false)
    hoverItem(false)
  }
  const dragLeaveBotHandler = () => {
    setIsShown(false)
    hoverItem(false)
  }
  const dropHandlerUp = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragTarget('operationsUP')
    setIsShown(false)
    hoverItem(false)
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragTarget('operationsBOT')
    setIsShown(false)
    hoverItem(false)
  }
  const handleRemoveItem = () => {
    removeItem('operations')
  }
  const handleClick = (operator: '/' | '*' | '-' | '+') => {
    if (inZone) {
      console.log(operator)
    }
  }
  return (
    <div
      className={cn(styles.operations, {
        readyItem: !inZone,
        disabledItem:
          (dragZone.includes('operations') && !inZone) ||
          draggedElement === 'operations',
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
          !inZone && dragZone.includes('operations')
            ? {
              cursor: 'default',
            }
            : undefined
        }
      >
        {isEditable && (
          <>
            <div
              onDragOver={dragOverUpHandler}
              onDragLeave={dragLeaveUpHandler}
              onDrop={dropHandlerUp}
              className={cn('dropArea', {
                [styles.dropAreaUp]: inZone,
              })}
            />
            <div
              onDragOver={dragOverBotHandler}
              onDragLeave={dragLeaveBotHandler}
              onDrop={dropHandlerBot}
              className={cn('dropArea', {
                [styles.dropAreaBot]: inZone,
              })}
            />
          </>
        )}

        <Button
          size="s"
          onClick={() => handleClick('/')}
          pointer={!inZone && dragZone.includes('operations')}
        >
          /
        </Button>
        <Button
          size="s"
          onClick={() => handleClick('*')}
          pointer={!inZone && dragZone.includes('operations')}
        >
          x
        </Button>
        <Button
          size="s"
          onClick={() => handleClick('-')}
          pointer={!inZone && dragZone.includes('operations')}
        >
          -
        </Button>
        <Button
          size="s"
          onClick={() => handleClick('+')}
          noRightMargin
          pointer={!inZone && dragZone.includes('operations')}
        >
          +
        </Button>
        {inZone ? <Line isShown={isShown} up={lineUp} /> : undefined}
        {inZone ? (
          <Line
            isShown={
            isFieldHovered &&
            isElementLast &&
            notMaxLength
            && !itemHovered
          }
          />
        ) : undefined}
      </div>
    </div>
  )
}

export default Operations
