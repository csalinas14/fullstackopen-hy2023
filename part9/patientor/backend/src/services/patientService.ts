import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

import { NonSensitivePatientEntry, PatientEntry, NewPatientEntry } from '../types';

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
  const newPatientEntry = {
    id: id,
    ...patient
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
    getPatientEntries,
    getNonSensitiveEntries,
    addPatient
};