import React from 'react'
import cn from 'classnames'
import styles from './App.module.css'
import './global.css'
import Numbers from './components/Numbers/Numbers'
import Display from './components/Display/Display'
import Operations from './components/Operations/Operations'
import Switcher from './components/Switcher/Switcher'
import DragField from './components/DragField/DragField'
import Equals from './components/Equals/Equals'
import { useTypedSelector } from './hooks/useTypedSelector'

function App(): JSX.Element {
  const { isEditable } = useTypedSelector(
    (state) => state.calcState,
  )
  return (
    <div className={styles.app}>
      <div className={cn(styles.leftPanel, {
        [styles.disabledPanel]: !isEditable,
      })}
      >
        <Display inZone={false} />
        <Operations inZone={false} />
        <Numbers inZone={false} />
        <Equals inZone={false} />
      </div>
      <div className={styles.rightPanel}>
        <Switcher />
        <DragField />
      </div>
    </div>
  )
}

export default App
