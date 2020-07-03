import React from "react"
import { useDispatch } from "react-redux"

import styles from "./search-input.module.css"
import CloseIcon from "../../iconComponents/CloseIcon"
import { closeSearchInput, setSearchInputValue } from "../../store/actions"

export default () => {
  const dispatch = useDispatch()

  const handleInput = ({ target: { value } }) => dispatch(setSearchInputValue(value.trim()))

  return (
    <div className={styles.container}>
      <input onChange={handleInput} />
      <button onClick={() => dispatch(closeSearchInput())}>
        <CloseIcon />
      </button>
    </div>
  )
}
