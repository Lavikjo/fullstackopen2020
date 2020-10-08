import React, { useState, useEffect } from "react"
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, { pollInterval: 2000 })
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    if (result.data) {
      console.log(result.data)
      setAuthors(result.data.allAuthors)
    }
  }, [result])
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
