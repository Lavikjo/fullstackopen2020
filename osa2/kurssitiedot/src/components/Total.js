import React from "react"

const Total = props => {
  const sum = props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <>
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    </>
  )
}

export default Total
