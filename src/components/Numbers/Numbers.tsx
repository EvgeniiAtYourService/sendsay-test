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
  const [isShown, setIsShown] = useState<boolean>(false)
  const [lineUp, setLineUp] = useState<boolean>(false)
  const { dragZone, isEditable, draggedElement, isFieldHovered, itemHovered } =
    useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem, hoverItem } =
    useActions()
  const isElementLast = dragZone.indexOf('numbers') === dragZone.length - 1
  const notMaxLength = dragZone.length !== 4
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

        <Button
          size="m"
          value="1"
          onClick={() => handleClick(7)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          7
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(8)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          8
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(9)}
          noRightMargin
          pointer={!inZone && dragZone.includes('numbers')}
        >
          9
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(4)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          4
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(5)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          5
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(6)}
          noRightMargin
          pointer={!inZone && dragZone.includes('numbers')}
        >
          6
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(1)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          1
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(2)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          2
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(3)}
          noRightMargin
          pointer={!inZone && dragZone.includes('numbers')}
        >
          3
        </Button>
        <Button
          size="l"
          onClick={() => handleClick(0)}
          pointer={!inZone && dragZone.includes('numbers')}
        >
          0
        </Button>
        <Button
          size="m"
          onClick={() => handleClick(',')}
          noRightMargin
          pointer={!inZone && dragZone.includes('numbers')}
        >
          ,
        </Button>
        <Line isShown={isShown} up={lineUp} inZone={inZone} />
        <Line
          isShown={
            isFieldHovered &&
            isElementLast &&
            notMaxLength
            && !itemHovered
          }
          inZone={inZone}
        />
      </DraggableItem>
    </div>
  )
}

export default Numbers
