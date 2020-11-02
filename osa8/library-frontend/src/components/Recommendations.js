import React, { useState, useEffect } from "react"
import { useQuery, useLazyQuery } from "@apollo/client"
import { FAVORITE_GENRE, ALL_BOOKS } from "../queries"

const Recommendations = (props) => {
  const genre_result = useQuery(FAVORITE_GENRE, {pollInterval: 5000})
  

  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  const [getBooks, data] = useLazyQuery(ALL_BOOKS)



  useEffect(() => {
    if (genre_result.data) {
        setFavoriteGenre(genre_result.data.me.favoriteGenre)
       
      }
    if (data.data) {
        setBooks(data.data.allBooks)
    }
    

  }, [data, books, genre_result])

  if (!props.show) {
    return null
  } else {
    getBooks({ variables: {genre: favoriteGenre}})
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
    </div>
  )
          }
}

export default Recommendations
