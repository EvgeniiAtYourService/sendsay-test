import React from 'react'
import styles from './Display.module.css'
import { DisplayProps } from './Display.props'

function Display({ value, onChange, className }: DisplayProps) {
  return (
    <div className={className}>
      <input
        type="text"
        readOnly
        value={value}
        onChange={onChange}
        className={styles.display}
      />
    </div>
  )
}

export default Display
