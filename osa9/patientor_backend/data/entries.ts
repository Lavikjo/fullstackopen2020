import { Patient } from "../src/types/patient";
import { Diagnose } from "../src/types/diagnose";

export const patients: Array<Patient> = [
  {
  "id": "d2773336-f723-11e9-8f0b-362b9e155667",
  "name": "John McClane",
  "dateOfBirth": "1986-07-09",
  "ssn": "090786-122X",
  "gender": "male",
  "occupation": "New york city cop"
},
{
  "id": "d2773598-f723-11e9-8f0b-362b9e155667",
  "name": "Martin Riggs",
  "dateOfBirth": "1979-01-30",
  "ssn": "300179-77A",
  "gender": "male",
  "occupation": "Cop"
},
{
  "id": "d27736ec-f723-11e9-8f0b-362b9e155667",
  "name": "Hans Gruber",
  "dateOfBirth": "1970-04-25",
  "ssn": "250470-555L",
  "gender": "male",
  "occupation": "Technician"
},
{
  "id": "d2773822-f723-11e9-8f0b-362b9e155667",
  "name": "Dana Scully",
  "dateOfBirth": "1974-01-05",
  "ssn": "050174-432N",
  "gender": "female",
  "occupation": "Forensic Pathologist"
},
{
  "id": "d2773c6e-f723-11e9-8f0b-362b9e155667",
  "name": "Matti Luukkainen",
  "dateOfBirth": "1971-04-09",
  "ssn": "090471-8890",
  "gender": "male",
  "occupation": "Digital evangelist"
}
];

export const diagnoses: Array<Diagnose> = [
  {
    "code": "M24.2",
    "name": "Disorder of ligament",
    "latin": "Morbositas ligamenti"
  },
  {
    "code": "M51.2",
    "name": "Other specified intervertebral disc displacement",
    "latin": "Alia dislocatio disci intervertebralis specificata"
  },
  {
    "code": "S03.5",
    "name": "Sprain and strain of joints and ligaments of other and unspecified parts of head",
    "latin": "Distorsio et/sive distensio articulationum et/sive ligamentorum partium aliarum sive non specificatarum capitis"
  },
  {
    "code": "J10.1",
    "name": "Influenza with other respiratory manifestations, other influenza virus codeentified",
    "latin": "Influenza cum aliis manifestationibus respiratoriis ab agente virali codeentificato"
  },
  {
    "code": "J06.9",
    "name": "Acute upper respiratory infection, unspecified",
    "latin": "Infectio acuta respiratoria superior non specificata"
  },
  {
    "code": "Z57.1",
    "name": "Occupational exposure to radiation"
  },
  {
    "code": "N30.0",
    "name": "Acute cystitis",
    "latin": "Cystitis acuta"
  },
  {
    "code": "H54.7",
    "name": "Unspecified visual loss",
    "latin": "Amblyopia NAS"
  },
  {
    "code": "J03.0",
    "name": "Streptococcal tonsillitis",
    "latin": "Tonsillitis (palatina) streptococcica"
  },
  {
    "code": "L60.1",
    "name": "Onycholysis",
    "latin": "Onycholysis"
  },
  {
    "code": "Z74.3",
    "name": "Need for continuous supervision"
  },
  {
    "code": "L20",
    "name": "Atopic dermatitis",
    "latin": "Atopic dermatitis"
  },
  {
    "code": "F43.2",
    "name": "Adjustment disorders",
    "latin": "Perturbationes adaptationis"
  },
  {
    "code": "S62.5",
    "name": "Fracture of thumb",
    "latin": "Fractura [ossis/ossium] pollicis"
  },
  {
    "code": "H35.29",
    "name": "Other proliferative retinopathy",
    "latin": "Alia retinopathia proliferativa"
  }

];