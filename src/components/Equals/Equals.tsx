import React from 'react'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'

function Equals(): JSX.Element {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={styles.equals}>
      <div draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
        <Button size="xl">=</Button>
      </div>
    </div>
  )
}

export default Equals
