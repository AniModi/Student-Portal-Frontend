import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaWpforms } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import Input from "../components/Input";
import { FaGraduationCap } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import "./SemesterRegistration.scss";

export default function SemesterRegistration() {
  const [registrationData, setRegistrationData] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);

  const formFields = [
    {
      label: "Batch",
      name: "Batch",
      type: "text",
      placeholder: "Batch",
    },
    {
      label: "Student ID",
      name: "Student ID",
      type: "text",
      placeholder: "Student ID",
    },
    {
      label: "Semester",
      name: "Semester",
      type: "text",
      placeholder: "Semester",
    },
    {
      label: "Registration Form",
      name: "Registration Form",
      type: "File",
      placeholder: "Registration Form",
    },
    {
      label: "Result",
      name: "Result",
      type: "text",
      placeholder: "Result",
    },
    {
      label: "No Dues Certificate",
      name: "No Dues Certificate",
      type: "text",
      placeholder: "No Dues Certificate",
    },
  ];

  const handleRegistrationData = (e) => {
    if (e.target.type === "file") {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.files,
      });
      return;
    }
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(registrationData);
    if (
      registrationData.Username === "validUsername" &&
      registrationData.Password === "validPassword"
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
    <div className="student_registration_container">
      <div className="student_registration_container__registration_box">
        <div className="student_registration_container__registration_box__title">
          Registration
        </div>
        <div className="student_registration_container__registration_box__inputs">
          {formFields.map((field) => {
            return (
              <div className="student_registration_container__registration_box__inputs__input">
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  onChange={handleRegistrationData}
                  inputClass={invalidPassword ? "invalid" : ""}
                  genClass={invalidPassword ? "shake" : ""}
                >
                  <FaGraduationCap />
                </Input>
              </div>
            );
          })}
        </div>
        <div className="student_registration_container__registration_box__registration_button_container">
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
