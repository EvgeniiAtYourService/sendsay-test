import React from 'react'
import cn from 'classnames'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import styles from './Switcher.module.css'
import eyeIcon from './eyeIcon.svg'
import arrsIcon from './arrsIcon.svg'

function Switcher(): JSX.Element {
  const { isEditable } = useTypedSelector((state) => state.calcState)
  const { toggleSwitcher } = useActions()
  const handleToggleSwitcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSwitcher(e.target.checked)
  }
  return (
    <label htmlFor="switcher" className={styles.switcherWrapper}>
      <input
        id="switcher"
        type="checkbox"
        onChange={handleToggleSwitcher}
        checked={isEditable}
        className={styles.switcher}
      />
      <span className={styles.slider}>
        <span
          className={cn(styles.track, {
            [styles.trackMove]: isEditable,
          })}
        >
          {isEditable ? (
            <>
              <img
                src={eyeIcon}
                alt="Eye"
                className={cn(styles.icon, {
                  [styles.iconActive]: isEditable,
                })}
              />
              <p>Constructor</p>
            </>
          ) : (
            <>
              <img
                src={arrsIcon}
                alt="Brackets"
                className={cn(styles.icon, {
                  [styles.iconActive]: !isEditable,
                })}
              />
              <p>Runtime</p>
            </>
          )}
        </span>
        <span className={cn(styles.sliderBg, styles.runtimeBg)}>
          <img src={arrsIcon} alt="Brackets" className={styles.icon} />
          <p>Runtime</p>
        </span>
        <span className={cn(styles.sliderBg, styles.constructorBg)}>
          <img src={eyeIcon} alt="Eye" className={styles.icon} />
          <p>Constructor</p>
        </span>
      </span>
    </label>
  )
}

export default Switcher
