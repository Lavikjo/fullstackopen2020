import React from "react"
import Person from "./Person"

const Persons = ({ persons, onHandleDelete }) => {
  if (Array.isArray(persons) && persons.length === 0)
    return <div>Loading persons</div>
  else
    return (
      <ul>
        {persons.map(person => (
          <Person
            name={person.name}
            number={person.number}
            key={person.name}
            onHandleDelete={() => onHandleDelete(person.id)}
          />
        ))}
      </ul>
    )
}

export default Persons
