import React from "react";
import "./Input.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useToggle from "../hooks/useToggle";

export default function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
  name,
  children,
  inputClass,
  genClass,
}) {
  const [showPassword, setShowPassword] = useToggle(false);

  if (type === "password") {
    return (
      <div className="input_component_container">
        <label htmlFor={name}>{label}</label>
        <div className={`input_component_container__input_password ${genClass}`}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            className={inputClass}
          />
          <div
            className="input_component_container__input__icon_eye"
            onClick={setShowPassword}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
          <div className="input_component_container__input__icon">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="input_component_container">
      <label htmlFor={name}>{label}</label>
      <div className={`input_component_container__input ${genClass}`}>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className={inputClass}
        />
        <div className="input_component_container__input__icon">{children}</div>
      </div>
    </div>
  );
}
