import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Calendar, Sparkles } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import Badge from "../common/Badge";

const JobCard = ({ job, compatibility = 0 }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <div className="flex justify-between items-start gap-4 mb-2">
          <div>
            <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>
              {job.title}
            </h4>
            <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", fontWeight: 500 }}>
              {job.company}
            </span>
          </div>
          
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.25rem" }}>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: compatibility >= 85 ? "#10b981" : "var(--primary-color)",
                backgroundColor: compatibility >= 85 ? "#d1fae5" : "var(--primary-light)",
                padding: "0.3rem 0.6rem",
                borderRadius: "var(--radius-sm)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <Sparkles size={12} />
              {compatibility}% Compatibility
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "0.75rem" }} className="job-meta-row">
          <div className="flex items-center gap-1" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <MapPin size={14} style={{ color: "var(--text-light)" }} />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Briefcase size={14} style={{ color: "var(--text-light)" }} />
            <span>{job.jobType}</span>
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <DollarSign size={14} style={{ color: "var(--text-light)" }} />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center gap-1" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <Calendar size={14} style={{ color: "var(--text-light)" }} />
            <span>Posted {formatDate(job.postedDate)}</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", lineBreak: "anywhere" }}>
        {job.description.length > 160 ? `${job.description.substring(0, 160)}...` : job.description}
      </p>

      {/* Required Skills tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {job.skills.map((skill, idx) => (
          <span
            key={idx}
            style={{
              fontSize: "0.75rem",
              backgroundColor: "var(--bg-main)",
              color: "var(--text-muted)",
              padding: "0.2rem 0.5rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--border-color)"
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-2" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Badge variant={job.isReturnship ? "success" : "primary"}>
            {job.category}
          </Badge>
          {job.isFlexible && <Badge variant="info">Flexible Hours</Badge>}
        </div>

        <Link to={`/jobs/${job.id}`} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
