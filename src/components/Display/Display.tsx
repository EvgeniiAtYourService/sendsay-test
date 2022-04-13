import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import { useActions } from '../../hooks/useActions'
import styles from './Display.module.css'

type DisplayProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

function Display({ value, onChange }: DisplayProps) {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={styles.displayWrapper}>
      <input
        type="text"
        readOnly
        value={value}
        onChange={onChange}
        className={styles.display}
        draggable
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      />
    </div>
  )
}

export default Display
