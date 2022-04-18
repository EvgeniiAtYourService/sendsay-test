import React, { useState } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import Button from '../common/Button/Button'
import styles from './Numbers.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'
import DropAreas from '../common/DropAreas/DropAreas'
import DraggableItem from '../common/DraggableItem/DraggableItem'

function Numbers({ inZone, isDraggable }: ItemProps): JSX.Element {
  const buttonValues = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, '.']
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
  const isElementLast = dragZone.indexOf('numbers') === dragZone.length - 1
  const notMaxLength = dragZone.length !== 4
  const handleRemoveItem = () => {
    removeItem('numbers')
  }
  const handleClick = (value: number | string) => {
    if (inZone) {
      calculate(value)
    }
  }
  return (
    <div
      className={cn(styles.numbers, {
        readyItem: !inZone,
        disabledItem:
          (dragZone.includes('numbers') && !inZone) ||
          draggedElement === 'numbers',
      })}
      onDoubleClick={inZone && isEditable ? handleRemoveItem : undefined}
    >
      <DraggableItem
        item="numbers"
        takeElement={takeElement}
        leaveElement={leaveElement}
        isDraggable={isDraggable}
        isEditable={isEditable}
        inZone={inZone}
        dragZone={dragZone}
      >
        <DropAreas
          item="numbers"
          isEditable={isEditable}
          inZone={inZone}
          setIsShown={setIsShown}
          setLineUp={setLineUp}
          hoverItem={hoverItem}
          setDragTarget={setDragTarget}
        />

        {buttonValues.map((value, index) => (
          <Button
            key={value}
            size={!value ? 'l' : 'm'}
            onClick={() => handleClick(value)}
            pointer={!inZone && dragZone.includes('numbers')}
            noRightMargin={value === '.' || (index + 1) % 3 === 0}
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

export default Numbers
