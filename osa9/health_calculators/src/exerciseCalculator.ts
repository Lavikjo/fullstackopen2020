type Description = "bad" | "decent" | "okay" | "good" | "excellent";

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: Description;
  target: number;
  average: number;
}

const mapRange = (
  value: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number
) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

const describeRating = (rating: number): Description => {
  if (rating < 1.5) {
    return "bad";
  } else if (rating >= 1.5 && rating < 1.9) {
    return "decent";
  } else if (rating >= 1.9 && rating < 2.1) {
    return "okay";
  } else if (rating >= 2.1 && rating < 2.5) {
    return "good";
  } else if (rating >= 2.5) {
    return "excellent";
  }
  return "bad";
};

const calculateExercise = (target: number, hours: Array<number>): Result => {
  const periodLength: number = hours.length;
  const trainingDays: Array<number> = hours.filter((n) => n > 0);
  const successfulDays: number = hours.filter((n) => n >= target).length;
  const success: boolean = successfulDays === periodLength;
  const rating: number = mapRange(successfulDays / periodLength, 0, 1, 1, 3);
  const average: number =
    hours.reduce((prev, curr) => prev + curr, 0) / hours.length;
  return {
    periodLength: periodLength,
    trainingDays: trainingDays.length,
    success: success,
    rating: rating,
    ratingDescription: describeRating(rating),
    target: target,
    average: average,
  };
};

export default calculateExercise;
