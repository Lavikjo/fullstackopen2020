import express from "express";
import cors from "cors";
import pingRouter from "./routes/ping";
import patientsRouter from "./routes/patients";
import diagnoseRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;
app.use("/api/ping", pingRouter);
app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnoseRouter);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});