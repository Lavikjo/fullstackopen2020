import calculateExercise from "./exerciseCalculator";

interface ExerciseValues {
  target: number;
  hours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const hours: Array<number> = args.slice(3).map((x) => +x);
  if (!isNaN(Number(args[2])) && hours.some((n) => !isNaN(n))) {
    return {
      target: Number(args[2]),
      hours: hours,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercise(target, hours));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
