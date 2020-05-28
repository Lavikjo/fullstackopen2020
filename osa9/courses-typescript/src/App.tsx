import React from "react";
import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";
import { PartType } from "./types/types";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: PartType[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
