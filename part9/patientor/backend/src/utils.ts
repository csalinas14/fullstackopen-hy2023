import { NewPatientEntry, Gender, EntryWithoutId, HealthCheckRating, DiagnoseEntry } from "./types";

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }

  if('description' in object && 'date' in object && 'specialist' in object && 'type' in object){
    switch(object.type){
      case "HealthCheck":
        if('healthCheckRating' in object){
          const newEntry: EntryWithoutId = {
            type: "HealthCheck",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
      
          return newEntry;
        }
        throw new Error('Incorrect data: some fields are missing');

      case "Hospital":
        const newEntry: EntryWithoutId = {
          type: "Hospital",
          description: parseDescription(object.description),
          date: parseDate(object.date),
          diagnosisCodes: parseDiagnosisCodes(object),
          specialist: parseSpecialist(object.specialist)
        };
        
        if('discharge' in object && typeof object.discharge === 'object' &&
        object.discharge && 'date' in object.discharge && 'criteria' in object.discharge){
          newEntry.discharge = {
            date: parseDate(object.discharge.date),
            criteria: parseStringField(object.discharge.criteria)
          };

          return newEntry;
        }
        return newEntry;

      case "OccupationalHealthcare":
        if('employerName' in object){
          const newEntry: EntryWithoutId = {
            type: "OccupationalHealthcare",
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            diagnosisCodes: parseDiagnosisCodes(object),
            employerName: parseStringField(object.employerName)
          };

          if('sickLeave' in object && typeof object.sickLeave === 'object' &&
          object.sickLeave && 'startDate' in object.sickLeave && 'endDate' in object.sickLeave){
            newEntry.sickLeave = {
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate)
            };

            return newEntry;
          }

          return newEntry;
        }

        throw new Error('Incorrect data: some fields are missing');
    }
  }

  throw new Error('Incorrect data: some fields missing');
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const parseStringField = (x: unknown) : string => {
  if(!x || !isString(x)){
    throw new Error('Incorrect or missing description');
  }
  return x;
};


const parseDescription = (description: unknown) : string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date)|| !isDate(date)){
    throw new Error('Incorrect or missing date');
  }

  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
    throw new Error('Incorrect or missing healthCheckRating');
  }

  return healthCheckRating;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(h => h).includes(param);
};

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {

  if(!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }

  if('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in  object){
    const newPatient: NewPatientEntry = {
      name: parseName(object.name), // fake the return value
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation)
     };

     return newPatient;
  }
  console.log(object); // now object is no longer unuse
  throw new Error('Incorrect data: some fields missing');
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name');
  }
  return name;

};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
    throw new Error('Incorrect or missing date: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseSSN = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)){
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occuation');
  }
  return occupation;
};