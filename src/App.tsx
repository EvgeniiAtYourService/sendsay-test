import React from 'react'
import Button from './components/Button/Button'
import Numbers from './components/Numbers/Numbers'
import Display from './components/Display/Display'
import Operations from './components/Operations/Operations'
import './global.css'

function App() {
  return (
    <div className="App">
      <div className="leftPanel">
        <Display value={0} className="blockWrapper" />

        <Operations className="blockWrapper" />
        <Numbers className="blockWrapper" />
        <Button size="equals" className="blockWrapper">
          =
        </Button>
      </div>
      <div className="rightPanel">
        <div className="smth">123</div>
      </div>
    </div>
  )
}

export default App
