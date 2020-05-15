import React, { useEffect } from "react"
import Blogs from "./components/Blogs"
import BlogForm from "./components/BlogForm"
import LoggedUser from "./components/LoggedUser"
import LoginForm from "./components/LoginForm"
import Togglable from "./components/Togglable"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import { initializeBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setJWT(user.token)
    }
  }, [dispatch])

  const user = useSelector(state => state.login.user ? state.login.user: null)
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs).sort((a, b) => b.likes - a.likes)
  return (
    <div>
      <Notification notification={notification} />
      {user === null ? (
        <LoginForm/>
      ) : (
        <div>
          <h1>Blogs</h1>
          <LoggedUser user={user}/>
          <Togglable
            buttonLabel="New blog">
            <BlogForm/>
          </Togglable>
          <Blogs
            blogs={blogs}
          />
        </div>
      )}
    </div>
  )
}

export default App
