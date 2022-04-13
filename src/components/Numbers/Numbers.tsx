import React from 'react'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import styles from './Numbers.module.css'

function Number() {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('numbers')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={styles.numbers}>
      <div draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
        <Button size="m">7</Button>
        <Button size="m">8</Button>
        <Button size="m" noRightMargin>
          9
        </Button>
        <Button size="m">4</Button>
        <Button size="m">5</Button>
        <Button size="m" noRightMargin>
          6
        </Button>
        <Button size="m">1</Button>
        <Button size="m">2</Button>
        <Button size="m" noRightMargin>
          3
        </Button>
        <Button size="l">0</Button>
        <Button size="m" noRightMargin>
          ,
        </Button>
      </div>
    </div>
  )
}

export default Number
