import React, { DragEvent, useState } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import styles from './Numbers.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../Line/Line'

function Numbers({ inZone, isDraggable }: ItemProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem } = useActions()
  const dragStartHandler = () => {
    takeElement('numbers')
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
    setDragTarget('numbersUP')
    setIsShown(false)
  }
  const dropHandlerBot = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragTarget('numbersBOT')
    setIsShown(false)
  }
  const handleRemoveItem = () => {
    removeItem('numbers')
  }
  return (
    <div
      className={cn(styles.numbers, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('numbers') && !inZone,
      })}
      onDoubleClick={handleRemoveItem}
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
        <Button size="m">7</Button>
        <Button size="m">8</Button>
        <Button size="m" noRightMargin>
          9
        </Button>
        <Button size="m">4</Button>
        <Button size="m">5</Button>
        <Button size="m" noRightMargin>
          6
        </Button>
        <Button size="m">1</Button>
        <Button size="m">2</Button>
        <Button size="m" noRightMargin>
          3
        </Button>
        <Button size="l">0</Button>
        <Button size="m" noRightMargin>
          ,
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

export default Numbers
