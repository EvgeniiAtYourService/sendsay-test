import React, { CSSProperties, DetailedHTMLProps,
  DragEvent,
  InputHTMLAttributes,
  useState, } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import styles from './Display.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'
import Line from '../Line/Line'

type DisplayProps = ItemProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Display({ isDraggable, inZone, onChange }: DisplayProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false)
  const { currentValue, dragZone, isFieldHovered, draggedElement, isEditable } =
    useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget, removeItem } = useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(true)
  }

  const dragLeaveHandler = () => {
    setIsShown(false)
  }
  const dropHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsShown(false)
    setDragTarget('displayFULL')
  }
  const handleRemoveItem = () => {
    removeItem('display')
  }
  const defineCursor = (): CSSProperties | undefined => {
    if (!inZone && dragZone.includes('display')) {
      return {
        cursor: 'default'
      }
    }
    if (!inZone && !dragZone.includes('display')) {
      return {
        cursor: 'move'
      }
    }
    return undefined
  }
  return (
    <div
      className={cn(styles.displayWrapper, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('display') && !inZone,

      })}
      onDoubleClick={inZone && isEditable ? handleRemoveItem : undefined}
    >
      <div
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        className={cn('dropArea', {
          [styles.dropAreaFull]: inZone,
          cursorMove: !inZone,
          [styles.cursorDisabled]: inZone && isEditable,
          cursorDefault: inZone && !isEditable,
        })}
      />
      <input
        type="number"
        readOnly
        value={currentValue}
        onChange={onChange}
        className={styles.display}
        draggable={isDraggable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
        id="displayFULL"
        style={defineCursor()}
      />
      {inZone ? (
        <Line
          isShown={
            isShown ||
            (draggedElement !== null &&
              isFieldHovered &&
              dragZone.length === 1 &&
              dragZone[0] === 'display')
          }
        />
      ) : undefined}
    </div>
  )
}

export default Display
