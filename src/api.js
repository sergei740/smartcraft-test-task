import { db } from "./firebase"

export const subscribeOnDbChange = (dispatch, action) => {
  db.collection("tasks").onSnapshot(querySnapshot => {
    const tasks = []
    querySnapshot.forEach(doc => {
      tasks.push(doc.data())
    })
    dispatch(action(tasks))
  })
}

export const sendTaskToDb = task => {
  db.collection("tasks")
    .doc(task.id)
    .set(task)
    .then(() => {
      console.log("Document successfully written!")
    })
    .catch(error => {
      console.error("Error writing document: ", error)
    })
}

export const updateTaskInDb = task => {
  db.collection("tasks")
    .doc(task.id)
    .set({ ...task })
}

export const deleteTaskFromDb = task => {
  db.collection("tasks")
    .doc(task.id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!")
    })
    .catch(error => {
      console.error("Error removing document: ", error)
    })
}
