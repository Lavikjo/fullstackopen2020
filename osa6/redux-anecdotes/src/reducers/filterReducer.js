export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    filter
  }
}
export const resetFilter = () => {
  return {
    type: "RESET_FILTER"
  }
}

const filterReducer = (state = "", action) => {
  switch(action.type) {
  case "SET_FILTER":
    return action.filter
  case "RESET_FILTER":
    return ""
  default:
    return state
  }
}

export default filterReducer