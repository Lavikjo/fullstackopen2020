import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";


const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses },] = useStateValue();
  if (entry === undefined) return null;
  return (
    <>
      <p>{entry.date} {entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code} {diagnoses[code]?.name}</li>
        ))}
      </ul>
    </>
  );
};

export default EntryComponent;