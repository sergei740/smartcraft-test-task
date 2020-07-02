import React, { useEffect } from "react"
import { useDispatch } from "react-redux"

import Header from "./components/Header/Header"
import Board from "./components/Board/Board"
import Dialog from "./components/Dialog/Dialog"
import { getTasks } from "./store/actions"
import { subscribeOnDbChange } from "./api"

function App() {
  const dispatch = useDispatch()

  useEffect(() => subscribeOnDbChange(dispatch, getTasks), [dispatch])

  return (
    <div>
      <Dialog />
      <Header />
      <Board />
    </div>
  )
}

export default App
