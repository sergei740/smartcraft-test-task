import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext } from "react-beautiful-dnd"

import Header from "./components/Header/Header"
import Board from "./components/Board/Board"
import Dialog from "./components/Dialog/Dialog"
import { setTasks } from "./store/actions"
import { getTasks } from "./store/appReducer"
import { subscribeOnDbChange, updateTaskInDb } from "./api"

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector(getTasks)

  useEffect(() => subscribeOnDbChange(dispatch, setTasks), [dispatch])

  const onDragUpdate = result => {
    const { draggableId, destination } = result
    if (!destination) {
      return
    }
    const droppableId = destination.droppableId
    const tasksByDraggableId = tasks.find(task => task.id === draggableId)

    updateTaskInDb({ ...tasksByDraggableId, status: droppableId })
  }

  return (
    <DragDropContext onDragUpdate={onDragUpdate}>
      <div>
        <Dialog />
        <Header />
        <Board />
      </div>
    </DragDropContext>
  )
}

export default App
