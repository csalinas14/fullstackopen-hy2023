import express from 'express';
import patientService from '../services/patientService';
import {toNewPatientEntry, toNewEntry} from '../utils';


const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
  try{
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) =>{
  const patient = patientService.getPatient(req.params.id);
  if(patient){
    res.send({...patient});
  } else {
    res.sendStatus(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if(patient){
    try{
      const entry = toNewEntry(req.body);
      const addedEntry = patientService.addEntry(entry, patient.id);
      res.json(addedEntry);
    } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  }
  else{
    res.sendStatus(404);
  }
});

export default router;