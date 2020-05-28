import React from 'react';
import Part from './Part';
import { PartType } from "../types/types";

const Content: React.FC<{ parts: PartType[] }> = ({ parts }) => {
    return (
        <div>
            {parts.map((value: PartType) => <Part part={value.name} exercises={value.exerciseCount} key={value.name} />)}
        </div>
    );
};

export default Content