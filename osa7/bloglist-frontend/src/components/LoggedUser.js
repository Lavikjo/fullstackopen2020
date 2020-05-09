import React from "react"
import { removeToken, removeUser } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"

const LoggedUser = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div>
      {user.name} logged in{" "}
      <button
        onClick={() => {
          dispatch(removeToken())
          dispatch(removeUser())
          window.localStorage.removeItem("loggedBlogappUser")
        }}>
        logout
      </button>
    </div>
  )
}
export default LoggedUser
