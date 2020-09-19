// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescriptionBase extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartDescriptionBase {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartDescriptionBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartDescriptionBase {
  name: "Knowledge is power";
  exerciseRating: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;