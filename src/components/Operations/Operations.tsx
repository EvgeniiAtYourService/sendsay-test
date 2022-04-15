import React, { DragEvent, useState } from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../Line/Line'

function Operations({ inZone, isDraggable }: ItemProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget } = useActions()
  const dragStartHandler = () => {
    takeElement('operations')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverUpHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setIsShown(true)
      setLineUp(true)
    }
  }
  const dragOverBotHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setIsShown(true)
      setLineUp(false)
    }
  }
  const dragLeaveUpHandler = () => {
    if (inZone) {
      setIsShown(false)
    }
  }
  const dragLeaveBotHandler = () => {
    if (inZone) {
      setIsShown(false)
    }
  }
  const dropHandlerUp = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setDragTarget('operationsUP')
      setIsShown(false)
    }
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setDragTarget('operationsBOT')
      setIsShown(false)
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
        <Button size="s">/</Button>
        <Button size="s">x</Button>
        <Button size="s">-</Button>
        <Button size="s" noRightMargin>
          +
        </Button>
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

export default Operations
