import React from "react"
import Person from "./Person"

const Filter = ({ persons, filter }) => {
  if (!filter) return null
  return (
    <ul>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(person => (
          <Person name={person.name} number={person.number} key={person.name} />
        ))}
    </ul>
  )
}

export default Filter
