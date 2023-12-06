import React from "react";
import { FaWpforms } from "react-icons/fa";
import Input from "../components/Input";
import "./DownloadDocumentPage.scss";


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
              <Input {...item}></Input>
            </div>
          );
        })}
      </div>
      <div className="document_download_container__buttons">
        <button className="document_download_container__buttons__button">
          Download
        </button>
        <button className="document_download_container__buttons__button">
          Cancel
        </button>
      </div>
    </div>
  )
}
