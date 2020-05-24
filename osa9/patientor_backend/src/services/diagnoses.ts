import { diagnoses }  from '../../data/entries';
import { Diagnose } from '../types/diagnose';

const getEntries = () : Diagnose[] => {
  return diagnoses;
}; 


const addDiagnose = () => {
  return [];
}; 

export default {
  getEntries,
  addDiagnose
};