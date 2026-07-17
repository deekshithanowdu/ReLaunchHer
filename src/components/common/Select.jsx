import React from "react";

const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  error,
  required = false,
  placeholder = "Select an option",
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
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className="form-control"
        style={error ? { borderColor: "#ef4444" } : {}}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, idx) => {
          const isObj = typeof opt === "object";
          const val = isObj ? opt.value : opt;
          const labelText = isObj ? opt.label : opt;
          return (
            <option key={idx} value={val}>
              {labelText}
            </option>
          );
        })}
      </select>
      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.25rem" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
