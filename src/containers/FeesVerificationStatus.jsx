import React from "react";
import "./FeesVerificationStatus.scss";

export default function FeesVerificationStatus() {
  return (
    <>
      <div className="fees_verification_status_container">
        <div className="fees_verification_status_container__title">
          Verification Status
        </div>
        <div className="fees_verification_status_container__status">
          <div className="fees_verification_status_container__status__container">
            <div className="fees_verification_status_container__status__container__row">
              <div className="fees_verification_status_container__status__container__row__label">
                Institute Fees
              </div>
              <div className="fees_verification_status_container__status__container__row__status">
                <div className="fees_verification_status_container__status__container__row__status__box"></div>
              </div>
            </div>
            <div className="fees_verification_status_container__status__container__row">
              <div className="fees_verification_status_container__status__container__row__label">
                Hostel Fees
              </div>
              <div className="fees_verification_status_container__status__container__row__status">
                <div className="fees_verification_status_container__status__container__row__status__box"></div>
              </div>
            </div>
            <div className="fees_verification_status_container__status__container__row">
              <div className="fees_verification_status_container__status__container__row__label">
                Mess Fees
              </div>
              <div className="fees_verification_status_container__status__container__row__status">
                <div className="fees_verification_status_container__status__container__row__status__box"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="fees_verification_status_container__comments">
          <div className="fees_verification_status_container__comments__title">
            Comments
          </div>
          <div className="fees_verification_status_container__comments__container"></div>
        </div>
      </div>
    </>
  );
}
