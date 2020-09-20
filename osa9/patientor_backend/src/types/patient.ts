import { Diagnosis } from "./diagnose";

export enum Gender { 
  Male = "male",
  Female = "female",
  Other = "other"
} 

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface Sickleave {
  startDate: string,
  endDate: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string
  sickLeave: Sickleave;
}

interface Discharge {
  date: string,
  criteria: string
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
  }

export type NewPatientEntry = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;