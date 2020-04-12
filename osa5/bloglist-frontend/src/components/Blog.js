import React, { useState } from "react"
const Blog = ({ blog }) => {
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
      <div style={blogStyle}>
        {blog.title} {blog.author}{" "}
        <button onClick={toggleVisibility}>{buttonText}</button>
        <div>{visible ? blog.url : null}</div>
        <div>
          {visible ? blog.likes : null}
          {visible ? <button>Like</button> : null}
        </div>
        <div>{visible ? blog.user.name : null}</div>
      </div>
    </>
  )
}

export default Blog
