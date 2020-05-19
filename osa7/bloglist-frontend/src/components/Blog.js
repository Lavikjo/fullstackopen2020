import React from "react"
import { Box, Heading, Link } from "@chakra-ui/core"

const Blog = ({ blog }) => {

  return (
    <Box p={1} shadow="md" borderWidth="1px" textAlign="left">
      <Heading fontSize="lg"><Link href={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link></Heading>
    </Box>

  )
}

export default Blog
