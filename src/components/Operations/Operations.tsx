import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../common/Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'
import DropAreas from '../common/DropAreas/DropAreas'
import DraggableItem from '../common/DraggableItem/DraggableItem'

function Operations({ inZone, isDraggable }: ItemProps): JSX.Element {
  const buttonValues = ['/', '*', '-', '+']
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone, isEditable, draggedElement, isFieldHovered, itemHovered } =
    useTypedSelector((state) => state.calcState)
  const {
    leaveElement,
    takeElement,
    setDragTarget,
    removeItem,
    hoverItem,
    calculate,
  } = useActions()
  const isElementLast = dragZone.indexOf('operations') === dragZone.length - 1
  const notMaxLength = dragZone.length !== 4

  const handleRemoveItem = () => {
    removeItem('operations')
  }
  const handleClick = (operator: string) => {
    if (inZone) {
      calculate(operator)
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
      <DraggableItem
        item="operations"
        takeElement={takeElement}
        leaveElement={leaveElement}
        isDraggable={isDraggable}
        isEditable={isEditable}
        inZone={inZone}
        dragZone={dragZone}
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

        {buttonValues.map((value) => (
          <Button
            key={value}
            size="s"
            onClick={() => handleClick(value)}
            pointer={!inZone && dragZone.includes('operations')}
            noRightMargin={value === '+'}
          >
            {value}
          </Button>
        ))}

        <Line isShown={isShown} up={lineUp} inZone={inZone} />
        <Line
          isShown={
            isFieldHovered && isElementLast && notMaxLength && !itemHovered
          }
          inZone={inZone}
        />
      </DraggableItem>
    </div>
  )
}

export default Operations
