import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { confidenceOptions, careerOptions, initialSkillsByPath } from "../../data/skills";
import Select from "../../components/common/Select";
import ProgressBar from "../../components/common/ProgressBar";
import Toast from "../../components/common/Toast";
import { Sparkles, AlertCircle, CheckCircle2, Award, Zap } from "lucide-react";

const SkillAssessment = () => {
  const { currentUser } = useAuth();
  const { skills, updateSkillConfidence, addNotification } = useAppContext();

  const [toastMessage, setToastMessage] = useState("");

  const handleConfidenceChange = (skillName, val) => {
    updateSkillConfidence(skillName, val);
    setToastMessage(`Confidence level for "${skillName}" updated to ${val}.`);
  };

  // Compute matched vs missing skills
  // Matched = Comfortable or Job Ready
  // Missing = Beginner or Learning
  const matchedSkills = skills.filter(s => s.confidence === "Comfortable" || s.confidence === "Job Ready");
  const missingSkills = skills.filter(s => s.confidence === "Beginner" || s.confidence === "Learning");

  const overallMatchPercent = skills.length > 0 ? Math.round((matchedSkills.length / skills.length) * 100) : 0;

  const getConfidenceBadgeColor = (conf) => {
    switch (conf) {
      case "Job Ready": return "#10b981";
      case "Comfortable": return "var(--primary-color)";
      case "Learning": return "#f59e0b";
      default: return "#94a3b8";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Skill Assessment</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Rate your confidence levels in key industry specifications. Identify areas to refresh on your roadmap.
        </p>
      </div>

      {/* Main Grid layout */}
      <div className="dashboard-grid">
        
        {/* Left Column (8 cols): Interactive ratings checklist */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="card">
            <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem" }} className="flex items-center gap-1">
              <Zap size={18} style={{ color: "var(--primary-color)" }} /> Core Pathway Skills
            </h4>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: "var(--bg-main)",
                    border: "1px solid var(--border-color)",
                    borderRadius: "var(--radius-md)",
                    padding: "1.25rem",
                    display: "flex",
                    justifyContent: "between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem"
                  }}
                >
                  <div style={{ flex: 1, minWidth: "180px" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span style={{ fontSize: "0.95rem", fontWeight: 600 }}>{skill.name}</span>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          backgroundColor: "white",
                          color: getConfidenceBadgeColor(skill.confidence),
                          padding: "0.15rem 0.4rem",
                          borderRadius: "4px",
                          border: `1px solid ${getConfidenceBadgeColor(skill.confidence)}`
                        }}
                      >
                        {skill.confidence}
                      </span>
                    </div>
                    <ProgressBar value={skill.progress} showLabel={false} height="5px" color={getConfidenceBadgeColor(skill.confidence)} />
                  </div>

                  <div style={{ minWidth: "160px" }}>
                    <label className="form-label" style={{ fontSize: "0.75rem", marginBottom: "4px" }}>Confidence Level</label>
                    <select
                      value={skill.confidence}
                      onChange={(e) => handleConfidenceChange(skill.name, e.target.value)}
                      className="form-control"
                      style={{ padding: "0.375rem 0.75rem", fontSize: "0.85rem" }}
                    >
                      {confidenceOptions.map((opt, oIdx) => (
                        <option key={oIdx} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Stats & Summary breakdown */}
        <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Match Score Card */}
          <div className="card text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.25rem", padding: "2rem" }}>
            <h4 style={{ fontSize: "1rem", margin: 0 }}>Pathway Skill Match</h4>
            
            <div style={{ width: "120px", height: "120px", borderRadius: "50%", border: "8px solid var(--border-color)", borderTopColor: "var(--primary-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.75rem", fontWeight: 800 }}>
              {overallMatchPercent}%
            </div>
            
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Based on skills marked <strong>Comfortable</strong> or <strong>Job Ready</strong>.
            </p>
          </div>

          {/* Matching vs Missing splits */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            
            {/* Matching list */}
            <div>
              <h5 style={{ fontSize: "0.85rem", color: "#10b981", display: "flex", alignItems: "center", gap: "4px", marginBottom: "0.5rem" }}>
                <CheckCircle2 size={16} /> Strong Capabilities ({matchedSkills.length})
              </h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {matchedSkills.length === 0 ? (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>No matches marked yet.</span>
                ) : (
                  matchedSkills.map((s, idx) => (
                    <span key={idx} style={{ fontSize: "0.75rem", backgroundColor: "#e6fbf1", color: "#065f46", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{s.name}</span>
                  ))
                )}
              </div>
            </div>

            {/* Missing list */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
              <h5 style={{ fontSize: "0.85rem", color: "#fbbf24", display: "flex", alignItems: "center", gap: "4px", marginBottom: "0.5rem" }}>
                <AlertCircle size={16} /> Growth Opportunities ({missingSkills.length})
              </h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {missingSkills.length === 0 ? (
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>Congratulations! You have zero beginner levels.</span>
                ) : (
                  missingSkills.map((s, idx) => (
                    <span key={idx} style={{ fontSize: "0.75rem", backgroundColor: "#fffbeb", color: "#92400e", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>{s.name}</span>
                  ))
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default SkillAssessment;
