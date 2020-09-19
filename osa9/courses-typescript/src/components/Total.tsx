import React from "react"
import { CoursePart } from "../types/types"

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  const sum: number = parts.reduce((sum, part) => {
    return sum + part.exerciseCount
  }, 0)

  return (
    <div>
      <p>
        <b>Total of {sum} exercises</b>
      </p>
    </div>
  )
}

export default Total
