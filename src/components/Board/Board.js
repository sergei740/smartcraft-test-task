import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./board.module.css"
import Column from "../Column/Column"
import boardColumns from "../../constants/boardColumns"
// import { getTasks } from "../../store/actions"
import { fetchTasks, getSearchInputValue } from "../../store/appReducer"

export default ({ openTaskDialog }) => {
  // const dispatch = useDispatch()
  const cards = useSelector(fetchTasks)
  const [filteredCards, setFilteredCards] = useState([])
  const inputValue = useSelector(getSearchInputValue)

  useEffect(() => {
    setFilteredCards(cards)
  }, [cards])

  useEffect(() => {
    const newCards = cards.filter(card => {
      return (
        card.header.trim().toLowerCase().includes(inputValue.trim().toLowerCase()) ||
        card.description.trim().toLowerCase().includes(inputValue.trim().toLowerCase())
      )
    })

    setFilteredCards(newCards)
  }, [inputValue, cards])

  // useEffect(() => {
  //   dispatch(getTasks())
  // }, [dispatch])

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
