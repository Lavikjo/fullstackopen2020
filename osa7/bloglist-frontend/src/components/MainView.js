import React from "react"
import Blogs from "./Blogs"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"

const MainView = ( { blogs }) => {
  return (
    <>
      <Togglable
        buttonLabel="New blog">
        <BlogForm/>
      </Togglable>
      <Blogs
        blogs={blogs}
      />

    </>
  )

}

export default MainView