import React from 'react';

const Part = (props) => {
    return (
    <>
    <p>
           {props.id} {props.part} {props.exercises}
    </p>
    </>
    )
}

export default Part