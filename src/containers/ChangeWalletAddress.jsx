import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import "./ChangeWalletAddress.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ChangeWalletAddress() {
  const navigate = useNavigate();
  const formFields = [
    {
      label: "Enter new wallet address",
      type: "text",
      placeholder: "Wallet Address",
      name : "walletAddress"
    },
  ];

  const [form, setForm] = useState({});
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    if (form.walletAddress) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [form])

  const handleSubmit = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await axios.post(
        "http://localhost:5000/api/auth/change-wallet-address/",
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
        alert("Wallet Address Changed Successfully");
        navigate(-1);
      } else {
        alert("Wallet Address Change Failed");
      }
    }
    catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="change_wallet_address_container">
      <div className="change_wallet_address_container__fields">
        {formFields.map((item, index) => {
          return (
            <div
              className="change_wallet_address_container__fields__field"
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
      <div className="change_wallet_address_container__buttons">
        <button className={`change_wallet_address_container__buttons__button ${isSubmitDisabled ? "disabled" : ""}`} disabled={isSubmitDisabled} onClick={
          handleSubmit
        }>
          Change Wallet Address
        </button>
        <button className="change_wallet_address_container__buttons__button" onClick = {() => {
          navigate(-1);
        }
        }>
          Cancel
        </button>
      </div>
    </div>
  );
}
