import { patients } from '../../data/entries';
import { Patient, NonSensitivePatient } from '../types/patient';

const getEntries = () : Patient[] => {
  return patients;
}; 

const getNonSensitiveEntries = (): NonSensitivePatient [] => {  
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => 
  ({  id, name, dateOfBirth, gender, occupation,  }));};

const addPatient = () => {
  return [];
}; 

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient
};