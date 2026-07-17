import React from "react";
import ProgressBar from "../common/ProgressBar";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProgressCard = ({ title, progress, description, actionLink, actionLabel }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", justify: "between", height: "100%" }}>
      <div>
        <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{title}</h4>
        {description && (
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>
            {description}
          </p>
        )}
      </div>

      <div style={{ marginTop: "auto" }}>
        <ProgressBar value={progress} showLabel={true} className="mb-4" />
        
        {actionLink && actionLabel && (
          <Link
            to={actionLink}
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem"
            }}
          >
            {actionLabel} <ArrowRight size={14} />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProgressCard;
