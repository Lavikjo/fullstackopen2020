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


const visibilityReducer = (state = [], action) => {
  switch(action.type) {
  case "TOGGLE_VISIBILITY":
    return !state.toggleable
  case "TOGGLE_BLOG_VISIBILITY":
    return !state.blogs[action.data.id]
  default:
    return state
  }
}

export default visibilityReducer