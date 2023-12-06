import React, { useEffect, useState } from "react";
import "./VerifyStudentFees.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const VerifyStudentFees = () => {
  const { id, semester } = useParams();
  const [data, setData] = useState({
    insReferences: "",
    hostelFeesStatus: "",
    messFeesStatus: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/verify-fees/get/${id}/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const d = response.data.data;
        setData(d);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApprove = async (type) => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/verify-fees/verify`,
        {
          username: id,
          semester: semester,
          [type]: true,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="verify_student_fees_container">
        <div className="verify_student_fees_container__title">
          Verification Status
        </div>
        <div className="verify_student_fees_container__status">
          <div className="verify_student_fees_container__status__container">
            <div className="verify_student_fees_container__status__container__row">
              <div className="verify_student_fees_container__status__container__row__label">
                Institute Fees
              </div>
              <div className="verify_student_fees_container__status__container__row__status">
                <div className="verify_student_fees_container__status__container__row__status__box">
                  {data.instituteFeeReferences}
                </div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button
                  className="verify_student_fees_container__status__container__row__buttons__button"
                  onClick={() => {
                    handleApprove("instituteFeeVerified");
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
            <div className="verify_student_fees_container__status__container__row">
              <div className="verify_student_fees_container__status__container__row__label">
                Hostel Fees
              </div>
              <div className="verify_student_fees_container__status__container__row__status">
                <div className="verify_student_fees_container__status__container__row__status__box">
                  {data.hostelFeeReferences}
                </div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button
                  className="verify_student_fees_container__status__container__row__buttons__button"
                  onClick={() => {
                    handleApprove("hostelFeeVerified");
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
            <div className="verify_student_fees_container__status__container__row">
              <div className="verify_student_fees_container__status__container__row__label">
                Mess Fees
              </div>
              <div className="verify_student_fees_container__status__container__row__status">
                <div className="verify_student_fees_container__status__container__row__status__box">
                  {data.messFeeReferences}
                </div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button
                  className="verify_student_fees_container__status__container__row__buttons__button"
                  onClick={() => {
                    handleApprove("messFeeVerified");
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="verify_student_fees_container__comments">
          <div className="verify_student_fees_container__comments__title">
            Comments
          </div>
          <div className="verify_student_fees_container__comments__container"></div>
          <button className="verify_student_fees_container__comments__button">
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyStudentFees;
