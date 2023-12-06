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

  const [verified, setVerified] = useState({
    instituteFeeVerified: false,
    hostelFeeVerified: false,
    messFeeVerified: false,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/verify-fees/get-verified/${id}/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        const d = response.data.data;
        setData(d);
        setVerified({
          instituteFeeVerified: d.instituteFeeVerified,
          hostelFeeVerified: d.hostelFeeVerified,
          messFeeVerified: d.messFeeVerified,
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



  const [comment, setComment] = useState("");


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
      setVerified(verified); // re-render
      alert("Verification successful");
    } catch (err) {
      console.log(err);
      alert("Some error ocurred");
    }
  };

  const handleComment = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/comment/finance`,
        {
          username: id,
          semester: semester,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(response);
      alert("Comment added successfully");
    } catch (err) {
      console.log(err);
      alert("Some error ocurred");
    }
  }

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
                  className={`verify_student_fees_container__status__container__row__buttons__button ${
                    verified.instituteFeeVerified ? "disabled" : ""
                  }`}
                  onClick={() => {
                    handleApprove("instituteFeeVerified");
                  }}
                  disabled={verified.instituteFeeVerified}
                >
                  {verified.instituteFeeVerified ? "Approved" : "Approve"}
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
                  className={`verify_student_fees_container__status__container__row__buttons__button ${
                    verified.hostelFeeVerified ? "disabled" : ""
                  }`}
                  onClick={() => {
                    handleApprove("hostelFeeVerified");
                  }}
                  disabled={verified.hostelFeeVerified}
                >
                  {verified.hostelFeeVerified ? "Approved" : "Approve"}
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
                  className={`verify_student_fees_container__status__container__row__buttons__button ${
                    verified.messFeeVerified ? "disabled" : ""
                  }`}
                  onClick={() => {
                    handleApprove("messFeeVerified");
                  }}
                  disabled={verified.messFeeVerified}
                >
                  {verified.messFeeVerified ? "Approved" : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="verify_student_fees_container__comments">
          <div className="verify_student_fees_container__comments__title">
            Comments
          </div>
          <textarea className="verify_student_fees_container__comments__container" onChange={(e) => {
            setComment(e.target.value);
          }}></textarea>
          <button className="verify_student_fees_container__comments__button" onClick={
            handleComment
          }>
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyStudentFees;
