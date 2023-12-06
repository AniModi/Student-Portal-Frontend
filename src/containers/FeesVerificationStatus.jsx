import React, { useEffect, useState } from "react";
import "./FeesVerificationStatus.scss";
import axios from "axios";

export default function FeesVerificationStatus() {
  const [status, setStatus] = useState({
    instituteFeeVerified: true,
    hostelFeeVerified: false,
    messFeeVerified: false,
  });

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
          `http://localhost:5000/api/verify-fees/get-verified/${username}/${semester}`
        );
        const data = response.data.data;
        setStatus((prev) => {
          return {
            ...prev,
            instituteFeeVerified: data.instituteFeeVerified,
            hostelFeeVerified: data.hostelFeeVerified,
            messFeeVerified: data.messFeeVerified,
          };
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchStatus();
  }, []);

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
                <div
                  className={`fees_verification_status_container__status__container__row__status__box ${
                    status.instituteFeeVerified ? "green" : "yellow"
                  }`}
                >
                  {status.instituteFeeVerified ? "Verified" : "Pending"}
                </div>
              </div>
            </div>
            <div className="fees_verification_status_container__status__container__row">
              <div className="fees_verification_status_container__status__container__row__label">
                Hostel Fees
              </div>
              <div className="fees_verification_status_container__status__container__row__status">
                <div
                  className={`fees_verification_status_container__status__container__row__status__box ${
                    status.hostelFeeVerified ? "green" : "yellow"
                  }`}
                >
                  {status.hostelFeeVerified ? "Verified" : "Pending"}
                </div>
              </div>
            </div>
            <div className="fees_verification_status_container__status__container__row">
              <div className="fees_verification_status_container__status__container__row__label">
                Mess Fees
              </div>
              <div className="fees_verification_status_container__status__container__row__status">
                <div
                  className={`fees_verification_status_container__status__container__row__status__box ${
                    status.messFeeVerified ? "green" : "yellow"
                  }`}
                >
                  {status.messFeeVerified ? "Verified" : "Pending"}
                </div>
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
