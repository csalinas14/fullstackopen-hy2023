import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send('Get diagnoses');
});

router.post('/', (_req, res) => {
  res.send('Saving diagnoses');
});

export default router;
