import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from "./dialog.module.css"
import CloseIcon from "../../iconComponents/CloseIcon"
import Tag from "../Tag/Tag"
import allTags from "../../constants/allTags"
import { getIsTaskDialogOpened, getIsTaskDialogProps } from "../../store/appReducer"
import { closeTaskDialog } from "../../store/actions"
import { sendTaskToDb } from "../../api"

export default () => {
  const [taskCandidate, setTaskCandidate] = useState({ status: "backlog", tags: [] })
  const dispatch = useDispatch()
  const isOpen = useSelector(getIsTaskDialogOpened)
  const dialogProps = useSelector(getIsTaskDialogProps) || {}

  const handlerInput = e => setTaskCandidate({ ...taskCandidate, [e.target.name]: e.target.value })

  const handlerCheckBoxInput = e => {
    if (e.target.checked) {
      setTaskCandidate({ ...taskCandidate, tags: [...taskCandidate.tags, e.target.name] })
    } else {
      setTaskCandidate({
        ...taskCandidate,
        tags: taskCandidate.tags.filter(tag => tag !== e.target.name),
      })
    }
  }

  const createTask = () => {
    sendTaskToDb(taskCandidate)
    dispatch(closeTaskDialog())
    setTaskCandidate({ status: "backlog", tags: [] })
  }

  useEffect(() => {
    setTaskCandidate({ status: dialogProps.status, tags: [] })
  }, [dialogProps.status])

  return (
    isOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button className={styles.btnClose} onClick={() => dispatch(closeTaskDialog())}>
            <CloseIcon />
          </button>
          <div className={styles.contentContainer}>
            <input
              type="text"
              name="header"
              placeholder="Header"
              value={dialogProps.header || taskCandidate.header || ""}
              onChange={handlerInput}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={dialogProps.description || taskCandidate.description || ""}
              onChange={handlerInput}
            />
            {(dialogProps.editStatus || !dialogProps.status) && (
              <div>
                <select name="status" onChange={handlerInput} value={taskCandidate.status}>
                  <option value="backlog">backlog</option>
                  <option value="selected">selected</option>
                  <option value="running">running</option>
                  <option value="evaluating">evaluating</option>
                </select>
              </div>
            )}

            <div className={styles.containerForCheckBox}>
              {allTags.map(tag => {
                return (
                  <div key={tag.label} className={styles.checkBox}>
                    <input
                      onChange={handlerCheckBoxInput}
                      className={styles.checkBoxInput}
                      type="checkbox"
                      name={tag.label}
                      checked={dialogProps.tags && dialogProps.tags.includes(tag.label)}
                    />
                    <label htmlFor={tag.label}>
                      <Tag label={tag.label} color={tag.color} />
                    </label>
                  </div>
                )
              })}
            </div>
            {!dialogProps.disableStatusSelect && (
              <button
                className={styles.btnCreateTask}
                onClick={createTask}
                disabled={!taskCandidate.header || !taskCandidate.description}
              >
                {!dialogProps.editStatus ? "Create Task" : "Change Task"}
              </button>
            )}
          </div>
        </div>
      </div>
    )
  )
}
