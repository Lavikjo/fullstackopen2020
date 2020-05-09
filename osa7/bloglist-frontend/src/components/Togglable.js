import React from "react"
import PropTypes from "prop-types"
import { toggleVisibility } from "../reducers/visibilityReducer"
import { useDispatch, useSelector } from "react-redux"

const Togglable = (props) => {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.visibility.toggleable)
  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => dispatch(toggleVisibility())}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => dispatch(toggleVisibility())}>Cancel</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
