import { patients } from '../../data/entries';
import { Patient, NonSensitivePatient, NewPatientEntry, Entry } from '../types/patient';
import { v4 as uuidv4} from 'uuid';
import { isValidEntryType, requiredEntryFields } from '../utils/utils';

const getEntries = () : Patient[] => {
  return patients;
}; 

const getNonSensitiveEntries = (): NonSensitivePatient [] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => 
  ({  id, name, dateOfBirth, gender, occupation, entries }));};

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
  if (entry && entry?.entries === undefined) {
    entry.entries = [];}
  return entry;
};

const addEntry = (id:string, newEntry: Entry): Entry=> {
  const patient = patients.find(p => p.id === id);
  let updatedPatient = newEntry;

  if (typeof newEntry.date === 'string' && typeof newEntry.description === 'string'
   && typeof newEntry.specialist === 'string' && typeof newEntry.type === 'string'
   && isValidEntryType(newEntry.type)) {
     if(!requiredEntryFields(newEntry)) {
       throw new Error("Missing required fields for entry");
     }
    updatedPatient = { 
      ...newEntry,
      id: uuidv4()};
    patient?.entries.push(updatedPatient);
  } else {
    throw Error("Invalid data!");
  }

  return updatedPatient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};