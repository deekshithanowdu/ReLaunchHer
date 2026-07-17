import React from "react";
import { FolderOpen } from "lucide-react";
import Button from "./Button";

const EmptyState = ({
  title = "No items found",
  description = "Get started by adding one or updating your filters.",
  icon = <FolderOpen size={48} style={{ color: "var(--text-light)" }} />,
  actionLabel = "",
  onAction = null
}) => {
  return (
    <div
      className="card text-center"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        backgroundColor: "var(--bg-card)",
        border: "1px dashed var(--border-color)",
        boxShadow: "none"
      }}
    >
      <div className="mb-4">{icon}</div>
      <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{title}</h4>
      <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: "400px", marginBottom: "1.5rem" }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
