import React, { useState } from "react";
import "./FinanceUpload.scss";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadToIPFS } from "../uploadToPinata";

const FinanceUpload = () => {
  const formFields = [
    {
      label: "Batch",
      name: "batch",
      type: "text",
      placeholder: "Batch",
      disabled: false,
    },
    {
      label: "Student ID",
      name: "username",
      type: "text",
      placeholder: "Student ID",
      disabled: false,
    },
    {
      label: "Semester",
      name: "semester",
      type: "text",
      placeholder: "Semester",
      disabled: false,
    },
    {
      label: "Institute Fees Receipt",
      name: "instituteFeeReceipt",
      type: "file",
      placeholder: "Institute Fees Receipt",
      disabled: false,
    },
    {
      label: "Hostel Fees Receipt",
      name: "hostelFeeReceipt",
      type: "file",
      placeholder: "",
      disabled: false,
    },
    {
      label: "Mess Fees Receipt",
      name: "messFeeReceipt",
      type: "file",
      placeholder: "",
      disabled: false,
    },
  ];

  const [form, setForm] = useState({});

  const handleForm = (e) => {
    if (e.target.type === "file" && e.target.name === "instituteFeeReceipt") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        "instiFile": e.target.files[0],
      });
    } else if (e.target.type === "file" && e.target.name === "hostelFeeReceipt") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        "hostelFile": e.target.files[0],
      });
    } 
    else if (e.target.type === "file" && e.target.name === "messFeeReceipt") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        "messFile": e.target.files[0],
      });
    }
    else {
      // Handle non-file input change
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const getHash = async (file) => {
    const hash = await uploadToIPFS(file);
    return hash;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let instituteFeesReceipt = "";
      if(form.instituteFeeReceipt) {
        instituteFeesReceipt = await getHash(form.instiFile);
      }
      let hostelFeesReceipt = "";
      if(form.hostelFeeReceipt) {
        hostelFeesReceipt = await getHash(form.hostelFile);
      }
      let messFeesReceipt = "";
      if(form.messFeeReceipt) {
        messFeesReceipt = await getHash(form.messFile);
      }
      const formDetails = form
      formDetails["instituteFeeReceipt"] = instituteFeesReceipt;
      formDetails["hostelFeeReceipt"] = hostelFeesReceipt;
      formDetails["messFeeReceipt"] = messFeesReceipt;
      console.log(formDetails);
      const jwtToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/verify-fees/upload-receipts",
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
      // setForm({});
    } catch (err) {
      console.log(err);
    }
  }


  const navigate = useNavigate();

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
              <Input {...item} onChange={handleForm}></Input>
            </div>
          );
        })}
      </div>
      <div className="finance_upload_container__buttons">
        <button className="finance_upload_container__buttons__button" onClick={handleSubmit}>
          Upload
        </button>
        <button className="finance_upload_container__buttons__button" onClick={() => {
          navigate(-1);
        }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FinanceUpload;
