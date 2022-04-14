import React from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './DragField.module.css'
import imgIcon from './imgIcon.svg'
import Display from '../Display/Display'
import Operations from '../Operations/Operations'
import Equals from '../Equals/Equals'
import Numbers from '../Numbers/Numbers'

function DragField(): JSX.Element {
  const { isFieldHovered, dragZone } = useTypedSelector(
    (state) => state.calcState,
  )
  const { hoverField } = useActions()
  const dragOverHandler = () => {
    hoverField(true)
  }
  const dragLeaveHandler = () => {
    hoverField(false)
  }
  if (dragZone.length !== 0) {
    return (
      <div className={styles.dragContainer}>
        {dragZone.map((item) => {
          switch (item) {
            case 'display':
              return <Display inZone />
            case 'operations':
              return <Operations inZone />
            case 'numbers':
              return <Numbers inZone />
            case 'equals':
              return <Equals inZone />
            default:
              return null
          }
        })}
      </div>
    )
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
