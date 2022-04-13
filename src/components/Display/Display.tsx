import React from 'react'
import { useActions } from '../../hooks/useActions'
import styles from './Display.module.css'
import { DisplayProps } from './Display.props'

function Display({ value, onChange, className }: DisplayProps) {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('display')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={className}>
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
