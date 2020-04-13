import React, { useState } from "react"
import blogService from "../services/blogs"

const BlogForm = ({ setNotification, onSubmit, update }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleCreation = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url,
      }
      const response = await blogService.create(newBlog)
      update()
      setAuthor("")
      setTitle("")
      setUrl("")
      onSubmit()
      setNotification({
        data: response,
        type: "info",
        from: "create",
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setNotification({
        data: exception.response.data.error,
        type: "error",
        from: "create",
      })
      setTimeout(() => {
        setNotification(null)
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
