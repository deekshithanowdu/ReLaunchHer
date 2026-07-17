import React from "react";

const Loader = ({ fullScreen = false, size = "md", text = "Loading your comeback..." }) => {
  const sizePixels = {
    sm: "24px",
    md: "48px",
    lg: "64px"
  }[size];

  const spinner = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
      <div
        style={{
          width: sizePixels,
          height: sizePixels,
          border: "4px solid var(--border-color)",
          borderTopColor: "var(--primary-color)",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}
      />
      {text && <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", fontWeight: 500 }}>{text}</p>}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "var(--bg-main)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000
        }}
      >
        {spinner}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0" }}>
      {spinner}
    </div>
  );
};

export default Loader;
