/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calcuculateBmi, parseArguments } from './bmiCalculator';
import {
  parseArgumentsExercise,
  calculateExercises
} from './exerciseCalculator';

//const express = require('express')
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  try {
    const weightInput: string = String(req.query.weight);
    const heightInput: string = String(req.query.height);
    const { height, weight } = parseArguments([weightInput, heightInput]);
    res.json({
      weight: height,
      height: weight,
      bmi: calcuculateBmi(weight, height)
    });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.json({ error: errorMessage });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data = req.body;
  console.log(data);
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const daily_exercises: number[] = data.daily_exercises;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const data_target: number = data.target;
    const { target, hours } = parseArgumentsExercise(
      daily_exercises,
      data_target
    );
    const ans = calculateExercises(hours, target);
    return res.send({ ans });
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    return res.json({ error: errorMessage });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
