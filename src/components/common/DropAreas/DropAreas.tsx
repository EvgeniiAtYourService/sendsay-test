import React, { DragEvent } from 'react'
import cn from 'classnames'
import { CalcAction, dragTarget } from '../../../redux/calc.types'
import styles from './DropAreas.module.css'

interface DropAreasProps {
  item: 'display' | 'equals' | 'numbers' | 'operations'
  isEditable: boolean
  inZone: boolean
  setIsShown: React.Dispatch<React.SetStateAction<boolean>>
  setLineUp?: React.Dispatch<React.SetStateAction<boolean>>
  hoverItem: (payload: boolean) => CalcAction
  setDragTarget: (payload: dragTarget) => CalcAction
}

function DropAreas({
  item,
  isEditable,
  inZone,
  setIsShown,
  setLineUp,
  hoverItem,
  setDragTarget,
}: DropAreasProps): JSX.Element {
  const dragOverFullHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsShown(true)
    hoverItem(true)
  }
  const dragOverUpHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsShown(true)
    if (setLineUp) {
      setLineUp(true)
    }
    hoverItem(true)
  }
  const dragOverBotHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsShown(true)
    if (setLineUp) {
      setLineUp(false)
    }
    hoverItem(true)
  }
  const dragLeaveHandler = () => {
    setIsShown(false)
    hoverItem(false)
  }

  const dropHandlerUp = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    switch (item) {
      case 'equals':
        setDragTarget('equalsUP')
        break
      case 'numbers':
        setDragTarget('numbersUP')
        break
      case 'operations':
        setDragTarget('operationsUP')
        break
      default:
        break
    }

    setIsShown(false)
    hoverItem(false)
  }
  const dropHandlerBot = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    switch (item) {
      case 'display':
        setDragTarget('displayFULL')
        break
      case 'equals':
        setDragTarget('equalsBOT')
        break
      case 'numbers':
        setDragTarget('numbersBOT')
        break
      case 'operations':
        setDragTarget('operationsBOT')
        break
      default:
        break
    }

    setIsShown(false)
    hoverItem(false)
  }

  if (item === 'display') {
    return (
      <div
        onDragOver={dragOverFullHandler}
        onDragLeave={dragLeaveHandler}
        onDrop={dropHandlerBot}
        className={cn('dropArea', {
          [styles.dropAreaFullDisplay]: inZone,
          cursorMove: !inZone,
          [styles.cursorDisabledDisplay]: inZone && isEditable,
          cursorDefault: inZone && !isEditable,
        })}
      />
    )
  }
  if (isEditable && inZone) {
    return (
      <>
        {/* Верхняя половина item'a */}
        <div
          onDragOver={dragOverUpHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandlerUp}
          className={cn('dropArea', {
            [styles.dropAreaUpEquals]: item === 'equals',
            [styles.dropAreaUpNumbers]: item === 'numbers',
            [styles.dropAreaUpOperations]: item === 'operations',
          })}
        />
        {/* Нижняя половина item'a */}
        <div
          onDragOver={dragOverBotHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dropHandlerBot}
          className={cn('dropArea', {
            [styles.dropAreaBotEquals]: item === 'equals',
            [styles.dropAreaBotNumbers]: item === 'numbers',
            [styles.dropAreaBotOperations]: item === 'operations',
          })}
        />
      </>
    )
  }
  return <div />
}

export default DropAreas
