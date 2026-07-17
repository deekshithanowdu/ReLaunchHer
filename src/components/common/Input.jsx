import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`form-group ${className}`}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
        style={error ? { borderColor: "#ef4444" } : {}}
        {...props}
      />
      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
