import React from "react"

const Notification = ({ notification }) => {
  if (notification == null) return null

  return <div style={{color: 'red'}}>{notification}</div>
}

export default Notification
