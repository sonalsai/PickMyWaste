/* PasswordField.jsx */
import React, { forwardRef, useState } from "react";
import "./PasswordField.scss";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = forwardRef(({ label, error, icon, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`passwordField ${error ? "hasError" : ""}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input
        type={showPassword ? "text" : "password"}
        ref={ref}
        placeholder=" "
        {...props}
      />
      <label>{label}</label>
      <button
        type="button"
        className="toggle-btn"
        onClick={() => setShowPassword(!showPassword)}
        tabIndex="-1"
      >
        {showPassword ? <FiEyeOff /> : <FiEye />}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

export default PasswordField;
