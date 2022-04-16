import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../common/Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'
import DropAreas from '../common/DropAreas/DropAreas'

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
        <DropAreas
          item="operations"
          isEditable={isEditable}
          inZone={inZone}
          setIsShown={setIsShown}
          setLineUp={setLineUp}
          hoverItem={hoverItem}
          setDragTarget={setDragTarget}
        />

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
