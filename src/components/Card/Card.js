import React from "react"
import { useDispatch } from "react-redux"
import { Draggable } from "react-beautiful-dnd"

import styles from "./card.module.css"
import allTags from "../../constants/allTags"
import Tag from "../Tag/Tag"
import DarkSettingsIcon from "../../iconComponents/DarkSettingsIcon"
import GreenCheckIcon from "../../iconComponents/GreenCheckIcon"
import { openTaskDialog } from "../../store/actions"

export default ({ card, index }) => {
  const dispatch = useDispatch()

  const { header, status, tags, id } = card
  const cardTags = tags && allTags.filter(tag => tags.includes(tag.label))

  return status !== "live" ? (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.header}>
            <div className={styles.headerText}>{header}</div>
            <button
              className={styles.btnSettings}
              onClick={() => dispatch(openTaskDialog({ ...card, editStatus: true }))}
            >
              <DarkSettingsIcon />
            </button>
          </div>
          {status !== "backlog" && <div className={styles.description}>{card.description}</div>}
          {status !== "backlog" && cardTags && (
            <div className={styles.tags}>
              {cardTags.map(tag => (
                <Tag key={tag.label} color={tag.color} label={tag.label} />
              ))}
            </div>
          )}
        </div>
      )}
    </Draggable>
  ) : (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className={styles.header} style={{ justifyContent: "flex-start", marginLeft: 10 }}>
            <GreenCheckIcon />
            <div className={styles.completed}>Completed</div>
          </div>
          <hr className={styles.horizontalLine} color="#98ca5b" />
          <div className={styles.headerTextLineTrough}>{header}</div>
        </div>
      )}
    </Draggable>
  )
}
