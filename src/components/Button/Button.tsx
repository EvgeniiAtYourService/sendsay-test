import React from 'react'
import styles from './Button.module.css'
import { ButtonProps } from './Button.props'

function Button({ children, size, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
