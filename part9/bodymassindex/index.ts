import express from 'express';
import { calcuculateBmi, parseArguments } from './bmiCalculator';

//const express = require('express')
const app = express();

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

/*
app.post('/exercises', (res, req) => {

})
*/

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
