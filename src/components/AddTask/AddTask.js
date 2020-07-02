import React, { Fragment } from "react"

import styles from "./add-task.module.css"
import AddIcon from "../../iconComponents/AddIcon"

export default ({ onClick }) => {
  return (
    <Fragment>
      <button className={styles.addBtn} onClick={onClick}>
        <AddIcon />
      </button>
    </Fragment>
  )
}
