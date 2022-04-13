import React from 'react'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
// import styles from './Switcher.module.css'

function Switcher() {
  const { isEditable } = useTypedSelector((state) => state.calcState)
  const { toggleSwitcher } = useActions()
  const handleToggleSwitcher = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSwitcher(e.target.checked)
  }
  return (
    <input
      type="checkbox"
      onChange={handleToggleSwitcher}
      checked={isEditable}
    />
  )
}

export default Switcher
