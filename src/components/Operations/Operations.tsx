import React from 'react'
import cn from 'classnames'
import styles from './Operations.module.css'
import Button from '../Button/Button'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface OperationsProps {
  inZone: boolean
}

function Operations({ inZone }: OperationsProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('operations')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div
      className={cn(styles.operations, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('operations') && !inZone,
      })}
    >
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
