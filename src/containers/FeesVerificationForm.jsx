import React, { useEffect, useState } from "react";
import "./FeesVerificationForm.scss";
import Input from "../components/Input";
import {
  FaCalendarAlt,
  FaReceipt,
  FaUser,
  FaWpforms,
} from "react-icons/fa";

export default function FeesVerificationForm() {
  const [verificationData, setVerificationData] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);

  const formFields = [
    {
      label: "Batch",
      name: "Batch",
      type: "text",
      placeholder: "Batch",
      icon: <FaCalendarAlt />,
    },
    {
      label: "Student ID",
      name: "Student ID",
      type: "text",
      placeholder: "Student ID",
      icon: <FaUser />,
    },
    {
      label: "Semester",
      name: "Semester",
      type: "text",
      placeholder: "Semester",
      icon: <FaWpforms />,
    },
    {
      label: "Payment Proof (Institute)",
      name: "Payment Proof (Institute)",
      type: "text",
      placeholder: "Payment Proof (Institute)",
      icon: <FaReceipt />,
    },
    {
      label: "Payment Proof (Hostel)",
      name: "Payment Proof (Hostel)",
      type: "text",
      placeholder: "Payment Proof (Hostel)",
      icon: <FaReceipt />,
    },
    {
      label: "Payment Proof (Mess)",
      name: "Payment Proof (Mess)",
      type: "text",
      placeholder: "Payment Proof (Mess)",
      icon: <FaReceipt />,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(verificationData);
    if (
      verificationData.Username === "validUsername" &&
      verificationData.Password === "validPassword"
    ) {
      console.log("Login successful");
      setInvalidPassword(false);
    } else {
      console.log("Invalid password");
      setInvalidPassword(true);
    }
  };

  useEffect(() => {
    if (invalidPassword) {
      setTimeout(() => {
        setInvalidPassword(false);
      }, 500);
    }
  }, [invalidPassword]);

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
                  placeholder={field.placeholder}
                  onChange={handleVerificationData}
                  inputClass={invalidPassword ? "invalid" : ""}
                  genClass={invalidPassword ? "shake" : ""}
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
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
