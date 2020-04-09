const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator');

const url = process.env.MONGODB_URL


mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false , useCreateIndex: true})
  .then((result) => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
    uniqueCaseInsensitive: true
  },
  number: { 
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    },
  })

  module.exports = mongoose.model('Person', personSchema)