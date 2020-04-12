import React, { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({ setUser, setNotification }) => {
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setJWT(user.token)
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      setUser(user)
    } catch (exception) {
      setNotification({
        data: exception.response.data.error,
        type: "error",
        from: "login",
      })
      setTimeout(() => {
        setNotification(null)
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
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
