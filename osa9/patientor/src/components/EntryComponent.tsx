import React from "react";
import { Entry } from "../types";

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry === undefined) return null;
  return (
    <>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </>
  );
};

export default EntryComponent;