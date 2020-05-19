import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"
import { setUser } from "../reducers/loginReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Button, Input, FormControl, Heading, FormLabel } from "@chakra-ui/core"

const LoginForm = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const dispatch = useDispatch()
  const history = useHistory()

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      dispatch(setUser(user))
      blogService.setJWT(user.token)
      history.push("/")
    } catch (exception) {
      dispatch(setNotification({
        data: exception.response.data.error,
        type: "error",
        from: "login",
      }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }
  }

  return (
    <form onSubmit={loginHandler}>
      <FormControl >
        <Heading as="h2" size="xl">Login to Blog app</Heading>
        <FormLabel htmlFor="username">Username</FormLabel>
        <Input
          type="text"
          value={username}
          name="Username"
          id="usernameInput"
          onChange={({ target }) => setUsername(target.value)}
        />

        <FormLabel>password</FormLabel>
        <Input
          type="password"
          value={password}
          name="Password"
          id="passwordInput"
          onChange={({ target }) => setPassword(target.value)}
        />
        <Button id="loginButton" type="submit">Login</Button>
      </FormControl>
    </form>

  )
}

export default LoginForm
