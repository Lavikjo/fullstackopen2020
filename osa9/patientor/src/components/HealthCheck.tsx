import React from "react";
import { Icon, Card, SemanticCOLORS } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import DiagnoseComponent from "./DiagnoseComponent";


const healthRatingIcons: Record<HealthCheckRating, SemanticCOLORS> = {
  [HealthCheckRating.Healthy]: 'green',
  [HealthCheckRating.LowRisk]: 'yellow',
  [HealthCheckRating.HighRisk]: 'orange',
  [HealthCheckRating.CriticalRisk]: 'red'
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="doctor"></Icon> </Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card.Content extra>{<Icon name="heart" color={healthRatingIcons[entry.healthCheckRating]}></Icon>}</Card.Content>
        <DiagnoseComponent codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheck;