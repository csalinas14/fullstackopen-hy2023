import { Entry, Diagnosis, } from "../../../types";

const EntryDetails = ({entry, diagnoses}: {entry: Entry, diagnoses: Diagnosis[]}) => {

  //console.log(entry);
  
  return(
    <div>
        <ul>
          {entry.diagnosisCodes?.map(dia =>
            
            <div>
              <li key={dia}>{dia} {" "}
              {diagnoses.map(diagnosis => (diagnosis.code === dia ? diagnosis.name : "" )
                )}
                </li>
            </div>
            )
          }
        </ul>
    </div>
  );
};

export default EntryDetails;