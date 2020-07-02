import React from "react"

import styles from "./tag.module.css"

export default ({ label, color }) => {
  return (
    <div style={{ backgroundColor: color }} className={styles.tag}>
      {label}
    </div>
  )
}
