import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Briefcase } from "lucide-react";
import Badge from "../common/Badge";

const RecommendedJobCard = ({ job, compatibilityScore }) => {
  return (
    <div
      className="card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "between",
        gap: "1rem"
      }}
    >
      <div>
        <div className="flex justify-between items-start gap-2 mb-2">
          <div>
            <h5 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.15rem" }}>
              {job.title}
            </h5>
            <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 500 }}>
              {job.company}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: compatibilityScore >= 80 ? "#10b981" : "var(--primary-color)",
                backgroundColor: compatibilityScore >= 80 ? "#d1fae5" : "var(--primary-light)",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-sm)"
              }}
            >
              {compatibilityScore}% Match
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3" style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={12} /> {job.jobType}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", fontSize: "0.85rem" }}>
        <Badge variant={job.isReturnship ? "success" : "primary"}>
          {job.category}
        </Badge>
        <Link
          to={`/jobs/${job.id}`}
          style={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "0.15rem"
          }}
        >
          Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RecommendedJobCard;
