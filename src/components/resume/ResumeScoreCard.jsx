import React from "react";
import ProgressBar from "../common/ProgressBar";
import { Check, AlertCircle } from "lucide-react";

const ResumeScoreCard = ({ resumeData }) => {
  const {
    fullName = "",
    email = "",
    phone = "",
    preferredLocation = "",
    summary = "",
    experience = [],
    projects = [],
    education = []
  } = resumeData;

  const checks = [
    { label: "Contact Information", checked: !!fullName && !!email && !!phone && !!preferredLocation },
    { label: "Comeback Summary", checked: !!summary && summary.trim().length > 50 },
    { label: "Work Experience Added", checked: experience.length > 0 },
    { label: "Portfolio Projects Listed", checked: projects.length > 0 },
    { label: "Education Records", checked: education.length > 0 }
  ];

  const passCount = checks.filter(c => c.checked).length;
  const score = Math.round((passCount / checks.length) * 100);

  const getSuggestions = () => {
    const list = [];
    if (!summary || summary.trim().length <= 50) {
      list.push("Write a robust professional summary (50+ characters) clearly stating your career break transition.");
    }
    if (experience.length === 0) {
      list.push("Add at least one previous work experience entry detailing past accomplishments.");
    }
    if (projects.length === 0) {
      list.push("List at least one modern project to demonstrate active skills and practice.");
    }
    if (education.length === 0) {
      list.push("Add your academic background or degrees.");
    }
    return list;
  };

  const suggestions = getSuggestions();

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <h4 style={{ fontSize: "1.05rem", fontWeight: 600 }}>Resume Optimizer Score</h4>
      
      <div className="flex items-center gap-4">
        <div style={{ width: "70px", height: "70px", borderRadius: "50%", border: "6px solid var(--border-color)", borderTopColor: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
          {score}%
        </div>
        <div>
          <h5 style={{ fontSize: "0.95rem", color: score === 100 ? "#10b981" : "var(--primary-color)", fontWeight: 600 }}>
            {score === 100 ? "Ready to Launch!" : "Improvements Suggested"}
          </h5>
          <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
            {passCount} of {checks.length} sections configured correctly.
          </p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {checks.map((c, idx) => (
          <div key={idx} className="flex items-center gap-2" style={{ fontSize: "0.85rem" }}>
            {c.checked ? (
              <Check size={16} style={{ color: "#10b981" }} />
            ) : (
              <AlertCircle size={16} style={{ color: "var(--text-light)" }} />
            )}
            <span style={{ color: c.checked ? "var(--text-main)" : "var(--text-muted)" }}>
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {suggestions.length > 0 && (
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "0.5rem" }}>
          <h5 style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Optimization Suggestions
          </h5>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {suggestions.map((sug, idx) => (
              <li key={idx} style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", gap: "6px", alignItems: "start" }}>
                <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>&bull;</span>
                <span>{sug}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeScoreCard;
