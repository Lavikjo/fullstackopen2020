import React from "react"

import { Route, Redirect } from "react-router-dom"
import Navigationbar from "./Navigationbar"

const ProtectedRoute = ({ component: Component, loggedUser, loading,  ...rest }) => {
  return (
    <Route {...rest} render={
      props => {
        if (loggedUser === null && !loading && !window.localStorage.getItem("loggedBlogappUser")) {
          return <Redirect to="/login"/>
        } else {
          return (
            <>
              <Navigationbar loggedUser={loggedUser} />
              <h1>Blog app</h1>
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