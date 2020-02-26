import React, { useState, useEffect } from "react"
import Persons from "./components/Persons"
import Filter from "./components/Filter"
import personService from "./services/personservice"
import personservice from "./services/personservice"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    personService.getAll().then(response => setPersons(response))
  }, [])

  const addName = event => {
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
      
      personService
        .create(nameObject)
        .then(response => setPersons(persons.concat(response)))
      setNewName("")
      setNewNumber("")
    } else {
      if (
        window.confirm(
          nameObject.name +
            " is already added to phonebook, replace the old number with a new one?"
        )
      ) {
        const oldPerson = persons.filter(person => person.name === nameObject.name)
        personservice
          .update(oldPerson[0].id, nameObject)
          .then(response =>
            setPersons(
              persons.map(person =>
                person.id === response.id ? response : person
              )
            )
          )
      }
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
  const handleDelete = id => {
    setPersons(persons.filter(person => person.id !== id))
    personService.remove(id)
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
      {Array.isArray(persons) && persons.length === 0 ? (
        <div>No persons stored</div>
      ) : (
        <Persons persons={persons} onHandleDelete={handleDelete} />
      )}
    </div>
  )
}

export default App
