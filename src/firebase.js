import firebase from "firebase/app"
import "firebase/firestore" 

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyBmfGs-LdwZ69fEswsSFdWtpZsH_VszLaY",
  authDomain: "smartcraft-test-task.firebaseapp.com",
  projectId: "smartcraft-test-task",
})

const db = firebase.firestore()

export { db }
