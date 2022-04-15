import React, { DetailedHTMLProps,
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
  const { currentValue, dragZone, isFieldHovered, draggedElement } =
    useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement, setDragTarget } = useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  const dragOverHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setIsShown(true)
    }
  }

  const dragLeaveHandler = () => {
    if (inZone) {
      setIsShown(false)
    }
  }
  const dropHandler = (e: DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (inZone) {
      setIsShown(false)
      setDragTarget('displayFULL')
    }
  }
  return (
    <div
      className={cn(styles.displayWrapper, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('display') && !inZone,
      })}
    >
      <div
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandler}
        className={cn('dropArea', {
          [styles.dropAreaFull]: inZone,
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
