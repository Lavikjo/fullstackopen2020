import React, { useState, useEffect, useCallback } from "react"
import { useLazyQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState(new Set())
  const [filter, setFilter] = useState(null)

  const union = (setA, setB) => {
    let _union = new Set(setA)
    for (let elem of setB) {
      _union.add(elem)
    }
    return _union
  }
  const [getBooks] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
      const tempGenres = new Set()
      data.allBooks.forEach((b) => b.genres.forEach((v) => tempGenres.add(v)))
      setGenres(union(genres, tempGenres))
    },
  })
  const fetchBooks = useCallback(
    (genre) => {
      setFilter(genre)
      return getBooks({ variables: { genre } })
    },
    [getBooks]
  )
  useEffect(() => {
    fetchBooks()
  }, [fetchBooks])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>books</h2>
      <div>
        Currently filtering by genre: <b>{filter}</b>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {[...genres].map((value) => (
        <button key={value} onClick={() => fetchBooks(value)}>
          {value}
        </button>
      ))}
      <button onClick={() => fetchBooks()}>all genres</button>
    </div>
  )
}

export default Books
