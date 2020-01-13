import React, { useState } from "react"
import ReactDOM from "react-dom"

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}> {text} </button>
)
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const count = good + neutral + bad
  const score = good + neutral * 0 + bad * -1
  const avg = score / 3
  const positive = (good / count) * 100

  if (good !== 0 || neutral !== 0 || bad !== 0) {
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={count} />
          <Statistic text="average" value={avg} />
          <Statistic text="positive" value={positive + " %"} />
        </tbody>
      </table>
    )
  }
  return <div>No feedback given</div>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGood = () => () => setGood(good + 1)

  const handleNeutral = () => () => setNeutral(neutral + 1)

  const handleBad = () => () => setBad(bad + 1)

  return (
    <div>
      <Header text="give feedback" />
      <div>
        <Button onClick={handleGood()} text="good" />
        <Button onClick={handleNeutral()} text="neutral" />
        <Button onClick={handleBad()} text="bad" />
      </div>
      <Header text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
