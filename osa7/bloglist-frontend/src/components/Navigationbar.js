import { Link } from "react-router-dom"
import LoggedUser from "./LoggedUser"
import React from "react"

const Navigationbar = ({ loggedUser }) => {
  const style = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={style} to="/">blogs</Link>
      <Link style={style} to="/users">users</Link>
      <LoggedUser user={loggedUser}/>
    </div>

  )
}

export default Navigationbar