import { combineReducers } from "redux"

export const toggleVisibility = () => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_VISIBILITY"
    })
  }
}

export const toggleBlogVisibility = (id) => {
  return async dispatch => {
    dispatch({
      type: "TOGGLE_BLOG_VISIBILITY",
      data: { id }
    })
  }
}

const toggleable = (state = false, action) => {
  switch(action.type) {
  case "TOGGLE_VISIBILITY":
    return !state
  default:
    return state
  }
}


const blogs = (state = {}, action) => {
  switch(action.type) {
  case "TOGGLE_BLOG_VISIBILITY":
    return { ...state, [action.data.id] : !state[action.data.id] }
  default:
    return state
  }
}

const visibilityReducer = combineReducers({ toggleable, blogs })

export default visibilityReducer