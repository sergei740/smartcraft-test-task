import { db } from "./firebase"
import makeId from "./makeId"

export const subscribeOnDbChange = (dispatch, action) => {
  db.collection("tasks").onSnapshot(function (querySnapshot) {
    const tasks = []
    querySnapshot.forEach(function (doc) {
      tasks.push(doc.data())
    })
    dispatch(action(tasks))
  })
}

export const sendTaskToDb = task => {
  const id = makeId(20)

  db.collection("tasks")
    .doc(id)
    .set(task)
    .then(function () {
      console.log("Document successfully written!")
    })
    .catch(function (error) {
      console.error("Error writing document: ", error)
    })
}
