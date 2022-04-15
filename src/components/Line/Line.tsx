import React from 'react'
import cn from 'classnames'
import styles from './Line.module.css'

interface LineProps {
  isShown: boolean
}

function Line({ isShown }: LineProps): JSX.Element {
  if (isShown) {
    return (
      <>
        <span className={cn(styles.rhombus, styles.leftRhombus)} />
        <hr className={styles.line} />
        <span className={cn(styles.rhombus, styles.rightRhombus)} />
      </>
    )
  }
  return <div />
}

export default Line
