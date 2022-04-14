import React from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './DragField.module.css'
import imgIcon from './imgIcon.svg'

function DragField(): JSX.Element {
  const { isFieldHovered } = useTypedSelector((state) => state.calcState)
  const { hoverField } = useActions()
  const dragOverHandler = () => {
    hoverField(true)
  }
  const dragLeaveHandler = () => {
    hoverField(false)
  }
  return (
    <div
      className={cn(styles.dragField, {
        [styles.isDragged]: isFieldHovered,
      })}
      onDragOver={dragOverHandler}
      onDragLeave={dragLeaveHandler}
    >
      <img src={imgIcon} alt="Icon" className={styles.icon} />
      <p className={styles.text}>Перетащите сюда</p>
      <p className={styles.textSmall}>любой элемент из левой панели</p>
    </div>
  )
}

export default DragField
