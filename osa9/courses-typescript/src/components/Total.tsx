import React from "react"
import { PartType } from "../types/types"

const Total: React.FC<{ parts: PartType[] }> = ({ parts }) => {
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
