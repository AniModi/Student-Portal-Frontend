import React, { useState, useEffect } from "react";
import "./AcademicsResultUpload.scss";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { uploadToIPFS } from "../uploadToPinata";
import { fetchDataAndCreateJSON } from "../createJSON";


export default function AcademicsResultUpload() {

  async function connect() {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("Metamask Connected");
      } else {
        console.log("Metamask Not Found");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  }

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
      label: "CPI",
      name: "CPI",
      type: "text",
      placeholder: "CPI",
      disabled: false,
    },
    {
      label: "SPI",
      name: "SPI",
      type: "text",
      placeholder: "SPI",
      disabled: false,
    },
    {
      label: "Result",
      name: "result_name",
      type: "file",
      placeholder: "Result",
      disabled: false,
    },
  ];

  const [form, setForm] = useState({});

  const handleForm = (e) => {
    if (e.target.type === "file") {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        result: e.target.files[0],
      });
    } else {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
  };
  const getHash = async (file) => {
    const hash = await uploadToIPFS(file);
    return hash;
  };
  console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = "";
      if (form.result) {
        result = await getHash(form.result);
      }
      const formDetails = form;
      formDetails["result"] = result;
      console.log(formDetails);
      const jwtToken = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/admin/upload-result",
        formDetails,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Result Uploaded Successfully");
      const { username, semester, CPI, SPI } = formDetails;
      fetchDataAndCreateJSON(username,semester, CPI, SPI);
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    connect();
  }, [])

  return (
    <div className="result_upload_container">
      <h1 className="result_upload_container__heading">Upload Result</h1>
      <div className="result_upload_container__fields">
        {formFields.map((item, index) => {
          return (
            <div className="result_upload_container__fields__field" key={index}>
              <Input {...item} onChange={handleForm}></Input>
            </div>
          );
        })}
      </div>
      <div className="result_upload_container__buttons">
        <button
          className="result_upload_container__buttons__button"
          onClick={handleSubmit}
        >
          Upload
        </button>
        <button
          className="result_upload_container__buttons__button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
