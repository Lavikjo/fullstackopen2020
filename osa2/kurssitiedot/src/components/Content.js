import React from 'react';
import Part from './Part';

const Content = (props) => {
    return (
        <div>
            {props.parts.map(value => <Part part={value.name} exercises={value.exercises} key={value.id}/>)}
        </div>
    )
}

export default Content