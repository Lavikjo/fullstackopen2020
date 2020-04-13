import React from "react"
import PropTypes from "prop-types"

const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? "none" : "" }
  const showWhenVisible = { display: props.visible ? "" : "none" }
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={props.toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={props.toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
