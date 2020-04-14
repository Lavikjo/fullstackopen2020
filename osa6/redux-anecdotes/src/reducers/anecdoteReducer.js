export const vote = (id) => {
  return {
    type: "VOTE",
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: "NEW_ANECDOTE",
    data
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
  case "VOTE": {
    const anecdote = state.find(el => el.id === action.data.id)
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    return state.map(el => el.id !== action.data.id ? el : newAnecdote)
  }
  case "NEW_ANECDOTE":
    return [action.data, ...state]
  case "INIT_ANECDOTES":
    return action.data
  default:
    return state
  }
}

export default anecdoteReducer