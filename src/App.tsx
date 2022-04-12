import React from 'react'
import Button from './components/Button/Button'
import Display from './components/Display/Display'
import Operations from './components/Operations/Operations'
import './global.css'

function App() {
  return (
    <div className="App">
      <Button size="s">/</Button>
      <Button size="m">7</Button>
      <Button size="l">0</Button>
      <div className="blockWrapper">
        <Button size="equals">=</Button>
      </div>
      <Display value={0} className="blockWrapper" />
      <br />
      <br />
      <Button size="equals" className="blockWrapper">
        =
      </Button>
      <br />
      <br />
      <Operations className="blockWrapper" />
    </div>
  )
}

export default App
