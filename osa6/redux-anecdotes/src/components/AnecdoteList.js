import React from "react"
import { connect } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ( props ) => {
  return (
    <div>
      <div>
        {props.anecdote.content}
      </div>
      <div>
      has {props.anecdote.votes}
        <button onClick={() => {

          props.vote(props.anecdote.id)
          props.setNotification(`you voted ${props.anecdote.content}`, 5)}}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = ( props ) => {
  const anecdotes = props.anecdotes
  const filteredAnecdotes = anecdotes.filter((el) => el.content.includes(props.filter) ? el : null)
  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} vote={props.vote} setNotification={props.setNotification} />)}
    </>)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {  setNotification, vote }
connect(mapStateToProps, mapDispatchToProps)(Anecdote)
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
