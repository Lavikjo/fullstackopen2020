import React, { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

const LoginForm = (props) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.onError(error)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem("library-user-token", token)
    }
  }, [result.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }
  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username: name, password } })
    setName("")
    setPassword("")
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
