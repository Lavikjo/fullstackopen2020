import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "./App"
import store from "./store"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { removeUser } from "./reducers/loginReducer"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"

store.dispatch(removeUser())
store.dispatch(initializeBlogs())
store.dispatch(initializeUsers())

ReactDOM.render(<Provider store={store}> <Router><App /></Router></Provider>, document.getElementById("root"))
