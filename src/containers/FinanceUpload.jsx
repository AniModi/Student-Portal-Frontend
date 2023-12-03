import React from "react";
import "./FinanceUpload.scss";
import Input from "../components/Input";

const FinanceUpload = () => {
  const formFields = [
    {
      label: "Batch",
      type: "text",
      placeholder: "Batch",
    },
    {
      label: "Student ID",
      type: "text",
      placeholder: "Student ID",
    },
    {
      label: "Semester",
      type: "text",
      placeholder: "Semester",
    },
    {
      label: "Institute Fees Receipt",
      type: "file",
      placeholder: "",
    },
    {
      label: "Hostel Fees Receipt",
      type: "file",
      placeholder: "",
    },
    {
      label: "Mess Fees Receipt",
      type: "file",
      placeholder: "",
    },
  ];
  return (
    <div className="finance_upload_container">
      <h1 className="finance_upload_container__heading">Upload Receipts</h1>
      <div className="finance_upload_container__fields">
        {formFields.map((item, index) => {
          return (
            <div
              className="finance_upload_container__fields__field"
              key={index}
            >
              <Input {...item}></Input>
            </div>
          );
        })}
      </div>
      <div className="finance_upload_container__buttons">
        <button className="finance_upload_container__buttons__button">
          Change Password
        </button>
        <button className="finance_upload_container__buttons__button">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FinanceUpload;
