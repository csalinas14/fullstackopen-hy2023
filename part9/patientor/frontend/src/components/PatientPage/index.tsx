import { Patient, Diagnosis, Entry, EntryWithoutId } from "../../types";
import { useEffect, useState } from "react";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import EntryDetails from "./Entries/entry";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { green, red, yellow } from "@mui/material/colors";
import { Alert, Input, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const codes = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", "Z74.3", "L20", "F43.2", "S62.5", "H35.29"];

const HospitalEntry = ({entry}: { entry: Entry}) => {
  return(
    <div>
        {entry.type}
    </div>
  );
};

const OccupationalHealthcareEntry = ({entry}: { entry: Entry }) => {
    return(
      <div>
          {entry.type}
          {entry.date} {" "}
          <MedicalServicesIcon /> <br />
          {entry.description}<br />
          diagnose by {entry.specialist}
      </div>
  );
};

const HealthCheckEntry = ({entry}: { entry: Entry }) => {

  const test = (entry: Entry) => {
    if('healthCheckRating' in entry){
      return entry;
    }
    else{
      throw new Error('Not the right type');
    }
  };


  const rating = (ratingNum: number) => {
    switch(ratingNum){
      case 0:
        return <FavoriteIcon sx={{ color: green[500] }} />;
      case 1:
        return <FavoriteIcon sx={{ color: yellow[500] }} />;
      case 2:
        return <FavoriteIcon sx={{ color: red[500] }} />;
    }
  };

  const entryNarrowed = test(entry);

    return(
      <div>
          {entryNarrowed.type}
          {entryNarrowed.date} {" "}
          <MedicalServicesIcon /> <br />
          {entryNarrowed.description}<br />
          {rating(entryNarrowed.healthCheckRating)} <br />
          diagnose by {entryNarrowed.specialist}
      </div>
  );
};

  

const PatientPage = ({diagnoses}: { diagnoses: Diagnosis[]}) => {

  const [patient, setPatient] = useState<Patient>();
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist , setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheck] = useState(1);
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string>('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const id = useParams().id;

  useEffect(() => {

    const fetchPatientList = async () => {
      const patientTemp = await patientService.getPatient(id);
      setPatient(patientTemp);
    };
    void fetchPatientList();
  }, [id]);

    /**
 * Helper function for exhaustive type checking
 */
    const assertNever = (value: never): never => {
      throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
      );
    };
    
    const EntryType: React.FC<{entry: Entry}> = ({ entry }) => {
      switch(entry.type){
        case "Hospital":
          return <HospitalEntry entry={entry} />;
        case "OccupationalHealthcare":
          return <OccupationalHealthcareEntry entry={entry} />;
        case "HealthCheck":
          return <HealthCheckEntry entry={entry} />;
       default:
          return assertNever(entry);
      }
    };

  if(!patient){
    return(
      <p>hello</p>
    );
  }

  const addHealthCheck = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: EntryWithoutId = {
      type: 'HealthCheck',
      description: description,
      date: date,
      specialist: specialist,
      healthCheckRating: healthCheckRating,
      diagnosisCodes: diagnosisCodes
    };

    try{
      const data = await patientService.createEntry(entryToAdd, id);
      
      setPatient({...patient, entries: patient.entries.concat(data)});
      setDescription('');
      setDate('');
      setDiagnosisCodes([]);
      setSpecialist('');
      setHealthCheck(1);

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
          
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const addHospital = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: EntryWithoutId = {
      type: 'Hospital',
      description: description,
      date: date,
      specialist: specialist,
      discharge: {
        date: dischargeDate,
        criteria: criteria
      },
      diagnosisCodes: diagnosisCodes
    };

    try{
      const data = await patientService.createEntry(entryToAdd, id);
      
      setPatient({...patient, entries: patient.entries.concat(data)});
      setDescription('');
      setDate('');
      setDiagnosisCodes([]);
      setSpecialist('');
      setDischargeDate('');
      setCriteria('');

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
          
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  const addOccupational = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: EntryWithoutId = {
      type: 'OccupationalHealthcare',
      description: description,
      date: date,
      specialist: specialist,
      employerName: employer,
      diagnosisCodes: diagnosisCodes
    };

    if(startDate && endDate){
      entryToAdd.sickLeave = {
        startDate: startDate,
        endDate: endDate
      };
    }

    try{
      const data = await patientService.createEntry(entryToAdd, id);
      
      setPatient({...patient, entries: patient.entries.concat(data)});
      setDescription('');
      setDate('');
      setDiagnosisCodes([]);
      setSpecialist('');
      setDischargeDate('');
      setEmployer('');
      setStartDate('');
      setEndDate('');

    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
          
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>

      {error && <Alert severity="error">{error}</Alert>}
      <h1>Patientor</h1> <br />
      <h2>{patient.name}</h2>
      ssn: {patient.ssn} <br />
      occupation: {patient.occupation} <br />

      <form>
        <h2>New HealthCheck entry</h2>

        description {" "}
        <input value={description} onChange={({ target }) => setDescription(target.value)}></input>
        <br />
        Date: {" "}
        <Input type="date" value={date} onChange={({ target }) => setDate(target.value)}></Input>
        <br />
        specialist {" "}
        <input value={specialist} onChange={({ target }) => setSpecialist(target.value)}></input>
        <br />
        Healthcheck rating {" "}
        <input value={healthCheckRating} onChange={({ target }) => setHealthCheck(Number(target.value))}></input>
        <br />

        Hospital Discharge Date {" "}
        <input value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)}></input>
        <br />

        Hospital Criteria {" "}
        <input value={criteria} onChange={({ target }) => setCriteria(target.value)}></input>
        <br />

        Occupational Employer {" "}
        <input value={employer} onChange={({ target }) => setEmployer(target.value)}></input>
        <br />

        Occupational Sick Leave Start {" "}
        <input value={startDate} onChange={({ target }) => setStartDate(target.value)}></input>
        <br />

        Occupational Sick Leave End {" "}
        <input value={endDate} onChange={({ target }) => setEndDate(target.value)}></input>
        <br />
        <br />

        <FormControl sx={{ m: 1, width: 300}}>
          <InputLabel id='diagnosis-codes-label'>Diagnoses Codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            id='diagnosis-codes'
            multiple
            value={diagnosisCodes}
            onChange={({ target }) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
            input={<OutlinedInput label="Code" />}
            MenuProps={MenuProps}
            >
            {codes.map((code) => (
              <MenuItem
                key={code}
                value={code}

              >
                {code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <br />
        <button type="submit" onClick={addHealthCheck}>submit HealthCheck</button>
        <button type="submit" onClick={addHospital}>submit Hospital</button>
        <button type="submit" onClick={addOccupational}>submit Occupational</button>
      </form>

      <h2>entries</h2>
      {patient.entries.map(entry => 
      (
      <div>
        <EntryDetails entry={entry} diagnoses={diagnoses}/>
        <EntryType entry={entry} />
      </div>
      )
      )}

    </div>
  );
};

export default PatientPage;