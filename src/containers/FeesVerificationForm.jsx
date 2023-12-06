import React, { useEffect, useState } from "react";
import "./FeesVerificationForm.scss";
import Input from "../components/Input";
import {
  FaCalendarAlt,
  FaReceipt,
  FaUser,
  FaWpforms,
} from "react-icons/fa";
import axios from "axios";

export default function FeesVerificationForm() {
  const [verificationData, setVerificationData] = useState({});

  const formFields = [
    {
      label: "Batch",
      name: "batch",
      type: "text",
      placeholder: "Batch",
      icon: <FaCalendarAlt />,
      disabled: true,
    },
    {
      label: "Student ID",
      name: "username",
      type: "text",
      placeholder: "Student ID",
      icon: <FaUser />,
      disabled: true,
    },
    {
      label: "Semester",
      name: "semester",
      type: "text",
      placeholder: "Semester",
      icon: <FaWpforms />,
      disabled: true,
    },
    {
      label: "Payment Proof (Institute)",
      name: "instituteFeeReferences",
      type: "text",
      placeholder: "Payment Proof (Institute)",
      icon: <FaReceipt />,
      disabled: false,
    },
    {
      label: "Payment Proof (Hostel)",
      name: "hostelFeeReferences",
      type: "text",
      placeholder: "Payment Proof (Hostel)",
      icon: <FaReceipt />,
      disabled: false,
    },
    {
      label: "Payment Proof (Mess)",
      name: "messFeeReferences",
      type: "text",
      placeholder: "Payment Proof (Mess)",
      icon: <FaReceipt />,
      disabled: false,
    },
  ];

  const handleVerificationData = (e) => {
    if (e.target.type === "file") {
      setVerificationData({
        ...verificationData,
        [e.target.name]: e.target.files,
      });
      return;
    }
    setVerificationData({
      ...verificationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/verify-fees/upload", verificationData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(response);

    }
    catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const studentId = localStorage.getItem("username");
    async function fetchRegistrationData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/admin/get-student/${studentId}`
        );
        const studentData = response.data.data;
        console.log(studentData);
        const batch = studentData.username.slice(0, 4);
        const admissionYear = parseInt(batch, 10);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const semester =
          2 * (currentYear - admissionYear) + (currentMonth <= 5 ? 0 : 1);

        setVerificationData({
          ...verificationData,
          batch: batch,
          semester: semester,
          username: studentData.username,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchRegistrationData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  

  const isSubmitDisabled = false;
  return (
    <div className="fees_verification_form_container">
      <div className="fees_verification_form_container__verification_box">
        <div className="fees_verification_form_container__verification_box__title">
          Verify Fees
        </div>
        <div className="fees_verification_form_container__verification_box__inputs">
          {formFields.map((field) => {
            return (
              <div className="fees_verification_form_container__verification_box__inputs__input">
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={verificationData[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleVerificationData}
                  disabled={field.disabled}
                >
                  {field.icon}
                </Input>
              </div>
            );
          })}
        </div>
        <div className="fees_verification_form_container__verification_box__verification_button_container">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled && "disabled"}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
