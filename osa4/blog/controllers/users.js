const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    author: 1,
    title: 1,
    likes: 1,
    url: 1,
  })
  response.json(users.map((user) => user.toJSON()))
})

usersRouter.post("/", async (request, response) => {
  const body = request.body
  if (body.password.length < 4 || body.username.length < 4) {
    return response.status(400).json({
      error: "Username and password must be atleast 3 characters long",
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.json(savedUser.toJSON())
})

module.exports = usersRouter
