import React from "react"
import blogService from "../services/blogs"

const LoggedUser = ({ user, callback }) => {
  return (
    <div>
      {user.name} logged in{" "}
      <button
        onClick={() => {
          callback()
          blogService.setJWT(null)
          window.localStorage.removeItem("loggedBlogappUser")
        }}>
        logout
      </button>
    </div>
  )
}
export default LoggedUser
