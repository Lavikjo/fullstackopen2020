export const setNotification = (notification) => {
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: notification
    })
  }
}

export const removeNotification = () => {
  return {
    type: "REMOVE_NOTIFICATION"
  }
}

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case "SET_NOTIFICATION":
    return action.data
  case "REMOVE_NOTIFICATION":
    return null
  default:
    return state
  }
}

export default notificationReducer