import React, { useEffect, useState } from "react";
import "./FacultyStudentDetails.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function FacultyStudentDetails() {
  const { username, semester } = useParams();

  const [document, setDocument] = useState({});
  const [comment, setComment] = useState("");
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/registration/get-registration-details/${username}/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        setDocument({
          registrationForm: response.data.data.registrationForm,
          result: response.data.data.result || "",
        });
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApprove = async () => {
    try {
      const jwt = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/registration/approve-registration/${username}/${semester}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Approved");
      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/api/comment/faculty`,
        {
          username: username,
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
      alert("Comment added");
    } catch (err) {
      console.log(err);
      alert("Some error ocurred");
    }
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const jwt = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/registration/is-approved/${username}/${semester}`,
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          }
        );
        setVerified(response.data.data.registrationVerified);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div className="faculty_verification_status_container">
        <div className="faculty_verification_status_container__title">
          Verify Registration
        </div>
        <div className="faculty_verification_status_container__status">
          <div className="faculty_verification_status_container__status__container">
            <div className="faculty_verification_status_container__status__container__row">
              <div className="faculty_verification_status_container__status__container__row__label">
                Registration Form
              </div>
              <div className="faculty_verification_status_container__status__container__row__status">
                <div
                  className={`faculty_verification_status_container__status__container__row__status__box ${"yellow"}`}
                  onClick={() => {
                    window
                      .open(
                        `https://gateway.pinata.cloud/ipfs/${document.registrationForm}`,
                        "_blank"
                      )
                      .focus();
                  }}
                >
                  View
                </div>
              </div>
            </div>
            <div className="faculty_verification_status_container__status__container__row">
              <div className="faculty_verification_status_container__status__container__row__label">
                Result
              </div>
              <div className="faculty_verification_status_container__status__container__row__status">
                <div
                  className={`faculty_verification_status_container__status__container__row__status__box ${"yellow"}`}
                  onClick={() => {
                    window
                      .open(
                        `https://gateway.pinata.cloud/ipfs/${document.result}`,
                        "_blank"
                      )
                      .focus();
                  }}
                >
                  View
                </div>
              </div>
            </div>
            <div className="faculty_verification_status_container__status__container__row">
              <div className="faculty_verification_status_container__status__container__row__label">
                Action
              </div>
              <div className="faculty_verification_status_container__status__container__row__status">
                <button
                  className={`faculty_verification_status_container__status__container__row__status__box ${verified ? "disabled" : "green"}}`}
                  onClick={handleApprove}
                  disabled={verified}
                >
                  {verified ? "Approved" : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="faculty_verification_status_container__comments">
          <div className="faculty_verification_status_container__comments__title">
            Comments
          </div>
          <textarea
            className="faculty_verification_status_container__comments__container"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
          <button
            className="faculty_verification_status_container__comments__button"
            onClick={handleComment}
          >
            Add Comment
          </button>
        </div>
      </div>
    </>
  );
}
