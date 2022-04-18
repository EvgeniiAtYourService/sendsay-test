import React, { useState } from 'react'
import cn from 'classnames'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../common/Button/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'
import DropAreas from '../common/DropAreas/DropAreas'
import DraggableItem from '../common/DraggableItem/DraggableItem'

function Equals({ inZone, isDraggable }: ItemProps): JSX.Element {
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
  const isElementLast = dragZone.indexOf('equals') === dragZone.length - 1
  const notMaxLength = dragZone.length !== 4
  const handleRemoveItem = () => {
    removeItem('equals')
  }
  const handleClick = () => {
    if (inZone) {
      calculate('=')
    }
  }
  return (
    <div
      className={cn(styles.equals, {
        readyItem: !inZone,
        disabledItem:
          (dragZone.includes('equals') && !inZone) ||
          draggedElement === 'equals',
      })}
      onDoubleClick={inZone && isEditable ? handleRemoveItem : undefined}
    >
      <DraggableItem
        item="equals"
        takeElement={takeElement}
        leaveElement={leaveElement}
        isDraggable={isDraggable}
        isEditable={isEditable}
        inZone={inZone}
        dragZone={dragZone}
      >
        <DropAreas
          item="equals"
          isEditable={isEditable}
          inZone={inZone}
          setIsShown={setIsShown}
          setLineUp={setLineUp}
          hoverItem={hoverItem}
          setDragTarget={setDragTarget}
        />

        <Button
          size="xl"
          onClick={handleClick}
          pointer={!inZone && dragZone.includes('equals')}
        >
          =
        </Button>
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

export default Equals
