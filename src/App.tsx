import React from 'react'
import styles from './App.module.css'
import './global.css'
import Numbers from './components/Numbers/Numbers'
import Display from './components/Display/Display'
import Operations from './components/Operations/Operations'
import Switcher from './components/Switcher/Switcher'
import DragField from './components/DragField/DragField'
import Equals from './components/Equals/Equals'

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <div className={styles.leftPanel}>
        <Display value={0} />
        <Operations />
        <Numbers />
        <Equals />
      </div>
      <div className={styles.rightPanel}>
        <Switcher />
        <DragField />
      </div>
    </div>
  )
}

export default App
