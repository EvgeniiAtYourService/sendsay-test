import React, { CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useState, } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import styles from './Display.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../common/Line/Line'
import DropAreas from '../common/DropAreas/DropAreas'

type DisplayProps = ItemProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Display({ isDraggable, inZone, onChange }: DisplayProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const {
    displayedResult,
    dragZone,
    isFieldHovered,
    draggedElement,
    isEditable,
  } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem, hoverItem } =
    useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }

  const handleRemoveItem = () => {
    removeItem('display')
  }
  const defineCursor = (): CSSProperties | undefined => {
    if (!inZone && dragZone.includes('display')) {
      return {
        cursor: 'default',
      }
    }
    if (!inZone && !dragZone.includes('display')) {
      return {
        cursor: 'move',
      }
    }
    return undefined
  }
  return (
    <div
      className={cn(styles.displayWrapper, {
        readyItem: !inZone,
        disabledItem:
          (dragZone.includes('display') && !inZone) ||
          draggedElement === 'display',
      })}
      onDoubleClick={inZone && isEditable ? handleRemoveItem : undefined}
    >
      <DropAreas
        item="display"
        isEditable={isEditable}
        inZone={inZone}
        setIsShown={setIsShown}
        hoverItem={hoverItem}
        setDragTarget={setDragTarget}
      />
      <input
        type="text"
        readOnly
        value={displayedResult}
        onChange={onChange}
        className={cn(styles.display, {
          [styles.message]: displayedResult === 'Не определено',
          [styles.bigNum]: displayedResult.length >= 9,
          // max 17
        })}
        draggable={isDraggable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        id="displayFULL"
        style={defineCursor()}
      />

      <Line
        isShown={
          isShown ||
          (isFieldHovered && dragZone.length === 1 && dragZone[0] === 'display')
        }
        inZone={inZone}
      />
    </div>
  )
}

export default Display
