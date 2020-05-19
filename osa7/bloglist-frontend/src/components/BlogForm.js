import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { toggleVisibility } from "../reducers/visibilityReducer"
import { Button, Input, FormControl, FormLabel } from "@chakra-ui/core"

const BlogForm = () => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const dispatch = useDispatch()

  const handleCreation = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url,
      }
      dispatch(createBlog(newBlog))
      setAuthor("")
      setTitle("")
      setUrl("")
      dispatch(toggleVisibility())
      dispatch(setNotification({
        data: newBlog,
        type: "info",
        from: "create",
      }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    } catch (exception) {
      dispatch(setNotification({
        data: exception.response.data.error,
        type: "error",
        from: "create",
      }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <div>
      <form onSubmit={handleCreation}>
        <FormControl>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}></Input>
          <FormLabel htmlFor="author">Author</FormLabel>
          <Input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}></Input>
          <FormLabel htmlFor="url">Url</FormLabel>
          <Input
            type="text"
            value={url}
            id="url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}></Input>
          <Button id="createBlogButton" type="submit">Create</Button>
        </FormControl>
      </form>
    </div>
  )
}

export default BlogForm
