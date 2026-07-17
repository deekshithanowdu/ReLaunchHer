import React from "react";
import { Link } from "react-router-dom";
import { Award, ArrowRight, HelpCircle } from "lucide-react";
import ProgressBar from "../common/ProgressBar";

const CareerComebackScore = ({ score }) => {
  const { total = 0, breakdown = {}, suggestions = [] } = score;

  // Simple feedback message based on score
  const getFeedbackMessage = (val) => {
    if (val >= 90) return { label: "Comeback Ready!", desc: "Excellent! You are highly prepared to secure a returnship or role.", color: "#10b981" };
    if (val >= 70) return { label: "Almost Ready", desc: "Great progress! Focus on outstanding items to solidify your launch.", color: "var(--primary-color)" };
    if (val >= 40) return { label: "Building Momentum", desc: "You are actively updating sections. Continue learning & mock prep.", color: "#f59e0b" };
    return { label: "Getting Started", desc: "Welcome to your comeback! Start by filling in profile details and resume blocks.", color: "#64748b" };
  };

  const feedback = getFeedbackMessage(total);

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="flex justify-between items-center">
        <h4 style={{ fontSize: "1.1rem" }}>Career Comeback Score</h4>
        <span style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontSize: "0.75rem", color: "var(--text-light)" }}>
          <HelpCircle size={14} /> Weighted index
        </span>
      </div>

      <div className="flex items-center gap-6" style={{ flexWrap: "wrap" }}>
        {/* Large Score Indicator Circle */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: `8px solid var(--border-color)`,
            borderTopColor: feedback.color,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative"
          }}
        >
          <span style={{ fontSize: "2rem", fontWeight: 800, color: "var(--secondary-color)", lineHeight: 1 }}>
            {total}
          </span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "2px" }}>
            / 100
          </span>
        </div>

        {/* Text description */}
        <div style={{ flex: 1, minWidth: "200px" }}>
          <h5 style={{ fontSize: "1.1rem", color: feedback.color, marginBottom: "0.25rem", fontWeight: 600 }}>
            {feedback.label}
          </h5>
          <p style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}>
            {feedback.desc}
          </p>
        </div>
      </div>

      {/* Grid of Breakdowns */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <h5 style={{ fontSize: "0.85rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Metrics Breakdown
        </h5>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Profile</span>
              <strong>{breakdown.profile || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.profile || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>

          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Resume</span>
              <strong>{breakdown.resume || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.resume || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>

          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Skills Assessment</span>
              <strong>{breakdown.skills || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.skills || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>

          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Portfolio Projects</span>
              <strong>{breakdown.portfolio || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.portfolio || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>

          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Interview Readiness</span>
              <strong>{breakdown.interview || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.interview || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>

          <div>
            <div className="flex justify-between mb-1" style={{ fontSize: "0.8rem" }}>
              <span>Applications logged</span>
              <strong>{breakdown.applications || 0}%</strong>
            </div>
            <ProgressBar value={breakdown.applications || 0} showLabel={false} height="5px" color="var(--primary-color)" />
          </div>
        </div>
      </div>

      {/* Suggested Next Steps */}
      {suggestions.length > 0 && (
        <div style={{ marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
          <h5 style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Recommended Next Steps
          </h5>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {suggestions.slice(0, 2).map((sug, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "between",
                  alignItems: "center",
                  backgroundColor: "var(--bg-main)",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  gap: "1rem"
                }}
              >
                <p style={{ fontSize: "0.85rem", color: "var(--text-main)", margin: 0, flex: 1 }}>
                  {sug.text}
                </p>
                <Link
                  to={sug.link}
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    whiteSpace: "nowrap"
                  }}
                >
                  {sug.actionLabel} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CareerComebackScore;
