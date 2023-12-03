import React from "react";
import Input from "../components/Input";
import "./ChangePassword.scss";

export default function ChangePassword() {
  const formFields = [
    {
      label: "Old Password",
      type: "password",
      placeholder: "Enter Old Password",
    },
    {
      label: "New Password",
      type: "password",
      placeholder: "Enter New Password",
    },
    {
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm New Password",
    },
  ];
  return (
    <div className="change_password_container">
      <div className="change_password_container__fields">
        {formFields.map((item, index) => {
          return (
            <div
              className="change_password_container__fields__field"
              key={index}
            >
              <Input {...item}></Input>
            </div>
          );
        })}
      </div>
      <div className="change_password_container__buttons">
        <button className="change_password_container__buttons__button">
          Change Password
        </button>
        <button className="change_password_container__buttons__button">
          Cancel
        </button>
      </div>
    </div>
  );
}
