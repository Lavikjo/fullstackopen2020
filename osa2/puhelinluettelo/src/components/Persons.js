import React from "react"
import Person from './Person'

const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person =>
      <Person name={person.name} number={person.number} key={person.name} />)}
    </ul>
  )
}

export default Persons;
