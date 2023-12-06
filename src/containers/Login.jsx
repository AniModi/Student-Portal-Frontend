import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Login.scss";
import logo from "../assets/institute_logo.svg";
import { FaUser } from "react-icons/fa";
import { MdLock } from "react-icons/md";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    async function checkAuth() {
      try {

        const res = await axios
        .get("http://localhost:5000/api/auth/is-authenticated", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (res.status === 200) {
          navigate(`/${role}/home`);
        }
      }
      catch(err){
        console.log(err);
      }
    }
    checkAuth();
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login/",
        loginData
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("name", response.data.name);
        navigate(`${response.data.role}/home`);
      } else {
        setInvalidPassword(true);
      }
    } catch (err) {
      setInvalidPassword(true);
      console.log(err);
    }
  };

  useEffect(() => {
    if (invalidPassword) {
      setTimeout(() => {
        setInvalidPassword(false);
      }, 500);
    }
  }, [invalidPassword]);

  const isSubmitDisabled = !loginData.username || !loginData.password;

  return (
    <div className="login_page_container">
      <div className="login_page_container__login_box">
        <div className="login_page_container__login_box__logo_container">
          <img src={logo} alt="" />
        </div>
        <div className="login_page_container__login_box__inputs">
          <div className="login_page_container__login_box__inputs__input">
            <Input
              label={"Username"}
              name={"username"}
              type={"text"}
              placeholder={"Username"}
              onChange={handleLoginData}
              inputClass={invalidPassword ? "invalid" : ""}
              genClass={invalidPassword ? "shake" : ""}
            >
              <FaUser />
            </Input>
          </div>
          <div
            className={
              "login_page_container__login_box__inputs__input password"
            }
          >
            <Input
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Password"}
              onChange={handleLoginData}
              inputClass={invalidPassword ? "invalid" : ""}
              genClass={invalidPassword ? "shake" : ""}
            >
              <MdLock />
            </Input>
          </div>
        </div>
        <div className="login_page_container__login_box__login_button_container">
          <button
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
            className={isSubmitDisabled && "disabled"}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
