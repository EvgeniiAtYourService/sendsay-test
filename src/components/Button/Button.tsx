import React, { ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode } from 'react'
import classnames from 'classnames'
import styles from './Button.module.css'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  size: 's' | 'm' | 'l' | 'xl'
  noRightMargin?: boolean
}

function Button({ children, size, onClick, noRightMargin }: ButtonProps) {
  const classes = classnames(styles.common, {
    [styles.s]: size === 's',
    [styles.m]: size === 'm',
    [styles.l]: size === 'l',
    [styles.xl]: size === 'xl',
    [styles.noRightMargin]: noRightMargin,
  })
  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
