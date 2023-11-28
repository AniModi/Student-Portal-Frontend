import React from "react";
import "./RegistrationStatus.scss";

export default function RegistrationStatus() {
  return (
    <>
      <div className="registration_status_container">
        <div className="registration_status_container__title">
          Verification Status
        </div>
        <div className="registration_status_container__status">
          <div className="registration_status_container__status__container">
            <div className="registration_status_container__status__container__row">
              <div className="registration_status_container__status__container__row__label">
                Faculty Advisor
              </div>
              <div className="registration_status_container__status__container__row__status">
                <div className="registration_status_container__status__container__row__status__box"></div>
              </div>
            </div>
            <div className="registration_status_container__status__container__row">
              <div className="registration_status_container__status__container__row__label">
                Academics Department
              </div>
              <div className="registration_status_container__status__container__row__status">
                <div className="registration_status_container__status__container__row__status__box"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="registration_status_container__comments">
          <div className="registration_status_container__comments__title">
            Comments
          </div>
          <div className="registration_status_container__comments__container">
            
          </div>
        </div>
      </div>
    </>
  );
}
