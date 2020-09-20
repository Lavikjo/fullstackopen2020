import React, { useEffect } from "react";
import axios from "axios";
import { Header, Icon, Card, Loader, SemanticICONS } from "semantic-ui-react";

import { Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { addPatient } from "../state/reducer";
import EntryComponent from "../components/EntryComponent";

const genderIcon: Record<Gender, SemanticICONS> = {
  [Gender.Male]: 'mars',
  [Gender.Female]: 'venus',
  [Gender.Other]: 'other gender',
};

const PatientInfoPage: React.FC<{ id: string }> = ({ id }) => {
  const [{ patients }, dispatch] = useStateValue();


  const patient = patients[id];

  useEffect(() => {

    const addPatientToState = async (id: string): Promise<Patient> => {
      // does not exist in state, add the patient
      const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(addPatient(newPatient));
      return newPatient;
    };

    if (patients[id] === undefined) {
      addPatientToState(id);
    }
  }, [patients, id, dispatch]);


  if (patients[id] === undefined) {
    return (<Loader></Loader>);

  } return (
    <div className="PatientInfo">
      <Header size='medium'>{patient.name}<Icon name={genderIcon[patient.gender]} size='small'></Icon></Header>
      <p>ssn: {patient.ssn}</p>
      <p>birthday: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <Header size='small'>entries</Header>
      <Card.Group>
        {Object.values(patient.entries).map((entry) => <EntryComponent entry={entry} key={entry.id} />)}
      </Card.Group>
    </div>
  );
};

export default PatientInfoPage;
