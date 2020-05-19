import React from "react"
import Blog from "./Blog"
import { Stack } from "@chakra-ui/core"

const Blogs = ({ blogs }) => (
  <Stack styleType="none">
    {blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </Stack>
)

export default Blogs
