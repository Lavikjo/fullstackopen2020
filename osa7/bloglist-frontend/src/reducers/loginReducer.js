export const setUser = (user) => {
  return async dispatch => {
    dispatch({
      type: "SET_USER",
      data: user
    })
  }
}

export const removeUser = () => {
  return {
    type: "RESET_USER"
  }
}

const loginReducer = (state = [], action) => {
  switch(action.type) {
  case "SET_USER":
    return { user: action.data }
  case "RESET_USER":
    return []
  default:
    return state
  }
}

export default loginReducer