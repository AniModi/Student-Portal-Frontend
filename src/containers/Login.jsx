import React, { useState, useEffect } from 'react';
import './Login.scss';
import logo from '../assets/institute_logo.svg';
import { FaUser } from 'react-icons/fa';
import { MdLock } from 'react-icons/md';
import Input from '../components/Input';
import { Link } from 'react-router-dom';

export default function Login() {
  const [loginData, setLoginData] = useState({});
  const [invalidPassword, setInvalidPassword] = useState(false);

  const handleLoginData = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.Username === 'validUsername' && loginData.Password === 'validPassword') {
      console.log('Login successful');
      setInvalidPassword(false);
    } else {
      console.log('Invalid password');
      setInvalidPassword(true);
    }
  };

  useEffect(() => {
    if (invalidPassword) {
      setTimeout(() => {
        setInvalidPassword(false);
      }, 500);
    }
  }, [invalidPassword]);

  const isSubmitDisabled = !loginData.Username || !loginData.Password;


  return (
    <div className="login_page_container">
      <div className="login_page_container__login_box">
        <div className="login_page_container__login_box__logo_container">
          <img src={logo} alt="" />
        </div>
        <div className="login_page_container__login_box__inputs">
          <div className="login_page_container__login_box__inputs__input">
            <Input
              label={'Username'}
              name={'Username'}
              type={'text'}
              placeholder={'Username'}
              onChange={handleLoginData}
              inputClass={invalidPassword ? 'invalid' : ''}
              genClass={invalidPassword ? 'shake' : ''}
            >
              <FaUser />
            </Input>
          </div>
          <div className={"login_page_container__login_box__inputs__input password"}>
            <Input
              label={'Password'}
              name={'Password'}
              type={'password'}
              placeholder={'Password'}
              onChange={handleLoginData}
              inputClass={invalidPassword ? 'invalid' : ''}
              genClass={invalidPassword ? 'shake' : ''}
            >
              <MdLock />
            </Input>
          </div>
        </div>
        <div className="login_page_container__login_box__forgot_password_container">
          <Link to="/">Forgot Password?</Link>
        </div>
        <div className="login_page_container__login_box__login_button_container">
          <button onClick={handleSubmit} disabled={isSubmitDisabled} className={isSubmitDisabled && 'disabled'}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
