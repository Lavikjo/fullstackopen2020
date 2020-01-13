import React, { useState } from "react"
import ReactDOM from "react-dom"

const Button = ({ onClick, text }) => (
  <>
    <button onClick={onClick}>{text}</button>
  </>
)
const Votes = ({ votes }) => (
  <div>
    <p>has {votes} votes</p>
  </div>
)
const MostVotes = ({ anecdotes, votes }) => {
  const maxIdx = votes.indexOf(Math.max(...votes))
  return (
    <div>
      <p>{anecdotes[maxIdx]}</p>
      <p>Has {votes[maxIdx]} votes</p>
    </div>
  )
}
const Header = ({ text }) => <h1>{text}</h1>
const App = props => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(
    Array.apply(null, Array(props.anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  )
  const setAnecdote = () => () =>
    setSelected(Math.floor(Math.random() * props.anecdotes.length))

  const incrementVote = () => () => {
    const temp = [...votes]
    temp[selected] += 1
    return setVotes(temp)
  }
  return (
    <>
      <Header text="Anecdote of the day" />
      <div>{props.anecdotes[selected]}</div>
      <Votes votes={votes[selected]} />
      <div>
        <Button onClick={incrementVote()} text="vote" />
        <Button onClick={setAnecdote()} text="next anecdote" />
      </div>
      <Header text="Anecdote with most votes" />
      <MostVotes anecdotes={props.anecdotes} votes={votes} />
    </>
  )
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"))
