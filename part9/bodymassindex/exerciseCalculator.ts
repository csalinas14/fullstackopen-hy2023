import { isNotNumber } from './utils';

interface dailyExercises {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  hours: number[],
  target: number
): dailyExercises => {
  const avg = hours.reduce((a, b) => a + b, 0) / hours.length;

  const ratingsNumber = hours.filter((h) => h < 2);
  let finalRating;
  if (ratingsNumber.length === 0) {
    finalRating = 3;
  } else if (ratingsNumber.length < 3) {
    finalRating = 2;
  } else {
    finalRating = 1;
  }
  let ratingDesc;
  switch (finalRating) {
    case 1:
      ratingDesc = 'Very bad';
      break;
    case 2:
      ratingDesc = 'Average';
      break;
    case 3:
      ratingDesc = 'Excellent';
      break;
    default:
      ratingDesc = 'unknown';
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h !== 0).length,
    success: avg === target ? true : false,
    rating: finalRating,
    ratingDescription: ratingDesc,
    target: target,
    average: avg
  };
};

interface exerciseValues {
  target: number;
  hours: number[];
}

export const parseArgumentsExercise = (args: string[]): exerciseValues => {
  if (args.length < 4) throw new Error('Too few arguments');

  const tempHours: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (isNotNumber(args[i])) {
      throw new Error('Provided values included not a number');
    }
    tempHours.push(Number(args[i]));
  }

  if (!isNotNumber(args[2])) {
    return {
      target: Number(args[2]),
      hours: tempHours
    };
  } else {
    throw new Error('Provided target was not a number');
  }
};

try {
  const { target, hours } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened ';
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message;
  }
  console.log(errorMessage);
}

//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
