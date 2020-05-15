import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"
import { removeUser } from "./reducers/loginReducer"
import "./index.css"

store.dispatch(removeUser())

ReactDOM.render(<Provider store={store}> <App /></Provider>, document.getElementById("root"))
