import React from 'react'
import ReactDOM from 'react-dom'
  
const Header = (props) => {
    return (
    <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    return (
    <>
    <p>
            {props.part} {props.exercises}
    </p>
    </>
    )
}

const Content = (props) => {
    return (
        <div>
            {props.parts.map(value => <Part part={value.name} exercises={value.exercises}/>)}
        </div>
    )
}

const Total = (props) => {
    let sum = 0;
    for (let value of props.parts) {
        sum = sum + value.exercises
    } 
    return (
        <>
        <p>
            Number of exercises {sum}
        </p>
        </>
    )
}
const App = () => {
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]

    return (
      <div>
        <Header course={course} />
        <Content parts={parts}  />
        <Total parts={parts} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))