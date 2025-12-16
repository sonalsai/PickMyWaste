/* PasswordField.jsx */
import React, { forwardRef, useState } from "react";
import "./PasswordField.scss";

const PasswordField = forwardRef(({ label, error, ...props }, ref) => {
  return (
    <div className={`passwordField ${error ? "hasError" : ""}`}>
      <input type="password" ref={ref} placeholder=" " {...props} />
      <label>{label}</label>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

export default PasswordField;
