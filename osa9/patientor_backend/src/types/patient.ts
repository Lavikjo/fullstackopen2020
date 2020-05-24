export enum Gender { 
  Male = "male",
  Female = "female",
  Other = "other"
} 

export interface Patient {
    id: string
    name: string
    dateOfBirth: string
    ssn: string
    gender: Gender
    occupation: string
  }

export type NewPatientEntry = Omit<Patient, 'id'>;
export type NonSensitivePatient = Omit<Patient, "ssn">;