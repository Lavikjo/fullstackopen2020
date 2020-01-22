import React from 'react';

const Total = (props) => {
    let sum = 0;
    for (let value of props.parts) {
        sum = sum + value.exercises
    } 
    return (
        <>
        <p>
            <b>Total of {sum} exercises</b>
        </p>
        </>
    )
}

export default Total