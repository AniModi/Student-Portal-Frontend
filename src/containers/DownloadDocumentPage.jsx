import React, { useState } from "react";
import { FaWpforms } from "react-icons/fa";
import Input from "../components/Input";
import "./DownloadDocumentPage.scss";
import { saveAs } from "file-saver";
import axios from "axios";

export default function DownloadDocumentPage() {
  const id = window.location.pathname.split("/")[3];
  const data = {
    "registration-form": {
      title: "Registration Form",
      fields: [
        {
          label: "Semester",
          name: "Semester",
          type: "text",
          placeholder: "Semester",
          icon: <FaWpforms />,
        },
      ],
    },
    result: {
      title: "Result",
      fields: [
        {
          label: "Semester",
          name: "Semester",
          type: "text",
          placeholder: "Semester",
          icon: <FaWpforms />,
        },
      ],
    },
    "fee-receipt": {
      title: "Fee Receipt",
      fields: [
        {
          label: "Semester",
          name: "Semester",
          type: "text",
          placeholder: "Semester",
          icon: <FaWpforms />,
        },
      ],
    },
  };

  const [semester, setSemester] = useState("");

  const handleDownload = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if(id === "registration-form") {
      try {

        const response = await axios.get(`http://localhost:5000/api/fetch-documents/${username}/${semester}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const {registrationForm} = response.data;
        if(registrationForm) {
          const res = await axios.get("https://gateway.pinata.cloud/ipfs/" + registrationForm, {
            responseType: "blob",
          });
          saveAs(new Blob([res.data]), "registrationForm.pdf");
        }
      }
      catch(err) {
        console.log(err);
      }
      return;
    }
    if(id === "result") {
      try {

        const response = await axios.get(`http://localhost:5000/api/fetch-documents/${username}/${semester}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const {result} = response.data;
        if(result) {
          const res = await axios.get("https://gateway.pinata.cloud/ipfs/" + result, {
            responseType: "blob",
          });
          saveAs(new Blob([res.data]), "result.pdf");
        }
      }
      catch(err) {
        console.log(err);
      }
      return;
    }
    if(id === "fee-receipt") {
      try {

        const response = await axios.get(`http://localhost:5000/api/fetch-documents/${username}/${semester}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const {instituteFeeReceipt, hostelFeeReceipt, messFeeReceipt} = response.data;
        if(instituteFeeReceipt) {
          const res = await axios.get(
            "https://gateway.pinata.cloud/ipfs/" + instituteFeeReceipt,
            {
              responseType: "blob",
            }
          );
          saveAs(new Blob([res.data]), "instituteFeeReceipt.pdf");
        }
        if(hostelFeeReceipt) {
          const res = await axios.get(
            "https://gateway.pinata.cloud/ipfs/" + hostelFeeReceipt,
            {
              responseType: "blob",
            }
          );
          saveAs(new Blob([res.data]), "hostelFeeReceipt.pdf");
        }
        if(messFeeReceipt) {
          const res = await axios.get(
            "https://gateway.pinata.cloud/ipfs/" + messFeeReceipt,
            {
              responseType: "blob",
            }
          );
          saveAs(new Blob([res.data]), "messFeeReceipt.pdf");
        }
      }
      catch(err) {
        console.log(err);
      }
      return;
    }
  };

  return (
    <div className="document_download_container">
      <div className="document_download_container__title">
        {data[id]?.title}
      </div>
      <div className="document_download_container__fields">
        {data[id]?.fields?.map((item, index) => {
          return (
            <div
              className="document_download_container__fields__field"
              key={index}
            >
              <Input {...item} onChange={
                (e) => {
                  setSemester(e.target.value);
                }
              }></Input>
            </div>
          );
        })}
      </div>
      <div className="document_download_container__buttons">
        <button
          className="document_download_container__buttons__button"
          onClick={handleDownload}
        >
          Download
        </button>
        <button className="document_download_container__buttons__button">
          Cancel
        </button>
      </div>
    </div>
  );
}
