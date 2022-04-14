import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import styles from './Display.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'

type DisplayProps = ItemProps &
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

function Display({ isDraggable, inZone, onChange }: DisplayProps): JSX.Element {
  const { currentValue, dragZone } = useTypedSelector(
    (state) => state.calcState
  )
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div
      className={cn(styles.displayWrapper, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('display') && !inZone,
      })}
    >
      <input
        type="number"
        readOnly
        value={currentValue}
        onChange={onChange}
        className={styles.display}
        draggable={isDraggable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      />
    </div>
  )
}

export default Display
