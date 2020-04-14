let token = null
export const setNotification = (notification, timeout) => {

  return async dispatch => {
    // Check if previous notification timer exist and cancel it
    if(token !== null) clearTimeout(token)
    token = null
    token = setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION"
      })
    }, timeout*1e3)
    dispatch({
      type: "SET_NOTIFICATION",
      notification
    })
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}


const notificationReducer = (state = "", action) => {
  switch(action.type) {
  case "SET_NOTIFICATION":
    return action.notification
  case "REMOVE_NOTIFICATION":
    return ""
  default:
    return state
  }
}

export default notificationReducer