import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import "./ChangePassword.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangePassword() {
  const navigate = useNavigate();
  const formFields = [
    {
      label: "Old Password",
      type: "password",
      placeholder: "Enter Old Password",
      name : "oldPassword"
    },
    {
      label: "New Password",
      type: "password",
      placeholder: "Enter New Password",
      name : "newPassword"
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm New Password",
      name : "confirmPassword"
    },
  ];

  const [form, setForm] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (form.newPassword === form.confirmPassword && form.newPassword !== "" && form.oldPassword !== "" && form.newPassword?.length >= 6) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [form])

  const handleSubmit = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.post(
        "http://localhost:5000/api/auth/change-password/",
        {
          username,
          ...form
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Password Changed Successfully");
        navigate(-1);
      } else {
        alert("Password Change Failed");
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change_password_container">
      <div className="change_password_container__fields">
        {formFields.map((item, index) => {
          return (
            <div
              className="change_password_container__fields__field"
              key={index}
            >
              <Input {...item} onChange={
                (e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }
              }></Input>
            </div>
          );
        })}
      </div>
      <div className="change_password_container__buttons">
        <button className={`change_password_container__buttons__button ${isSubmitDisabled ? "disabled" : ""}`} disabled={isSubmitDisabled} onClick={
          handleSubmit
        }>
          Change Password
        </button>
        <button className="change_password_container__buttons__button" onClick = {() => {
          navigate(-1);
        }
        }>
          Cancel
        </button>
      </div>
    </div>
  );
}
