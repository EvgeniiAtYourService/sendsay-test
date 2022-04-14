import React from 'react'
import styles from './Operations.module.css'
import Button from '../Button/Button'
import { useActions } from '../../hooks/useActions'

function Operations(): JSX.Element {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('operations')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={styles.operations}>
      <div draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
        <Button size="s">/</Button>
        <Button size="s">x</Button>
        <Button size="s">-</Button>
        <Button size="s" noRightMargin>
          +
        </Button>
      </div>
    </div>
  )
}

export default Operations
