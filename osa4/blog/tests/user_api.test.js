const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const User = require("../models/user")

const api = supertest(app)

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash })

    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "t1m0",
      name: "timo",
      password: "kissatkoiria",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "root",
      name: "supertimo",
      password: "salasana",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("`username` to be unique")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

beforeEach(async () => {
  await User.deleteMany({})
})

describe("validity of username and password", () => {
  test("username too short", async () => {
    const newUser = {
      username: "ro",
      name: "supertimo",
      password: "salasana",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain(
      "Username and password must be atleast 3 characters long"
    )
  })

  test("password too short", async () => {
    const newUser = {
      username: "timoo",
      name: "dfdf",
      password: "xi",
    }

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain(
      "Username and password must be atleast 3 characters long"
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})
