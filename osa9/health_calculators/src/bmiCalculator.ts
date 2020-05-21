type BmiLevel =
  | "Normal (healthy weight)"
  | "Overweight"
  | "Underweight"
  | "Severely underweight"
  | "Very severely underweight"
  | "Obese Class I (Moderately obese)"
  | "Obese Class II (Severely obese)"
  | "Obese Class III (Very severely obese)"

const calculateBmi = (height: number, weight: number): BmiLevel => {
  const bmi: number = weight / Math.pow(height / 100, 2)
  if (bmi < 15) {
    return "Very severely underweight"
  } else if (bmi >= 15 && bmi < 16) {
    return "Severely underweight"
  } else if (bmi >= 16 && bmi < 18.5) {
    return "Underweight"
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal (healthy weight)"
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight"
  } else if (bmi >= 30 && bmi < 35) {
    return "Obese Class I (Moderately obese)"
  } else if (bmi >= 35 && bmi < 40) {
    return "Obese Class II (Severely obese)"
  } else {
    return "Obese Class III (Very severely obese)"
  }
}

interface BMIValues {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BMIValues => {
  if (args.length < 4) throw new Error("Not enough arguments")
  if (args.length > 4) throw new Error("Too many arguments")

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  } else if (Number(args[2]) < 20 || Number(args[2]) > 240) {
    throw new Error("Unrealistic height")
  } else if (Number(args[3]) < 0 || Number(args[3]) > 500) {
    throw new Error("Unrealistic weight")
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

try {
  const { height, weight } = parseArguments(process.argv)
  console.log(calculateBmi(height, weight))
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message)
}
