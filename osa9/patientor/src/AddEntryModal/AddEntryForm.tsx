import React, { useState } from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
  TextField,
  EntryOption,
  DiagnosisSelection,
  DiagnosisSelectionProps,
  BaseFieldProps,
} from "../AddPatientModal/FormField";
import {
  EntryType,
  BaseEntry,
  HealthCheckRating,
  OccupationalHealthcareEntry,
  HospitalEntry,
  HealthCheckEntry,
} from "../types";
import { useStateValue } from "../state";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type EntryFormValues = EntryWithoutId;

type HospitalEntryValue = Omit<HospitalEntry, "id">;
type OccupationalHealthcareValue = Omit<OccupationalHealthcareEntry, "id">;
type HealthCheckEntryValue = Omit<HealthCheckEntry, "id">;

export type EntryWithoutId =
  | HospitalEntryValue
  | OccupationalHealthcareValue
  | HealthCheckEntryValue;

interface AddEntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryOption[] = [
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational" },
  { value: "HealthCheck", label: "Health check" },
];

const validateCommonFields = (
  values: Partial<BaseEntry>,
  errors: { [field: string]: string | { [field: string]: string } }
) => {
  const requiredError = "Field is required";
  if (!values.description) {
    errors.description = requiredError;
  }
  if (!values.date) {
    errors.date = requiredError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.diagnosisCodes || values.diagnosisCodes.length <= 0) {
    errors.diagnosisCodes = requiredError;
  }
};

export const SelectEntryType: React.FC<{
  label: string;
  onChange: (entryType: EntryType) => void;
  value: EntryType;
}> = ({ label, onChange, value }) => {
  return (
    <div>
      <label>{label}</label>
      <select
        name="select-entry"
        className="ui dropdown"
        value={value}
        onChange={(e) => {
          onChange(e.target.value as EntryType);
        }}
      >
        {entryTypeOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </select>
    </div>
  );
};

interface EntryFieldsProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

interface HospitalEntryFieldsProps {
  onSubmit: (values: HospitalEntryValue) => void;
  onCancel: () => void;
}

function isValidDate(value: string) {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
}

const HospitalEntryFields = ({
  onSubmit,
  onCancel,
}: HospitalEntryFieldsProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        discharge: {
          criteria: "",
          date: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        validateCommonFields(values, errors);

        if (
          !values.discharge.date ||
          !values.discharge.criteria ||
          !isValidDate(values.discharge.date)
        ) {
          errors.discharge = {};

          if (!isValidDate(values.discharge.date)) {
            errors.discharge.date = invalidDateError;
          }

          if (!values.discharge.date) {
            errors.discharge.date = requiredError;
          }
          if (!values.discharge.criteria) {
            errors.discharge.criteria = requiredError;
          }
        }

        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonEntryFields
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Date Of Discharge"
              placeholder="YYYY-MM-DD"
              name="discharge.date"
              component={TextField}
            />

            <Field
              label="Criteria Of Discharge"
              placeholder=""
              name="discharge.criteria"
              component={TextField}
            />
            <FormControls onCancel={onCancel} />
          </Form>
        );
      }}
    </Formik>
  );
};

interface OccupationalHealthcareFieldsProps {
  onSubmit: (values: OccupationalHealthcareValue) => void;
  onCancel: () => void;
}
const OccupationalHealthcareFields = ({
  onSubmit,
  onCancel,
}: OccupationalHealthcareFieldsProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "OccupationalHealthcare",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const invalidDateError = "Invalid date";
        const errors: {
          [field: string]: string | { [field: string]: string };
        } = {};
        validateCommonFields(values, errors);
        if (!values.employerName) {
          errors.employerName = requiredError;
        }

        if (
          !isValidDate(values.sickLeave.startDate) ||
          !isValidDate(values.sickLeave.endDate)
        ) {
          errors.sickLeave = {};
          if (!isValidDate(values.sickLeave.startDate)) {
            errors.sickLeave.startDate = invalidDateError;
          }

          if (!isValidDate(values.sickLeave.endDate)) {
            errors.sickLeave.endDate = invalidDateError;
          }
        }

        if (!values.sickLeave.startDate || !values.sickLeave.endDate) {
          errors.sickLeave = {};
          if (!values.sickLeave.startDate) {
            errors.sickLeave.startDate = requiredError;
          }
          if (!values.sickLeave.startDate) {
            errors.sickLeave.endDate = requiredError;
          }
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonEntryFields
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />
            <Field
              label="Employer Name"
              placeholder=""
              name="employerName"
              component={TextField}
            />
            <Field
              label="Start Date Of Sick Leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.startDate"
              component={TextField}
            />

            <Field
              label="End Date Of Sick Leave"
              placeholder="YYYY-MM-DD"
              name="sickLeave.endDate"
              component={TextField}
            />
            <FormControls onCancel={onCancel} />
          </Form>
        );
      }}
    </Formik>
  );
};

type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};
interface SelectHealthRatingProps extends BaseFieldProps {
  options: HealthRatingOption[];
}

const healthRatingOptions: HealthRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];
const SelectHealthRating: React.FC<SelectHealthRatingProps> = ({
  name,
  label,
  options,
}: SelectHealthRatingProps) => (
    <>
      <label>{label}</label>
      <Field as="select" name={name} className="ui dropdown">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label || option.value}
          </option>
        ))}
      </Field>
    </>
  );

interface HealthCheckFieldProps {
  onSubmit: (values: HealthCheckEntryValue) => void;
  onCancel: () => void;
}

const HealthCheckFields = ({ onSubmit, onCancel }: HealthCheckFieldProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        date: "",
        description: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        validateCommonFields(values, errors);
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <CommonEntryFields
              diagnoses={Object.values(diagnoses)}
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <SelectHealthRating
              label="Health Check Rating"
              name="healthCheckRating"
              options={healthRatingOptions}
            />
            <FormControls onCancel={onCancel} />
          </Form>
        );
      }}
    </Formik>
  );
};

const entryDynamicFields: Record<EntryType, React.FC<EntryFieldsProps>> = {
  Hospital: HospitalEntryFields,
  HealthCheck: HealthCheckFields,
  OccupationalHealthcare: OccupationalHealthcareFields,
};

const FormControls = ({ onCancel }: { onCancel: () => void }) => (
  <Grid>
    <Grid.Column floated="left" width={5}>
      <Button type="button" onClick={onCancel} color="red">
        Cancel
      </Button>
    </Grid.Column>
    <Grid.Column floated="right" width={5}>
      <Button type="submit" floated="right" color="green">
        Add
      </Button>
    </Grid.Column>
  </Grid>
);

export const AddEntryForm: React.FC<AddEntryFormProps> = ({
  onCancel,
  onSubmit,
}) => {
  const [entrytype, setEntryType] = useState<EntryType>("Hospital");

  const EntryFields = entryDynamicFields[entrytype];

  return (
    <div>
      <SelectEntryType label="Type" onChange={setEntryType} value={entrytype} />

      <EntryFields onSubmit={onSubmit} onCancel={onCancel} />
    </div>
  );
};

interface CommonEntryFieldsType {
  diagnoses: DiagnosisSelectionProps["diagnoses"];
  setFieldValue: DiagnosisSelectionProps["setFieldValue"];
  setFieldTouched: DiagnosisSelectionProps["setFieldTouched"];
}

const CommonEntryFields = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: CommonEntryFieldsType) => {
  return (
    <>
      <Field
        label="Description"
        placeholder=""
        name="description"
        component={TextField}
      />
      <Field
        label="Date"
        placeholder="YYYY-MM-DD"
        name="date"
        component={TextField}
      />
      <Field
        label="Specialist"
        placeholder="Dr. House"
        name="specialist"
        component={TextField}
      />
      <DiagnosisSelection
        setFieldValue={setFieldValue}
        setFieldTouched={setFieldTouched}
        diagnoses={diagnoses}
      />
    </>
  );
};

export default AddEntryForm;
