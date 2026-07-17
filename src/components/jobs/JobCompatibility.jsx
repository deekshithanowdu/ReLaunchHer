import React from "react";
import ProgressBar from "../common/ProgressBar";
import { CheckCircle2, AlertCircle } from "lucide-react";

const JobCompatibility = ({ compatibility = {} }) => {
  const { total = 0, breakdown = {} } = compatibility;

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div className="flex justify-between items-center" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
        <h4 style={{ fontSize: "1.05rem", fontWeight: 600 }}>Compatibility Breakdown</h4>
        <span style={{ fontSize: "1.25rem", fontWeight: 800, color: total >= 80 ? "#10b981" : "var(--primary-color)" }}>
          {total}%
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {/* Skills Match 30% */}
        <div>
          <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem" }}>
            <span className="flex items-center gap-1 font-medium">
              Skills Match <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>(30% weight)</span>
            </span>
            <span style={{ fontWeight: 600 }}>{breakdown.skills || 0}%</span>
          </div>
          <ProgressBar value={breakdown.skills || 0} showLabel={false} height="6px" color="#a78bfa" />
        </div>

        {/* Experience Match 20% */}
        <div>
          <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem" }}>
            <span className="flex items-center gap-1 font-medium">
              Experience Match <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>(20% weight)</span>
            </span>
            <span style={{ fontWeight: 600 }}>{breakdown.experience || 0}%</span>
          </div>
          <ProgressBar value={breakdown.experience || 0} showLabel={false} height="6px" color="#34d399" />
        </div>

        {/* Location Match 15% */}
        <div>
          <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem" }}>
            <span className="flex items-center gap-1 font-medium">
              Location Alignment <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>(15% weight)</span>
            </span>
            <span style={{ fontWeight: 600 }}>{breakdown.location || 0}%</span>
          </div>
          <ProgressBar value={breakdown.location || 0} showLabel={false} height="6px" color="#60a5fa" />
        </div>

        {/* Work Preference Match 20% */}
        <div>
          <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem" }}>
            <span className="flex items-center gap-1 font-medium">
              Work Preference <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>(20% weight)</span>
            </span>
            <span style={{ fontWeight: 600 }}>{breakdown.workPreference || 0}%</span>
          </div>
          <ProgressBar value={breakdown.workPreference || 0} showLabel={false} height="6px" color="#f472b6" />
        </div>

        {/* Career Goal Match 15% */}
        <div>
          <div className="flex justify-between items-center mb-1" style={{ fontSize: "0.85rem" }}>
            <span className="flex items-center gap-1 font-medium">
              Career Goal Match <span style={{ color: "var(--text-light)", fontSize: "0.75rem" }}>(15% weight)</span>
            </span>
            <span style={{ fontWeight: 600 }}>{breakdown.careerGoal || 0}%</span>
          </div>
          <ProgressBar value={breakdown.careerGoal || 0} showLabel={false} height="6px" color="#fbbf24" />
        </div>
      </div>

      <div
        style={{
          marginTop: "0.5rem",
          display: "flex",
          gap: "0.5rem",
          alignItems: "start",
          backgroundColor: "var(--bg-main)",
          padding: "0.75rem",
          borderRadius: "var(--radius-sm)"
        }}
      >
        {total >= 75 ? (
          <>
            <CheckCircle2 size={16} style={{ color: "#10b981", marginTop: "2px", flexShrink: 0 }} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
              Strong alignment! Your current capabilities and preferences closely match the specifications of this job listing.
            </p>
          </>
        ) : (
          <>
            <AlertCircle size={16} style={{ color: "#fbbf24", marginTop: "2px", flexShrink: 0 }} />
            <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
              Moderate alignment. You can improve your matching score by updating missing skills in the Skill Assessment section.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default JobCompatibility;
