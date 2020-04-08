require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

const app = express()
const bodyParser = require("body-parser")

morgan.token("body", function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(express.static("build"))
app.use(bodyParser.json())
app.use(morgan(":method :url :status :response-time ms :body"))
app.use(cors())

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
  Person.find({}).then((persons) => {
    const time = new Date()
    response.send(`<div>Phonebook has info for ${persons.length} persons</div>
    <div>${time}</div>`)
  })
  
})

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()))
  })
})

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person.toJSON())
    })
    .catch(function (error) {
      return response.status(404).end()
    })
})

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id, request.body, function(err, data) {
    if(err)
      return response.status(404).end()
    else
      return response.status(204).end()
  })
})

app.post("/api/persons", (request, response) => {
  const body = request.body
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "Content (name, phonenumber) missing",
    })
  }

  // Check if name already exists
  /*
  const oldPerson = persons.filter((person) => person.name == body.name)
  if (oldPerson.length > 0) {
    return response.status(400).json({
      error: "Person already exist!",
    })
  }
  */
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  person.save().then((savedPerson) => {
    response.json(savedPerson.toJSON())
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
