import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaWpforms } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import Input from "../components/Input";
import { FaGraduationCap } from "react-icons/fa";
import { CiMemoPad } from "react-icons/ci";
import "./SemesterRegistration.scss";
import axios from "axios";
import { uploadToIPFS } from "../uploadToPinata";

export default function SemesterRegistration() {
  const [registrationData, setRegistrationData] = useState({
    batch: "",
    username: "",
    semester: "",
    registrationForm: "",
    result: "Not Published",
    noDueCertificates: "Not Verified",
  });

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
      label: "Registration Form",
      name: "registrationForm",
      type: "File",
      placeholder: "Registration Form",
      icon: <CiMemoPad />,
      disabled: false,
    },
    {
      label: "Result",
      name: "result",
      type: "text",
      placeholder: "Result",
      icon: <FaGraduationCap />,
      disabled: true,
    },
    {
      label: "No Dues Certificate",
      name: "noDueCertificates",
      type: "text",
      placeholder: "No Dues Certificate",
      icon: <MdLock />,
      disabled: true,
    },
  ];

  useEffect(() => {
    const username = localStorage.getItem("username");
    const batch = username.slice(0, 4);
    const admissionYear = parseInt(batch, 10);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const semester =
      2 * (currentYear - admissionYear) + (currentMonth <= 5 ? 0 : 1);
    async function fetchVerificationData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/verify-fees/get-verified/${username}/${semester}`
        );
        const result = {
          result: "Not Published",
          noDueCertificates: "Not Verified",
          batch: batch,
          username: username,
          semester: semester,
        };
        const verifications = response.data.data;
        if (
          verifications.instituteFeeVerified &&
          verifications.hostelFeeVerified &&
          verifications.messFeeVerified
        ) {
          result.noDueCertificates = "Verified";
        }
        if (verifications.resultPublished) {
          result.result = "Published";
        }
        setRegistrationData({
          ...registrationData,
          ...result,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchVerificationData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(registrationData);

  const handleRegistrationData = (e) => {
    if (e.target.type === "file") {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
        file: e.target.files[0],
      });
    } else {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const getHash = async (file) => {
    const hash = await uploadToIPFS(file);
    return hash;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const hash = await getHash(registrationData.file);

      const jwtToken = localStorage.getItem("token");
      registrationData["registrationForm"] = hash;
      const res = await axios.post(
        "http://localhost:5000/api/registration/register",
        registrationData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(registrationData);

  const isSubmitDisabled = registrationData.registrationForm === "" || registrationData.result === "Not Published" || registrationData.noDueCertificates === "Not Verified";
  return (
    <div className="student_registration_container">
      <div className="student_registration_container__registration_box">
        <div className="student_registration_container__registration_box__title">
          Registration
        </div>
        <div className="student_registration_container__registration_box__inputs">
          {formFields.map((field, index) => {
            return (
              <div
                className="student_registration_container__registration_box__inputs__input"
                key={index}
              >
                <Input
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  value={registrationData[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleRegistrationData}
                  disabled={field.disabled}
                >
                  {field.icon}
                </Input>
              </div>
            );
          })}
        </div>
        <div className="student_registration_container__registration_box__registration_button_container">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "disabled" : ""}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
