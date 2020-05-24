import { patients } from '../../data/entries';
import { Patient, NonSensitivePatient, NewPatientEntry } from '../types/patient';
import { v4 as uuidv4} from 'uuid';

const getEntries = () : Patient[] => {
  return patients;
}; 

const getNonSensitiveEntries = (): NonSensitivePatient [] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
  ({  id, name, dateOfBirth, gender, occupation,  }));};

const addPatient = ( entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
}; 

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById
};