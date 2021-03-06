/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatientEntry, Gender, Entry } from '../types/patient';


// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const toNewPatient = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries),
  };
  
  return newEntry;
}; 

const isEntry = (entry: any): entry is Entry[] => {
  return typeof entry === 'object' || entry instanceof Array;
};

export const isValidEntryType = (entry: string): entry is string => {
  if (typeof entry === 'string' && (entry === 'HealthCheck' 
  || entry === 'OccupationalHealthcare' || entry === 'Hospital')) {
    return true;
  } else {
    return false;
  }
};

export const requiredEntryFields = (entry: Entry): boolean => {
  switch(entry.type) {
    case "Hospital":
      return 'discharge' in entry && 'date' in entry.discharge && 'criteria' in entry.discharge;
    case "OccupationalHealthcare":
      return 'sickLeave' in entry && 'startDate' in entry.sickLeave && 'endDate' in entry.sickLeave;
    case "HealthCheck":
      return 'healthCheckRating' in entry;
  }
};

const parseEntries = (entry: any): Entry[] => {
  if (!entry || !isEntry(entry)){
    throw new Error("Incorrect Entry" + entry);
  } else if (entry.length === 0) {
    return [];
  }

  return entry;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing birthdate: ' + date);
  }
  return date;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  } 
  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }

  return ssn;
};

export default toNewPatient;