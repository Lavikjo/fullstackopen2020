import React from "react"

import { Route, Redirect } from "react-router-dom"
import Navigationbar from "./Navigationbar"
import { Heading } from "@chakra-ui/core"

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
              <Heading as="h1" size="2xl">Blog app</Heading>
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