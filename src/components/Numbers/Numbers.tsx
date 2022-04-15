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
  const { dragZone, isEditable } = useTypedSelector((state) => state.calcState)
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
  const handleClick = (value: number | ',') => {
    if (inZone) {
      console.log(value)
    }
  }
  return (
    <div
      className={cn(styles.numbers, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('numbers') && !inZone,
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
          !inZone && dragZone.includes('numbers')
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
        ) }

        <Button size="m" value="1" onClick={() => handleClick(7)}>7</Button>
        <Button size="m" onClick={() => handleClick(8)}>8</Button>
        <Button size="m" onClick={() => handleClick(9)} noRightMargin>
          9
        </Button>
        <Button size="m" onClick={() => handleClick(4)}>4</Button>
        <Button size="m" onClick={() => handleClick(5)}>5</Button>
        <Button size="m" onClick={() => handleClick(6)} noRightMargin>
          6
        </Button>
        <Button size="m" onClick={() => handleClick(1)}>1</Button>
        <Button size="m" onClick={() => handleClick(2)}>2</Button>
        <Button size="m" onClick={() => handleClick(3)} noRightMargin>
          3
        </Button>
        <Button size="l" onClick={() => handleClick(0)}>0</Button>
        <Button size="m" onClick={() => handleClick(',')} noRightMargin>
          ,
        </Button>
        {inZone ? <Line isShown={isShown} up={lineUp} /> : undefined}
      </div>
    </div>
  )
}

export default Numbers
