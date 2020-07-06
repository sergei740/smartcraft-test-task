import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import styles from "./dialog.module.css"
import CloseIcon from "../../iconComponents/CloseIcon"
import RemoveIcon from "../../iconComponents/RemoveIcon"
import Tag from "../Tag/Tag"
import allTags from "../../constants/allTags"
import { getIsTaskDialogOpened, getIsTaskDialogProps } from "../../store/appReducer"
import { closeTaskDialog } from "../../store/actions"
import { sendTaskToDb, updateTaskInDb, deleteTaskFromDb } from "../../api"
import makeId from "../../makeId"

export default () => {
  const [taskCandidate, setTaskCandidate] = useState({ status: "backlog", tags: [] })
  const dispatch = useDispatch()
  const isOpen = useSelector(getIsTaskDialogOpened)
  const dialogProps = useSelector(getIsTaskDialogProps) || {}

  const handlerInput = ({ target: { name, value } }) => {
    setTaskCandidate({ ...taskCandidate, [name]: value })
  }

  const handlerCheckBoxInput = ({ target: { name, checked } }) => {
    if (checked) {
      setTaskCandidate({ ...taskCandidate, tags: [...taskCandidate.tags, name] })
    } else {
      setTaskCandidate({
        ...taskCandidate,
        tags: taskCandidate.tags.filter(tag => tag !== name),
      })
    }
  }

  const createTask = () => {
    const id = makeId(20)
    sendTaskToDb({ id, ...taskCandidate })
    dispatch(closeTaskDialog())
    setTaskCandidate({ status: "backlog", tags: [] })
  }

  const updateTask = () => {
    updateTaskInDb({...taskCandidate})
    dispatch(closeTaskDialog())
    setTaskCandidate({ status: "backlog", tags: [] })
  }

  const closeDialog = () => {
    dispatch(closeTaskDialog())
    setTaskCandidate({ status: "backlog", tags: [] })
  }

  const deleteTask = () => {
    deleteTaskFromDb(taskCandidate)
    dispatch(closeTaskDialog())
    setTaskCandidate({ status: "backlog", tags: [] })
  }

  useEffect(() => {
    if (Object.keys(dialogProps).length) {
      setTaskCandidate({ ...dialogProps, tags: dialogProps.tags || [] })
    }
  }, [dialogProps])

  return (
    isOpen && (
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <button className={styles.btnClose} onClick={() => closeDialog()}>
            <CloseIcon />
          </button>
          <div className={styles.contentContainer}>
            <input
              type="text"
              name="header"
              placeholder="Header"
              value={taskCandidate.header || ""}
              onChange={handlerInput}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={taskCandidate.description || ""}
              onChange={handlerInput}
            />
            {(dialogProps.editStatus || !dialogProps.status) && (
              <div className={styles.containerForSelect}>
                <label htmlFor="status">Status:</label>
                <select name="status" onChange={handlerInput} value={taskCandidate.status}>
                  <option checked value="backlog">
                    backlog
                  </option>
                  <option value="selected">selected</option>
                  <option value="running">running</option>
                  <option value="evaluating">evaluating</option>
                  <option value="live">live</option>
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
                      checked={taskCandidate.tags.includes(tag.label)}
                    />
                    <label htmlFor={tag.label}>
                      <Tag label={tag.label} color={tag.color} />
                    </label>
                  </div>
                )
              })}
            </div>
            {!dialogProps.disableStatusSelect && !dialogProps.editStatus ? (
              <div className={styles.btnContainer}>
                <button
                  className={styles.btnCreateTask}
                  onClick={createTask}
                  disabled={!taskCandidate.header || !taskCandidate.description}
                >
                  Create Task
                </button>
              </div>
            ) : (
              <div className={styles.btnContainer}>
                <button
                  className={styles.btnCreateTask}
                  onClick={updateTask}
                  disabled={!taskCandidate.header || !taskCandidate.description}
                >
                  Update Task
                </button>
                <button style={{ marginLeft: 10 }} onClick={deleteTask}>
                  <RemoveIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  )
}
