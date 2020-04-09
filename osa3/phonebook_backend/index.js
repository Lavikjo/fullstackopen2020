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



app.get("/info", (request, response, next) => {
  Person.find({}).then((persons) => {
    const time = new Date()
    response.send(`<div>Phonebook has info for ${persons.length} persons</div>
    <div>${time}</div>`)
  })
  
})

app.get("/api/persons", (request, response, next) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()))
  })
})

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person.toJSON())
    })
    .catch((error) => next(error)
    )
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.post("/api/persons", (request, response, next) => {
  const body = request.body
  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "Content (name, phonenumber) missing",
    })
  }

  // Check if name already exists
  Person.findOne({"name": body.name})
  .then(result => {
    if(result) {
      return response.status(400).json({
        error: `Person ${result.name} already exist!`,
        id: result.id
      })
    } else {
      // Else create new person
      const person = new Person({
        name: body.name,
        number: body.number,
      })
      person.save().then((savedPerson) => {
        return response.json(savedPerson.toJSON())
      })
    }
  })

  
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
