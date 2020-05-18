import { combineReducers } from "redux"

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

export const toggleLoading = () => {
  return {
    type: "TOGGLE_LOADING"
  }
}

const loading = (state = false, action) => {
  switch(action.type) {
  case "TOGGLE_LOADING":
    return !state
  default:
    return state
  }
}

const user = (state = null, action) => {
  switch(action.type) {
  case "SET_USER":
    return action.data
  case "RESET_USER":
    return null
  default:
    return state
  }
}
const loginReducer = combineReducers({ loading, user })
export default loginReducer