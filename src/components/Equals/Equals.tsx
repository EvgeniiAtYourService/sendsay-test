import React from 'react'
import cn from 'classnames'
import styles from './Equals.module.css'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { ItemProps } from '../../interfaces/item-props.interface'

function Equals({ inZone, isDraggable }: ItemProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('equals')
  }
  const dragEndHandler = () => {
    leaveElement()
  }

  return (
    <div
      className={cn(styles.equals, {
        readyItem: !inZone,
        disabledItem: dragZone.includes('equals') && !inZone,
      })}
    >
      <div className={cn('dropArea', {
        [styles.dropAreaUp]: inZone
      })}
      />
      <div className={cn('dropArea', {
        [styles.dropAreaBot]: inZone
      })}
      />
      <div
        draggable={isDraggable}
        onDragStart={dragStartHandler}
        onDragEnd={dragEndHandler}
      >
        <Button size="xl">=</Button>
      </div>
    </div>
  )
}

export default Equals
