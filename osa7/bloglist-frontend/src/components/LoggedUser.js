import React from "react"
import { removeUser } from "../reducers/loginReducer"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"

const LoggedUser = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div>
      {user.name} logged in{" "}
      <button
        onClick={() => {
          blogService.setJWT(null)
          dispatch(removeUser())
          window.localStorage.removeItem("loggedBlogappUser")
        }}>
        logout
      </button>
    </div>
  )
}
export default LoggedUser