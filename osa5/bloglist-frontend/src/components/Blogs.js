import React from "react"
import Blog from "./Blog"

const Blogs = ({ blogs, update }) => (
  <div>
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} update={update} />
    ))}
  </div>
)

export default Blogs
