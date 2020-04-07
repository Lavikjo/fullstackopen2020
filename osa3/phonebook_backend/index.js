const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.use(cors());

let persons = []

const generateId = () => {
    const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.get('/info', (request, response) => {
    const len = persons.length
    const time = new Date()
    response.send(`<div>Phonebook has info for ${len} persons</div>
    <div>${time}</div>`)
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(person => person.id === id)

    if(person === null) 
      return response.status(404).end()
    else
      response.json(person)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const newPersons = persons.filter(person => person.id !== id)
    console.log(newPersons)
    console.log(persons)
    console.log(newPersons === persons)
    if(newPersons === persons)
      //Nothing was deleted, return 404
      return response.status(404).end()
    else
      return response.status(204).end()
      
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    if (!body.name && !body.number) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

  const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})