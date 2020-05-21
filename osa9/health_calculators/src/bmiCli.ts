import calculateBmi from "./bmiCalculator";

interface BMIValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else if (Number(args[2]) < 20 || Number(args[2]) > 240) {
    throw new Error("Unrealistic height");
  } else if (Number(args[3]) < 0 || Number(args[3]) > 500) {
    throw new Error("Unrealistic weight");
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
