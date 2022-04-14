import React from 'react'
import cn from 'classnames'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface EqualsProps {
  inZone: boolean
}

function Equals({ inZone }: EqualsProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={cn(styles.equals, {
      readyItem: !inZone,
      disabledItem: dragZone.includes('equals') && !inZone,
    })}
    >
      <div draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
        <Button size="xl">=</Button>
      </div>
    </div>
  )
}

export default Equals
