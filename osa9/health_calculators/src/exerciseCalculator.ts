type Description = "bad" | "decent" | "okay" | "good" | "excellent"

interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: Description
  target: number
  average: number
}

const mapRange = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2

const describeRating = (rating: number): Description => {
  if (rating < 1.5) {
    return "bad"
  } else if (rating >= 1.5 && rating < 1.9) {
    return "decent"
  } else if (rating >= 1.9 && rating < 2.1) {
    return "okay"
  } else if (rating >= 2.1 && rating < 2.5) {
    return "good"
  } else if (rating >= 2.5) {
    return "excellent"
  }
  return "bad"
}

const calculateExercise = (target: number, hours: Array<number>): Result => {
  const periodLength: number = hours.length
  const trainingDays: Array<number> = hours.filter((n) => n > 0)
  const successfulDays: number = hours.filter((n) => n >= target).length
  const success: boolean = successfulDays === periodLength
  const rating: number = mapRange(successfulDays / periodLength, 0, 1, 1, 3)
  const average: number =
    hours.reduce((prev, curr) => prev + curr, 0) / hours.length
  return {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating,
    ratingDescription: describeRating(rating),
    target: target,
    average: average,
  }
}

interface ExerciseValues {
  target: number
  hours: Array<number>
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments")
  const hours: Array<number> = args.slice(3).map((x) => +x)
  if (!isNaN(Number(args[2])) && hours.some((n) => !isNaN(n))) {
    return {
      target: Number(args[2]),
      hours: hours,
    }
  } else {
    throw new Error("Provided values were not numbers!")
  }
}

try {
  const { target, hours } = parseExerciseArguments(process.argv)
  console.log(calculateExercise(target, hours))
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message)
}
