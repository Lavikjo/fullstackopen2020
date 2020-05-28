import React from 'react';

const Part: React.FC<{ part: string; exercises: number }> = ({ part, exercises }) => {
    return (
        <>
            <p>
                {part} {exercises}
            </p>
        </>
    );
};

export default Part