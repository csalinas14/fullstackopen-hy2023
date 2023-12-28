import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry, Entry, EntryWithoutId } from '../types';

const getPatientEntries = (): PatientEntry[] => {
    return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (patient: NewPatientEntry ): PatientEntry => {
  const id: string = uuid();
  const entryTemp: Entry[] = [];
  const newPatientEntry = {
    id: id,
    entries: entryTemp,
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const getPatient = (id: string): PatientEntry | undefined => {
  const patient = patients.find(p => p.id === id);
  //const entryTemp: Entry[] = [];
  console.log(patient);
  return patient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const id: string = uuid();
  const newEntry = {
    id: id,
    ...entry
  };
  
  getPatient(patientId)?.entries.push(newEntry);
  return newEntry;
};

export default {
    getPatientEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatient,
    addEntry
};