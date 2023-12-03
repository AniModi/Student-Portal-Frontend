import React from "react";
import "./VerifyStudentFees.scss";

const VerifyStudentFees = () => {
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
                <div className="verify_student_fees_container__status__container__row__status__box"></div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button className="verify_student_fees_container__status__container__row__buttons__button">
                  Approve
                </button>
              </div>
            </div>
            <div className="verify_student_fees_container__status__container__row">
              <div className="verify_student_fees_container__status__container__row__label">
                Hostel Fees
              </div>
              <div className="verify_student_fees_container__status__container__row__status">
                <div className="verify_student_fees_container__status__container__row__status__box"></div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button className="verify_student_fees_container__status__container__row__buttons__button">
                  Approve
                </button>
              </div>
            </div>
            <div className="verify_student_fees_container__status__container__row">
              <div className="verify_student_fees_container__status__container__row__label">
                Mess Fees
              </div>
              <div className="verify_student_fees_container__status__container__row__status">
                <div className="verify_student_fees_container__status__container__row__status__box"></div>
              </div>
              <div className="verify_student_fees_container__status__container__row__buttons">
                <button className="verify_student_fees_container__status__container__row__buttons__button">
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
