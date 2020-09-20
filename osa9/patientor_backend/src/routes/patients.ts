import express from "express";
import patientService from "../services/patients";
import toNewPatient from "../utils/utils";

const patientsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
patientsRouter.get("/", (_req: any, res) => { 
  res.send(patientService.getNonSensitiveEntries());
});

patientsRouter.get("/:id", (req, res) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

patientsRouter.post("/:id", (req, res) => {
  
  try {
    const updatedPatient = patientService.addEntry(req.params.id, req.body);
    res.json(updatedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry  = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default patientsRouter;