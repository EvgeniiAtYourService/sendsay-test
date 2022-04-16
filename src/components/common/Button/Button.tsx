import React, { ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode, } from 'react'
import cn from 'classnames'
import styles from './Button.module.css'
import { useTypedSelector } from '../../../hooks/useTypedSelector'

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode
  size: 's' | 'm' | 'l' | 'xl'
  noRightMargin?: boolean
  pointer: boolean
}

function Button({
  children,
  size,
  onClick,
  noRightMargin,
  pointer = false
}: ButtonProps): JSX.Element {
  const { isEditable } = useTypedSelector((state) => state.calcState)
  const classes = cn(styles.common, {
    [styles.s]: size === 's',
    [styles.m]: size === 'm',
    [styles.l]: size === 'l',
    [styles.xl]: size === 'xl',
    [styles.noRightMargin]: noRightMargin,
    [styles.cursorPointer]: !isEditable,
  })
  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      style={
        pointer
          ? {
            cursor: 'default',
          }
          : undefined
      }
    >
      {children}
    </button>
  )
}

export default Button
