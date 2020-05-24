import express from "express";
import patientService from "../services/patients";

const patientsRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
patientsRouter.get('/', (_req: any, res) => { 
  res.send(patientService.getNonSensitiveEntries());
});

export default patientsRouter;