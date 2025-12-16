/* PasswordField.jsx */
import React, { forwardRef } from "react";
import "./PasswordField.scss";

const PasswordField = forwardRef(({ label, error, icon, ...props }, ref) => {
  return (
    <div className={`passwordField ${error ? "hasError" : ""}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input type="password" ref={ref} placeholder=" " {...props} />
      <label>{label}</label>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

export default PasswordField;
