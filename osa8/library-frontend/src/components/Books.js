import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

  const removeItem = (arr, val) => {
    return arr.filter(item => item !== val)} 

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      books.map((b) => b.genres.every((val) => genres.includes(val) ? null : setGenres(genres.concat(val))))
    }
    if(filter.length === 0) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks( books.filter((b) => filter.some((g) => b.genres.includes(g))))
    }
  }, [result, genres, books, filter])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
              <td>{a.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => filter.includes(g) ? setFilter(removeItem(filter,g)) : setFilter(filter.concat(g))}>{g}</button>
      ))}
      <button onClick={() => setFilter([])}>all genres</button>
    </div>
  )
}

export default Books
