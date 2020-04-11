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

  test("unique identifier is id", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
  })

  test("add new blog", async () => {
    const newBlog = { author: "testi", title: "kirioitus", likes: 2, url: "www.test.com" }
    await api.post("/api/blogs").send(newBlog).expect(200)
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(newBlogs[2].author).toBe("testi")
  })

  test("missing likes property equals to zero", async () => {
    const newBlog = { author: "testi", title: "kirioitus", url: "www.test.com" }
    await api.post("/api/blogs").send(newBlog).expect(200)
    const newBlogs = await helper.blogsInDb()
    expect(newBlogs[2].likes).toBe(0)
  })

  test("missing title and url returns 400", async () => {
    const newBlog = { author: "testi", likes: 3 }
    await api.post("/api/blogs").send(newBlog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
