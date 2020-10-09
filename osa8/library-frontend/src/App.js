import React, { useState } from "react"
import AuthorEdit from "./components/AuthorEdit"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notification from "./components/Notification"

const App = () => {
  const [page, setPage] = useState("authors")
  const [notification, setNotification] = useState(null)

  const onError = (error) => {
    setNotification(error.message)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("edit")}>edit author</button>
      </div>
      <Notification notification={notification} />
      <Authors
        show={page === "authors"}
        onError={(e) => onError(e)}
      />

      <Books
        show={page === "books"}
        onError={(e) => onError(e)}
      />

      <NewBook
        show={page === "add"}
        onError={(e) => onError(e)}
      />

      <AuthorEdit
        show={page === "edit"}
        onError={(e) => onError(e)}
      />
    </div>
  )
}

export default App
