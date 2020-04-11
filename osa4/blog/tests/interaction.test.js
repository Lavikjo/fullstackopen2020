const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const Blog = require("../models/blog")
const User = require("../models/user")

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
})

describe("blog and user interaction", () => {
  test("New blog has user attached to it", async () => {
    const newUser = {
      name: "timo",
      username: "t1m0",
      password: "kissatkoiria",
    }

    const response = await api.post("/api/users").send(newUser)
    const id = response.body.id

    const newBlog = {
      author: "jeesus",
      title: "raamattu",
      user: id,
      url: "www.test.com",
    }

    const res = await api.post("/api/blogs").send(newBlog).expect(200)
    expect(res.body.user).toBe(id)

    // Test that users are correctly populated
    const populateRes = await api.get("/api/blogs")
    expect(populateRes.body[0].user.username).toBe(newUser.username)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
