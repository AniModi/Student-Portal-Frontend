import React from "react";
import "./Profile.scss";

export default function Profile() {



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
          <img src="https://picsum.photos/seed/picsum/200/300" alt="profile" />
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
            <button className="profile_container__info_container__buttons__button">
              Change Password
            </button>
            <button className="profile_container__info_container__buttons__button">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
