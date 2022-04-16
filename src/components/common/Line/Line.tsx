import React from 'react'
import cn from 'classnames'
import styles from './Line.module.css'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface LineProps {
  isShown: boolean
  up?: boolean
  inZone: boolean
}

function Line({ isShown, up = false, inZone }: LineProps): JSX.Element {
  const { draggedElement } = useTypedSelector((state) => state.calcState)
  if (isShown && draggedElement !== 'display' && inZone) {
    return (
      <>
        <span className={cn(styles.rhombus, styles.leftRhombus, {
          [styles.rhombusUp]: up
        })}
        />
        <hr className={cn(styles.line, {
          [styles.lineUp]: up
        })}
        />
        <span className={cn(styles.rhombus, styles.rightRhombus, {
          [styles.rhombusUp]: up
        })}
        />
      </>
    )
  }
  return <div />
}

export default Line
