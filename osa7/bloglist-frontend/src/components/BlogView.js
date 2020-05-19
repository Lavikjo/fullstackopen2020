import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { like, addComment } from "../reducers/blogReducer"


const BlogView = () => {
  const dispatch = useDispatch()
  const [ comment, setComment ] = useState("")
  const { id } = useParams()
  let blog = useSelector(state => state.blogs).filter(blog => blog.id === id)
  if (!blog.length) {
    return null
  } else {
    blog = blog[0]
  }
  const handleComment =  async (event) => {
    event.preventDefault()
    dispatch(addComment(blog, comment))
    setComment("")
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

      <h2>Comments</h2>
      <form onSubmit={handleComment}>
        <input value={comment} onChange={({ target }) => setComment(target.value)}></input>
        <button type="submit"> Add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment}>{comment}</li>)}
      </ul>
    </div>
  )

}

export default BlogView