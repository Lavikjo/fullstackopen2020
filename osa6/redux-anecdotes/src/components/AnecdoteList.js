import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
      has {anecdote.votes}
        <button onClick={() => {
          dispatch(vote(anecdote.id))
          dispatch(setNotification(`you voted ${anecdote.content}`, 5))}}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const filteredAnecdotes = anecdotes.filter((el) => el.content.includes(filter) ? el : null)
  return (
    <>
      {filteredAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </>)
}

export default AnecdoteList