import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
      has {anecdote.votes}
        <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
      </div>
    </div>
  )
}


const AnecdoteList = () => {

  const anecdotes = useSelector(state => state)

  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} />)}
    </>)
}

export default AnecdoteList