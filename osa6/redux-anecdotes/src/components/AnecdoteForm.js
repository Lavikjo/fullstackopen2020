import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Create new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="content"/></div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm