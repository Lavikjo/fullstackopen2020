import React, { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import LoggedUser from "./components/LoggedUser"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
    async function fetchBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])

  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm
          setUser={(user) => setUser(user)}
          setNotification={(data) => setNotification(data)}
        />
      ) : (
        <div>
          <h1>Blogs</h1>
          <LoggedUser user={user} callback={() => setUser(null)} />
          <Blogs blogs={blogs} />
        </div>
      )}
    </div>
  )
}

export default App
