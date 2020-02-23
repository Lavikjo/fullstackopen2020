import React from "react"
import Course from "./Course"

const Courses = props => {
  console.log(props)
  return (
    <div>
      {() => props.courses.map(value => 
        <Course course={value} key={value.name}/>)}
    </div>
  )
}

export default Courses
