const Blog = require("../models/blog")

const initialBlogs = [
  {
    author: "timo",
    title: "kirjoitus",
    likes: 3,
    url: "http://kirjoitus.com",
    _id: "5a422aa71b54a676234d17f8",
    __v: 0,
  },
  {
    author: "simo",
    title: "kiroitus",
    likes: 6,
    url: "http://kiroitus.com",
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    author: "timo",
    title: "kirjoitus",
    likes: 3,
    url: "http://kirjoitus.com",
  })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}