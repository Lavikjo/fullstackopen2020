import { diagnoses }  from '../../data/entries';
import { Diagnosis } from '../types/diagnose';

const getEntries = () : Diagnosis[] => {
  return diagnoses;
}; 



export default {
  getEntries,
};