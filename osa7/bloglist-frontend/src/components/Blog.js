import React from "react"
import { like, removeBlog } from "../reducers/blogReducer"
import { toggleBlogVisibility } from "../reducers/visibilityReducer"
import { useDispatch, useSelector } from "react-redux"


const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const visible = useSelector(state => state.visibility.blogs[blog.id])
  const dispatch = useDispatch()

  const buttonText = visible ? "hide" : "view"
  return (
    <>
      <div style={blogStyle} className="blog">
        {blog.title} {blog.author}{" "}
        <button onClick={() => dispatch(toggleBlogVisibility(blog.id))}>{buttonText}</button>
        <div>{visible ? blog.url : null}</div>
        <div>
          {visible ? blog.likes : null}
          {visible ? (
            <button className="likeButton"
              onClick={() => dispatch(like(blog))
              }>
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
                    dispatch(removeBlog(blog.id))
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
