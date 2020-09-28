import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_DIAGNOSIS";
      payload: Diagnosis;
    }
  | {
      type: "SET_DIAGNOSES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { entry: Entry;patientId:  string };
    };

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const addEntry = (entry: Entry, patientId: string): Action => {
  return {
    type: "ADD_ENTRY",
    payload: {
      entry,
      patientId,
    },
  };
};

export const addDiagnosis = (diagnosis: Diagnosis): Action => {
  return {
    type: "ADD_DIAGNOSIS",
    payload: diagnosis,
  };
};

export const setDiagnoses = (diagnoseList: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSES",
    payload: diagnoseList,
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

const patients = (state: { [id: string]: Patient }, action: Action) => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        ...action.payload.reduce(
          (memo, patient) => ({ ...memo, [patient.id]: patient }),
          {}
        ),
      };
    case "ADD_PATIENT":
      return {
        ...state,
        [action.payload.id]: action.payload,
      };

    case "ADD_ENTRY":
      return {
        ...state,
        [action.payload.patientId]: {
          ...state[action.payload.patientId],
          entries: [...state[action.payload.patientId].entries, action.payload.entry],
        },
      };
    default:
      return state;
  }
};

const diagnoses = (state: { [code: string]: Diagnosis }, action: Action) => {
  switch (action.type) {
    case "ADD_DIAGNOSIS":
      return {
        ...state,
        [action.payload.code]: action.payload,
      };

    case "SET_DIAGNOSES":
      return {
        ...state,
        ...action.payload.reduce(
          (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
          {}
        ),
      };
    default:
      return state;
  }
};

export const reducer = (state: State, action: Action) => ({
  diagnoses: diagnoses(state.diagnoses, action),
  patients: patients(state.patients, action),
});
