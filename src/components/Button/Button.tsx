import React from 'react'
import classnames from 'classnames'
import styles from './Button.module.css'
import { ButtonProps } from './Button.props'

function Button({ children, size, onClick, noRightMargin }: ButtonProps) {
  const classes = classnames(styles.common, {
    [styles.s]: size === 's',
    [styles.m]: size === 'm',
    [styles.l]: size === 'l',
    [styles.equals]: size === 'equals',
    [styles.noRightMargin]: noRightMargin,
  })
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
