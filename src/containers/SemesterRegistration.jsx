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
  const [registrationData, setRegistrationData] = useState({});

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
      disabled: false,
    },
    {
      label: "No Dues Certificate",
      name: "No Dues Certificate",
      type: "text",
      placeholder: "No Dues Certificate",
      icon: <MdLock />,
      disabled: false,
    },
  ];

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

        setRegistrationData({
          ...registrationData,
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

  console.log(registrationData);

  const handleRegistrationData = (e) => {
    if (e.target.type === "file") {
      setRegistrationData({
        ...registrationData,
        [e.target.name]: e.target.value, // Assuming you only want to handle one file
        "file": e.target.files[0], // Assuming you only want to handle one file
      });
    } else {
      // Handle non-file input change
      setRegistrationData({
        ...registrationData,
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


  const isSubmitDisabled = false;
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
