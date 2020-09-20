import React from "react";
import { Entry } from "../types";
import HealthCheck from "./HealthCheck";
import HospitalEntryComponent from "./HospitalEntryComponent";
import OccupationalHealthCare from "./OccupationalHealthCare";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryComponent: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry === undefined) return null;

  switch (entry.type) {

    case "Hospital":
      return <HospitalEntryComponent entry={entry}></HospitalEntryComponent>;
    case "HealthCheck":
      return <HealthCheck entry={entry}></HealthCheck>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCare entry={entry}></OccupationalHealthCare>;
    default:
      return assertNever(entry);
  }
};

export default EntryComponent;