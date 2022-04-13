import React from 'react'
import styles from './DragField.module.css'
import imgIcon from './imgIcon.svg'

function DragField() {
  return (
    <div className={styles.dragField}>
      <img src={imgIcon} alt="Icon" className={styles.icon} />
      <p className={styles.text}>Перетащите сюда</p>
      <p className={styles.textSmall}>любой элемент из левой панели</p>
    </div>
  )
}

export default DragField
