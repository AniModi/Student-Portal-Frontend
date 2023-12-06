import React, { useEffect, useState } from "react";
import "./RegistrationStatus.scss";
import axios from "axios";

export default function RegistrationStatus() {
  const [status, setStatus] = useState(false);

  useEffect(() => {
    async function fetchStatus() {
      try {
        const username = localStorage.getItem("username");
        const batch = username.slice(0, 4);
        const admissionYear = parseInt(batch, 10);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const semester =
          2 * (currentYear - admissionYear) + (currentMonth <= 5 ? 0 : 1);
        const response = await axios.get(
          `http://localhost:5000/api/registration/is-approved/${username}/${semester}`
        );
        const data = response.data.data.registrationVerified;
        setStatus(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStatus();
  }, []);

  console.log(status);


  return (
    <>
      <div className="registration_status_container">
        <div className="registration_status_container__title">
          Registration Status
        </div>
        <div className="registration_status_container__status">
          <div className="registration_status_container__status__container">
            <div className="registration_status_container__status__container__row">
              <div className="registration_status_container__status__container__row__label">
                Faculty Advisor
              </div>
              <div className="registration_status_container__status__container__row__status">
                <div className={`registration_status_container__status__container__row__status__box ${status ? "green" : "yellow"}`}>
                  {status ? "Verified" : "Pending"}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="registration_status_container__comments">
          <div className="registration_status_container__comments__title">
            Comments
          </div>
          <div className="registration_status_container__comments__container"></div>
        </div>
      </div>
    </>
  );
}
