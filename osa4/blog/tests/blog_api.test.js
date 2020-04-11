const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const helper = require("./test_helper")

const Blog = require("../models/blog")

const api = supertest(app)

// Ensure constant state before all the tests
beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogs.map((blog) => blog.save())
  await Promise.all(promiseArray)
})
describe("Blog backend", () => {
  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs")

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
