import React from "react"
import { useDispatch } from "react-redux"
import { Droppable } from "react-beautiful-dnd"

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
      <Droppable droppableId={status}>
        {provided => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={styles.containerForCards}
            style={{ backgroundColor: color }}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
            {status !== "live" ? (
              <AddTask
                onClick={() =>
                  dispatch(openTaskDialog({ disableStatusSelect: false, status: column.status }))
                }
              />
            ) : null}
          </div>
        )}
      </Droppable>
    </div>
  )
}
