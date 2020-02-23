import React, { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = event => {
    console.log(newName)
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }

    // Check if person with same name already exists
    if (
      !persons.some(
        element =>
          element.name === nameObject.name ||
          element.number === nameObject.number
      )
    ) {
      setPersons(persons.concat(nameObject))
      setNewName("")
      setNewNumber("")
    } else {
      window.alert(nameObject.name + " is already added to phonebook!")
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberChange = event => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = event => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter by name:{" "}
        <input value={newFilter} onChange={handleFilterChange} />
      </div>
      <Filter persons={persons} filter={newFilter}></Filter>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}

export default App
