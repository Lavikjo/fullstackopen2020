import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |  {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis;
    }
    
  |  {
    type: "SET_DIAGNOSES";
    payload: Diagnosis[];
  };

export const addPatient = (patient: Patient): Action =>  {
  return {
    type: "ADD_PATIENT",
    payload: patient 
  };
};

export const addDiagnosis = (diagnosis: Diagnosis): Action =>  {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnosis 
  };
};

export const setDiagnoses = (diagnoseList: Diagnosis[]): Action =>  {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoseList 
  };
};

export const setPatientList = (patientList: Patient[]): Action =>  {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList 
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_DIAGNOSIS":
    return {
      ...state,
      diagnoses: {
        ...state.diagnoses,
        [action.payload.code]: action.payload
      }
    };

    case "SET_DIAGNOSES":
    return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    default:
      return state;
  }
};
