import React, { useState, useEffect } from "react"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import LoggedUser from "./components/LoggedUser"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import blogService from "./services/blogs"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  async function fetchBlogs() {
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const handleUpdate = () => {
    /*
    //NOTE: make copy of array without reference to trigger re-rendering
    const newBlogs = blogs.map((blog) => ({ ...blog }))
    const blogIdx = newBlogs.findIndex((obj) => obj.id === blog.id)
    newBlogs[blogIdx].likes = blog.likes
    setBlogs(newBlogs)
    */
    fetchBlogs()
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setJWT(user.token)
      setUser(user)
    }
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
          <Togglable
            visible={visible}
            toggleVisibility={() => toggleVisibility()}
            buttonLabel="New blog">
            <BlogForm
              blogs={blogs}
              setNotification={(data) => setNotification(data)}
              setBlogs={(data) => setBlogs(data)}
              onSubmit={() => toggleVisibility()}
            />
          </Togglable>
          <Blogs
            blogs={blogs.sort((a, b) => b.likes - a.likes)}
            update={handleUpdate}
          />
        </div>
      )}
    </div>
  )
}

export default App
