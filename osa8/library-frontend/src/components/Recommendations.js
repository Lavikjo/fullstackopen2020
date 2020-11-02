import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { FAVORITE_GENRE, ALL_BOOKS } from "../queries"

const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  const [getFavorite] = useLazyQuery(FAVORITE_GENRE, {
    onCompleted: (data) => {
      if (data.me !== null) {
        let favorite = data.me.favoriteGenre

        setFavoriteGenre(favorite)
        getBooks({ variables: { genre: favorite } })
      }
    },
  })

  const [getBooks] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setBooks(data.allBooks)
    },
  })

  useEffect(() => {
    getFavorite()
  }, [getFavorite, props.show])

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Book in your favourite genre <b>{favoriteGenre}</b>
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
    </div>
  )
}

export default Recommendations
