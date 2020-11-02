import React, { useState } from "react"
import AuthorEdit from "./components/AuthorEdit"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notification from "./components/Notification"
import LoginForm from "./components/Login"
import Recommendations from "./components/Recommendations"
import { useApolloClient } from "@apollo/client"

const App = () => {
  const [page, setPage] = useState("authors")
  const [notification, setNotification] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const onError = (error) => {
    setNotification(error.message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? (
          <>
            {" "}
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("edit")}>edit author</button>{" "}
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>
      <Notification notification={notification} />
      <Authors show={page === "authors"} onError={(e) => onError(e)} />

      <Books show={page === "books"} onError={(e) => onError(e)} />

      <NewBook show={page === "add"} onError={(e) => onError(e)} />

      <AuthorEdit show={page === "edit"} onError={(e) => onError(e)} />

      <Recommendations
        show={page === "recommend"}
        onError={(e) => onError(e)}
      />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        onError={(e) => onError(e)}
      />
    </div>
  )
}

export default App
