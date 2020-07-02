import React from "react"
import { useDispatch } from "react-redux"

import styles from "./column.module.css"
import Card from "../Card/Card"
import AddTask from "../AddTask/AddTask"
import { openTaskDialog } from "../../store/actions"

export default ({ column, cards }) => {
  const dispatch = useDispatch()
  const { label, Icon, color, status } = column

  return (
    <div className={styles.container}>
      <div className={styles.header} style={{ backgroundColor: color }}>
        <div className={styles.containerForIconAndLabel}>
          <Icon />
          <div>{label}</div>
        </div>
        <div>{cards.length}</div>
      </div>
      <div className={styles.containerForCards} style={{ backgroundColor: color }}>
        {cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
        {status !== "live" && status !== "backlog" ? (
          <AddTask
            onClick={() =>
              dispatch(openTaskDialog({ disableStatusSelect: false, status: column.status }))
            }
          />
        ) : null}
      </div>
    </div>
  )
}
