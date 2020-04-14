import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1
  }
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
    return () => clearTimeout(timerId)
  }, [notification, dispatch])

  if( notification ) {
    return (
      <div style={style}>
        {notification}
      </div>)

  } else
    return null
}

export default Notification