import express from "express";
import diagnoseService from "../services/diagnoses";

const diagnoseRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
diagnoseRouter.get('/', (_req: any, res) => { 
  res.send(diagnoseService.getEntries());
});

export default diagnoseRouter;