import React, { useEffect } from "react";
import { CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

const Toast = ({
  message,
  type = "success", // success, error, warning
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      bg: "var(--bg-card)",
      border: "1px solid #10b981",
      icon: <CheckCircle style={{ color: "#10b981" }} size={18} />
    },
    error: {
      bg: "var(--bg-card)",
      border: "1px solid #ef4444",
      icon: <XCircle style={{ color: "#ef4444" }} size={18} />
    },
    warning: {
      bg: "var(--bg-card)",
      border: "1px solid #f59e0b",
      icon: <AlertTriangle style={{ color: "#f59e0b" }} size={18} />
    }
  }[type];

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1100,
        backgroundColor: config.bg,
        border: config.border,
        borderRadius: "var(--radius-md)",
        padding: "1rem",
        boxShadow: "var(--shadow-lg)",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        minWidth: "300px",
        maxWidth: "400px",
        animation: "slideIn 0.3s ease-out"
      }}
    >
      <div>{config.icon}</div>
      <div style={{ flex: 1, fontSize: "0.9rem", color: "var(--text-main)" }}>
        {message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-light)",
          display: "flex",
          alignItems: "center"
        }}
      >
        <X size={16} />
      </button>
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
