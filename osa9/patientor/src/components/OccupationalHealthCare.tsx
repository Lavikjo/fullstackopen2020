import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import DiagnoseComponent from "./DiagnoseComponent";

const OccupationalHealthCare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="stethoscope"></Icon> {entry.employerName} </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <DiagnoseComponent codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );

};

export default OccupationalHealthCare;