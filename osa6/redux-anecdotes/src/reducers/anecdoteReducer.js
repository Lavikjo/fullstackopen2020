import anecdotesService from "../services/anecdotes"

export const vote = (id) => {
  return async dispatch => {
    await anecdotesService.update(id)
    dispatch({
      type: "VOTE",
      data: { id }
    })
  }
}


export const createAnecdote = (data) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(data)
    dispatch( {
      type: "NEW_ANECDOTE",
      data: newAnecdote
    }
    )
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    })
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