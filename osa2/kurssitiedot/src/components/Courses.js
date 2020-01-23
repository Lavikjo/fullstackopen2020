import React from "react"
import Course from "./Course"

const Courses = props => {
  console.log(props)
  return (
    <div>
      {props.courses.map(value => <Course course={value} />
      )}
    </div>
  )
}

export default Courses
