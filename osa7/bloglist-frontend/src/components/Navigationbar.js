import { Link as RouterLink } from "react-router-dom"
import LoggedUser from "./LoggedUser"
import React from "react"
import { Flex, Link } from "@chakra-ui/core"

const Navigationbar = ({ loggedUser }) => {
  return (
    <Flex bg="#bdc3c7" flexDirection="row" alignItems="center">
      <Link style={{ margin: "0 1rem", fontSize: "24px" }} as={RouterLink} to="/">blogs</Link>
      <Link style={{ margin: "0 1rem", fontSize: "24px" }} as={RouterLink} to="/users">users</Link>
      <LoggedUser style={{ marginLeft: "auto" }} user={loggedUser}/>
    </Flex>

  )
}

export default Navigationbar