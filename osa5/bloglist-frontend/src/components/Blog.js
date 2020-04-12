import React, { useState } from "react"
import blogService from "../services/blogs"
const Blog = ({ blog, update }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonText = visible ? "hide" : "view"
  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{buttonText}</button>
        <div>{visible ? blog.url : null}</div>
        <div>
          {visible ? blog.likes : null}
          {visible ? (
            <button
              onClick={async () => {
                await blogService.update(blog.id, {
                  title: blog.title,
                  likes: blog.likes + 1,
                  author: blog.author,
                  url: blog.url,
                  user: blog.user.id,
                })
                update()
              }}>
              Like
            </button>
          ) : null}
        </div>
        <div>{visible ? blog.user.name : null}</div>
        <div>
          {visible &&
          blog.user.username ===
            JSON.parse(window.localStorage.getItem("loggedBlogappUser"))
              .username ? (
              <button
                onClick={async () => {
                  if (
                    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
                  ) {
                    await blogService.remove(blog.id)
                    update()
                  }
                }}>
              Delete
              </button>
            ) : null}
        </div>
      </div>
    </>
  )
}

export default Blog
