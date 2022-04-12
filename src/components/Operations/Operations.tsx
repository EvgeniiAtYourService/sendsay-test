import React from 'react'
import styles from './Operations.module.css'
import Button from '../Button/Button'
import OperationsProps from './Operations.props'

function Operations({ className }: OperationsProps) {
  return (
    <div className={`${styles.operations} ${className}`}>
      <Button size="s">/</Button>
      <Button size="s">x</Button>
      <Button size="s">-</Button>
      <Button size="s" noRightMargin>
        +
      </Button>
    </div>
  )
}

export default Operations
