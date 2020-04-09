const config = require('./utils/config')
const express = require('express')
const morgan = require("morgan")
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

morgan.token("body", function getBody(req) {
    return JSON.stringify(req.body)
  })

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: false})
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(":method :url :status :response-time ms :body"))

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app