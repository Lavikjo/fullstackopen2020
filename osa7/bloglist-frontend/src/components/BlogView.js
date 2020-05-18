import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { like } from "../reducers/blogReducer"


const BlogView = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  let blog = useSelector(state => state.blogs).filter(blog => blog.id === id)
  if (!blog.length) {
    return null
  } else {
    blog = blog[0]
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>{blog.url}</div>
      <div>{blog.likes} likes</div>
      <button className="likeButton"
        onClick={() => dispatch(like(blog))
        }>
              Like
      </button>
      <div>Added by {blog.user.name}</div>
    </div>
  )

}

export default BlogView