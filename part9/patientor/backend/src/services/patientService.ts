import patients from '../../data/patients';

import { NonSensitivePatientEntry, PatientEntry } from '../types';

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

export default {
    getPatientEntries,
    getNonSensitiveEntries
};