import React from "react";

const ProgressBar = ({
  value = 0,
  max = 100,
  showLabel = true,
  height = "8px",
  color = "var(--primary-color)",
  className = ""
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
          <span style={{ color: "var(--text-muted)" }}>Progress</span>
          <span style={{ color: "var(--secondary-color)" }}>{percentage}%</span>
        </div>
      )}
      <div
        style={{
          width: "100%",
          height: height,
          backgroundColor: "var(--border-color)",
          borderRadius: "9999px",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: color,
            borderRadius: "9999px",
            transition: "width 0.5s ease-out"
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
