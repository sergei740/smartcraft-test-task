import React from "react"
import { useDispatch, useSelector } from "react-redux"

import styles from "./header.module.css"
import SearchInput from "../SearchInput/SearchInput"
import AddTask from "../AddTask/AddTask"
import SearchIcon from "../../iconComponents/SearchIcon"
import { openTaskDialog, openSearchInput } from "../../store/actions"
import { getIsSearchInputOpen } from "../../store/appReducer"

export default () => {
  const dispatch = useDispatch()
  const isSearchInputOpen = useSelector(getIsSearchInputOpen)

  return (
    <div className={styles.container}>
      {isSearchInputOpen ? (
        <SearchInput />
      ) : (
        <div className={styles.buttonsContainer}>
          <AddTask color={"blue"} onClick={() => dispatch(openTaskDialog())} />
          <button className={styles.btnSearch} onClick={() => dispatch(openSearchInput())}>
            <SearchIcon />
          </button>
        </div>
      )}
    </div>
  )
}
