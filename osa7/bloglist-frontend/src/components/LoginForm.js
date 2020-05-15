import React, { useState } from "react"
import loginService from "../services/login"
import { setUser } from "../reducers/loginReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const LoginForm = () => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const dispatch = useDispatch()

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      console.log(username, password)
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      dispatch(setUser(user))
    } catch (exception) {
      console.log(exception)
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
      <h1>Login to Blog app</h1>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="usernameInput"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="passwordInput"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="loginButton" type="submit">Login</button>
    </form>
  )
}

export default LoginForm
