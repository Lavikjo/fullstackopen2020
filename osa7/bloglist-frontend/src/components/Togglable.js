import React from "react"
import PropTypes from "prop-types"
import { toggleVisibility } from "../reducers/visibilityReducer"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "@chakra-ui/core"

const Togglable = (props) => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.visibility.toggleable)
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }
  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={() => dispatch(toggleVisibility())}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={() => dispatch(toggleVisibility())}>Cancel</Button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
