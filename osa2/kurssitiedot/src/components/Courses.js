import React from "react"
import Course from "./Course"

const Courses = props => {
  console.log(props)
  return (
    <div>
      {props.courses.map(value => {
      return ( 
        <Course course={value} key={value.name}/>
        
  )})}
    </div>
  )
}

export default Courses
