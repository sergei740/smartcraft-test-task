import React, { Fragment } from "react"

import styles from "./add-task.module.css"
import AddIcon from "../../iconComponents/AddIcon"
import AddBlueIcon from "../../iconComponents/AddBlueIcon"

export default ({ onClick, color }) => {
  return (
    <Fragment>
      <button className={styles.addBtn} onClick={onClick}>
        {color === "blue" ? <AddBlueIcon /> : <AddIcon />}
      </button>
    </Fragment>
  )
}
