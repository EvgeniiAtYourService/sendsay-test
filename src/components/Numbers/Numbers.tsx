import React from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import Button from '../Button/Button'
import styles from './Numbers.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface NumbersProps {
  inZone: boolean
}

function Numbers({ inZone }: NumbersProps): JSX.Element {
  const { dragZone } = useTypedSelector((state) => state.calcState)
  const { leaveElement, takeElement } = useActions()
  const dragStartHandler = () => {
    takeElement('numbers')
  }
  const dragEndHandler = () => {
    leaveElement()
  }
  return (
    <div className={cn(styles.numbers, {
      readyItem: !inZone,
      disabledItem: dragZone.includes('numbers') && !inZone,
    })}
    >
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

export default Numbers
