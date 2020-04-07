const express = require("express")
const morgan = require('morgan')
const cors = require("cors")

const app = express()
const bodyParser = require("body-parser")

morgan.token('body', function getBody (req) {
  return JSON.stringify(req.body)
})


app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time ms :body'))
app.use(cors())

let persons = []

const generateId = () => {
  /*const maxId = persons.length > 0
      ? Math.max(...persons.map(n => n.id))
      : 0
    return maxId + 1
    */
  /* Why Math.random, better solution would be
    import { v4 as uuidv4 } from 'uuid';
    const uuid = uuidv4();
    return uuid
   */
  const id = Math.random() * Number.MAX_SAFE_INTEGER
  return id
}

app.get("/info", (request, response) => {
  const len = persons.length
  const time = new Date()
  response.send(`<div>Phonebook has info for ${len} persons</div>
    <div>${time}</div>`)
})

app.get("/api/persons", (request, response) => {
  response.json(persons)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = persons.filter((person) => person.id === id)

  if (person === null) return response.status(404).end()
  else response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const newPersons = persons.filter((person) => person.id !== id)
  console.log(newPersons)
  console.log(persons)
  console.log(newPersons === persons)
  if (newPersons === persons)
    //Nothing was deleted, return 404
    return response.status(404).end()
  else return response.status(204).end()
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  console.log(body)
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "Content (name, phonenumber) missing",
    })
  }

  // Check if name already exists
  const oldPerson = persons.filter((person) => person.name == body.name)
  if(oldPerson.length > 0) {
    return response.status(400).json({
      error: "Person already exist!"
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
