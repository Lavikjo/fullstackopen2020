import React from "react"
import LoggedUser from "./LoggedUser"
import { Route, Redirect } from "react-router-dom"

const ProtectedRoute = ({ component: Component, loggedUser, loading,  ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (loggedUser === null && !loading && !window.localStorage.getItem("loggedBlogappUser")) {
          return <Redirect to="/login"/>
        } else {
          return (
            <>
              <h1>Blogs</h1>
              <LoggedUser user={loggedUser}/>
              <Component  {...rest} {...props}/>
            </>
          )
        }
      }
    }
    />

  )

}

export default ProtectedRoute