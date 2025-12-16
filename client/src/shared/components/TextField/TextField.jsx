/* TextField.jsx */
import React, { forwardRef } from "react";
import "./TextField.scss";

const TextField = forwardRef(({ label, error, icon, ...props }, ref) => {
  return (
    <div className={`textField ${error ? "hasError" : ""}`}>
      {icon && <span className="input-icon">{icon}</span>}
      <input ref={ref} placeholder=" " {...props} />
      <label>{label}</label>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

export default TextField;
