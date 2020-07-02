import React from "react"
import ReactDOM from "react-dom"
import "normalize.css"
import { createStore } from "redux"

import "./index.css"
import App from "./App"
import appReducer from "./store/appReducer"
import { Provider } from "react-redux"

const store = createStore(appReducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)
