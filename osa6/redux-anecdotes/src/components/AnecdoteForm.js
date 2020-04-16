import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = ( props ) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ""
    props.createAnecdote(content)
    props.setNotification(`Created anecdote ${content}`, 5)
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

const mapDispatchToProps = {  setNotification, createAnecdote }
export default connect(null, mapDispatchToProps)(AnecdoteForm)