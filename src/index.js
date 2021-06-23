import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { store } from "./configuration/store"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
)
