import React from "react"
import { useDispatch } from "react-redux"

import styles from "./card.module.css"
import allTags from "../../constants/allTags"
import Tag from "../Tag/Tag"
import DarkSettingsIcon from "../../iconComponents/DarkSettingsIcon"
import GreenCheckIcon from "../../iconComponents/GreenCheckIcon"
import { openTaskDialog } from "../../store/actions"

export default ({ card }) => {
  const dispatch = useDispatch()

  const { header, status, tags } = card
  const cardTags = tags && allTags.filter(tag => tags.includes(tag.label))

  return status !== "live" ? (
    <div className={styles.container}>
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
  ) : (
    <div className={styles.container}>
      <div className={styles.header} style={{ justifyContent: "flex-start", marginLeft: 10 }}>
        <GreenCheckIcon />
        <div className={styles.completed}>Completed</div>
      </div>
      <hr className={styles.horizontalLine} color="#98ca5b" />
      <div className={styles.headerTextLineTrough}>{header}</div>
    </div>
  )
}
