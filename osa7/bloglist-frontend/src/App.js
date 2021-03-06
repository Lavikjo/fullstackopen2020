import React, { useEffect } from "react"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import blogService from "./services/blogs"
import BlogView from "./components/BlogView"
import User from "./components/User"
import Users from "./components/Users"
import { initializeBlogs } from "./reducers/blogReducer"
import { initializeUsers } from "./reducers/usersReducer"
import { setUser, toggleLoading } from "./reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"
import {
  Switch, Route
} from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"
import MainView from "./components/MainView"
import { Box } from "@chakra-ui/core"




const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUser) {
      dispatch(toggleLoading())
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setJWT(user.token)
      dispatch(toggleLoading())
    }
  }, [dispatch])

  const user = useSelector(state => state.login.user)
  const loading = useSelector(state => state.login.loading)
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs).sort((a, b) => b.likes - a.likes)
  const users = useSelector(state => state.users)

  return (
    <Box
      width= {[
        "100%", // base
        "90%", // 480px upwards
        "50%", // 768px upwards
        "40%", // 992px upwards
      ]}
      style={{ margin: "0 auto" }}>
      <Notification notification={notification} />
      <Switch>
        <ProtectedRoute path="/blogs/:id" component={BlogView} loggedUser={user} loading={loading}/>

        <ProtectedRoute path="/users/:id" component={User} loggedUser={user} loading={loading}/>

        <ProtectedRoute path="/users" component={Users} users={users} loggedUser={user} loading={loading}/>

        <Route path="/login">
          {user === null && !window.localStorage.getItem("loggedBlogappUser") ? <LoginForm/>: <div>loading...</div>}
        </Route>

        <ProtectedRoute path="/" component={MainView} blogs={blogs} loggedUser={user} loading={loading}/>

      </Switch>

    </Box>
  )
}

export default App
