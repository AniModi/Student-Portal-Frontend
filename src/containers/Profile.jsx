import React from "react";
import "./Profile.scss";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const data = [
    {
      title: "Name",
      content: localStorage.getItem("name"),
    },
    {
      title: "Student ID",
      content: localStorage.getItem("username"),
    },
    {
      title: "Email Address",
      content: `${localStorage.getItem("username")}@iiitvadodara.ac.in`,
    },
  ];
  return (
    <>
      <div className="profile_container">
        <div className="profile_container__image_container">
          <img src="https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg" alt="profile" />
        </div>
        <div className="profile_container__info_container">
          {data.map((item, index) => {
            return (
              <div
                className="profile_container__info_container__info"
                key={index}
              >
                <div className="profile_container__info_container__info__title">
                  {item.title}
                </div>
                <div className="profile_container__info_container__info__content">
                  {item.content}
                </div>
              </div>
            );
          })}
          <div className="profile_container__info_container__buttons">
            <button className="profile_container__info_container__buttons__button" onClick={() => {
              navigate("/change-password");
            }}>
              Change Password
            </button>
            <button className="profile_container__info_container__buttons__button" onClick={() => {
              navigate('/change-wallet-address');
            }}>
              Change Wallet Address
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
