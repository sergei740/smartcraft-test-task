import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import styles from "./board.module.css"
import Column from "../Column/Column"
import boardColumns from "../../constants/boardColumns"
import { getTasks, getSearchInputValue } from "../../store/appReducer"

export default ({ openTaskDialog }) => {
  const cards = useSelector(getTasks)
  const [filteredCards, setFilteredCards] = useState([])
  const inputValue = useSelector(getSearchInputValue)

  useEffect(() => {
    setFilteredCards(cards)
  }, [cards])

  useEffect(() => {
    if (cards.length) {
      const newCards = cards.filter(({ header, description }) => {
        const caseInsensetiveValue = inputValue.toLowerCase()

        return (
          header.trim().toLowerCase().includes(caseInsensetiveValue) ||
          description.trim().toLowerCase().includes(caseInsensetiveValue)
        )
      })

      setFilteredCards(newCards)
    }
  }, [inputValue, cards])

  return (
    <div className={styles.container}>
      {boardColumns.map(column => (
        <Column
          key={column.label}
          column={column}
          cards={column.cardsGetter(filteredCards)}
          onAddTask={() => openTaskDialog({ status: column.status, disableStatusSelect: true })}
          onEditCard={openTaskDialog}
        />
      ))}
    </div>
  )
}
