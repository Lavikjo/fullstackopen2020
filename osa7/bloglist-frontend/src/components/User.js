import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
  const { id } = useParams()
  let user = useSelector(state => state.users).filter(user => user.id === id)
  if (!user.length) {
    return null
  } else {
    user = user[0]
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <b>Added blogs</b>
      <ul>
        {user.blogs.map((blog) =>
          <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>

  )
}

export default User