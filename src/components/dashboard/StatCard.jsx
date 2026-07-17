import React from "react";

const StatCard = ({ title, value, icon, description, trend, onClick }) => {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "between",
        height: "100%",
        padding: "1.25rem"
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)" }}>
          {title}
        </span>
        <div
          style={{
            padding: "0.5rem",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "var(--primary-light)",
            color: "var(--primary-color)",
            display: "flex",
            alignItems: "center"
          }}
        >
          {icon}
        </div>
      </div>
      <div>
        <h3 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          {value}
        </h3>
        <div className="flex items-center gap-2">
          {trend && (
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#10b981" }}>
              {trend}
            </span>
          )}
          {description && (
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
              {description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
