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
import { ThemeProvider } from "@chakra-ui/core"
import { theme } from "@chakra-ui/core"

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
}

store.dispatch(removeUser())
store.dispatch(initializeBlogs())
store.dispatch(initializeUsers())

ReactDOM.render(<Provider store={store}> <Router><ThemeProvider theme={customTheme}><App /></ThemeProvider></Router></Provider>, document.getElementById("root"))
