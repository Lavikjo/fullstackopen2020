import React from "react";
import { useStateValue } from "../state";

const DiagnoseComponent: React.FC<{ codes: string[] | undefined }> = ({ codes }) => {
  const [{ diagnoses },] = useStateValue();

  return (
    <ul>
      {codes?.map((code: string) => (
        <li key={code}>{code} {diagnoses[code]?.name}</li>
      ))}
    </ul>);
};

export default DiagnoseComponent;