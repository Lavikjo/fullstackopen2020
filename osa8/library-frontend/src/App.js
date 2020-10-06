import React, { useState } from "react"
import AuthorEdit from "./components/AuthorEdit"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"

const App = () => {
  const [page, setPage] = useState("authors")

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("edit")}>edit author</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <AuthorEdit show={page === "edit"} />
    </div>
  )
}

export default App
