import React from "react"
import { removeUser } from "../reducers/loginReducer"
import blogService from "../services/blogs"
import { useDispatch } from "react-redux"
import { Button } from "@chakra-ui/core"

const LoggedUser = ({ user, style }) => {
  const dispatch = useDispatch()
  if (user === null) return null
  return (
    <span style={style}>
      {user.name} logged in{" "}
      <Button
        onClick={() => {
          blogService.setJWT(null)
          dispatch(removeUser())
          window.localStorage.removeItem("loggedBlogappUser")
        }}>
        logout
      </Button>
    </span>
  )
}
export default LoggedUser
