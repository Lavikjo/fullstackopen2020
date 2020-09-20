import { RouteComponentProps } from 'react-router-dom';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

interface MatchParams {
  id: string;
}

export type MatchProps = RouteComponentProps<MatchParams>;