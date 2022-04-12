import React from 'react'
import Button from '../Button/Button'
import styles from './Numbers.module.css'
import NumbersProps from './Numbers.props'

function Number({ className }: NumbersProps) {
  return (
    <div className={`${styles.numbers} ${className}`}>
      <Button size="m">7</Button>
      <Button size="m">8</Button>
      <Button size="m" noRightMargin>
        9
      </Button>
      <Button size="m">4</Button>
      <Button size="m">5</Button>
      <Button size="m" noRightMargin>
        6
      </Button>
      <Button size="m">1</Button>
      <Button size="m">2</Button>
      <Button size="m" noRightMargin>
        3
      </Button>
      <Button size="l">0</Button>
      <Button size="m" noRightMargin>
        ,
      </Button>
    </div>
  )
}

export default Number
