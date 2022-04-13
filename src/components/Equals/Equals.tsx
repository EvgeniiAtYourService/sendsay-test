import React from 'react'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import EqualsProps from './Equals.props'

function Equals({ className }: EqualsProps) {
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={className}>
      <div draggable onDragStart={dragStartHandler} onDragEnd={dragEndHandler}>
        <Button size="equals">=</Button>
      </div>
    </div>
  )
}

export default Equals
