import React, { useState, useEffect } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const AuthorEdit = (props) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, { onError: props.onError })
  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
  const [authors, setAuthors] = useState([])
  const [selection, setSelection] = useState()
  const [year, setYear] = useState("0")

  useEffect(() => {
    if (result.data) {
      setAuthors(result.data.allAuthors)
      setSelection(result.data.allAuthors[0].name)
    }
  }, [result])

  const submit = async (event) => {
    event.preventDefault()
    const yearInt = Number(year)
    editAuthor({ variables: { name: selection, setBornTo: yearInt } })

    setYear("0")
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <h2>Set birthyear</h2>
        <select
          id="author"
          name="author"
          value={selection}
          onChange={({ target }) => setSelection(target.value)}>
          {authors.map((author) => (
            <option value={author.name} key={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorEdit
