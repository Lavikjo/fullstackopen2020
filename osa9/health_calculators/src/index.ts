import express from "express";
import bodyParser from "body-parser";
import { check, validationResult } from "express-validator";
import bmiCalculator, { BmiLevel } from "./bmiCalculator";
import calculateExercise, { Result } from "./exerciseCalculator";
const app = express();
app.use(bodyParser.json());

// eslint-disable-next-line @typescript-eslint/no-explicit-any 
app.use(function (error: any, _req: any, res: any, next: () => void) {
  if (error instanceof SyntaxError) {
    console.error(error);
    res.status(400).send({error: "invalid json"});
    return;
  } else {
    next();
  }
});

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res): void => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (isNaN(weight) || isNaN(height)) {
    res.status(400).send({ error: "malformatted parameters" });
    return;
  }

  const bmi: BmiLevel = bmiCalculator(height, weight);

  res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", [
  check("daily_exercises").not().isEmpty(),
  check("target").not().isEmpty()
  
 ],
 // eslint-disable-next-line @typescript-eslint/no-explicit-any 
 (req: any, res: any): void => { 
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ error: "missing parameters" });
     return;
  }

  const hours: Array<number> = req.body.daily_exercises;
  const target: number = req.body.target;
  if (isNaN(target) || hours.some(n => isNaN(n))) {
    res.status(400).send({ error: "malformatted parameters"});
    return;
  }
  const result: Result = calculateExercise(target, hours);
  

  res.json(result);
  
} );

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
