import React from 'react';
import Part from './Part';
import { CoursePart } from "../types/types";

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
    return (
        <div>
            {parts.map((value: CoursePart) => <Part part={value} key={value.name} />)}
        </div>
    );
};

export default Content