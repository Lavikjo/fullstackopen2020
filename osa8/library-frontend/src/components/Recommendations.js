import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { FAVORITE_GENRE, ALL_BOOKS } from "../queries"

const Recommendations = (props) => {
  const genre_result = useQuery(FAVORITE_GENRE, {pollInterval: 5000})
  const result = useQuery(ALL_BOOKS, { pollInterval: 2000 })

  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])

 
  useEffect(() => {
    if (genre_result.data) {
        setFavoriteGenre(genre_result.data.me.favoriteGenre)
      }
    if (result.data) {
        setBooks(result.data.allBooks)
    }
    if(favoriteGenre) {
        setFilteredBooks( books.filter((b) => b.genres.includes(favoriteGenre)) )
      } else {
          setFilteredBooks(books)
      }
  }, [result, books, genre_result, favoriteGenre])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <div>Book in your favourite genre {favoriteGenre}</div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
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
    </div>
  )
}

export default Recommendations
