export const setToken = (token) => {
  return async dispatch => {
    dispatch({
      type: "SET_TOKEN",
      data: token
    })
  }
}

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

export const removeToken = () => {
  return {
    type: "RESET_TOKEN"
  }
}

const loginReducer = (state = [], action) => {
  switch(action.type) {
  case "SET_TOKEN":
    return { ...state, token: action.data }
  case "SET_USER":
    return { ...state, user: action.data }
  case "RESET_USER":
    return { ...state,  user: null }
  case "RESET_TOKEN":
    return { ...state, token: "" }
  default:
    return state
  }
}

export default loginReducer