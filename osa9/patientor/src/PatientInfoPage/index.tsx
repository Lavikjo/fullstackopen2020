import React, { useEffect } from "react";
import axios from "axios";
import { Header, Icon, Card, Loader, SemanticICONS, Button } from "semantic-ui-react";

import { Entry, Gender, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { addEntry, addPatient } from "../state/reducer";
import EntryComponent from "../components/EntryComponent";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const genderIcon: Record<Gender, SemanticICONS> = {
  [Gender.Male]: 'mars',
  [Gender.Female]: 'venus',
  [Gender.Other]: 'other gender',
};

const PatientInfoPage: React.FC<{ id: string }> = ({ id }) => {
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientInfoPage;
