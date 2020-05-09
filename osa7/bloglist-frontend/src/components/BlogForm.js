import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { toggleVisibility } from "../reducers/visibilityReducer"

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
        <div>
          title:
          <input
            type="text"
            value={title}
            id="title"
            name="title"
            onChange={({ target }) => setTitle(target.value)}></input>
        </div>
        <div>
          author:
          <input
            type="text"
            value={author}
            id="author"
            name="author"
            onChange={({ target }) => setAuthor(target.value)}></input>
        </div>
        <div>
          url:
          <input
            type="text"
            value={url}
            id="url"
            name="url"
            onChange={({ target }) => setUrl(target.value)}></input>
        </div>
        <button id="createBlogButton" type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
