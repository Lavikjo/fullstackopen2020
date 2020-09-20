import React from "react";
import { Icon, Card } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import DiagnoseComponent from "./DiagnoseComponent";

const HospitalEntryComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="hospital"></Icon> </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Content extra>{entry.discharge.date} {entry.discharge.criteria}</Card.Content>
        <DiagnoseComponent codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );

};

export default HospitalEntryComponent;

