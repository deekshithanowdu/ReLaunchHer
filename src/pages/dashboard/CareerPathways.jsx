import React from "react";
import { useAppContext } from "../../context/AppContext";
import { CheckCircle2, Circle, HelpCircle, Sparkles, BookOpen, UserCheck, Briefcase } from "lucide-react";
import Button from "../../components/common/Button";
import ProgressBar from "../../components/common/ProgressBar";

const CareerPathways = () => {
  const {
    pathways,
    selectedPathwayId,
    selectPathway,
    togglePathwayStep
  } = useAppContext();

  const selectedPathway = pathways.find(p => p.id === selectedPathwayId) || pathways[0];

  const getPathwayIcon = (title) => {
    if (title.includes("Previous")) return <UserCheck size={24} />;
    if (title.includes("Switch")) return <BookOpen size={24} />;
    return <Briefcase size={24} />;
  };

  // Calculate progress of selected pathway
  const steps = selectedPathway.steps || [];
  const completedSteps = steps.filter(s => s.isCompleted).length;
  const pathwayProgress = steps.length > 0 ? Math.round((completedSteps / steps.length) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>My Career Pathway</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Choose a path that fits your comeback goals, review structured steps, and track your transition milestones.
        </p>
      </div>

      {/* Pathway options lists */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
        {pathways.map((path) => {
          const isActive = path.id === selectedPathwayId;
          const pathSteps = path.steps || [];
          const pathComp = pathSteps.filter(s => s.isCompleted).length;
          const progressPercent = Math.round((pathComp / pathSteps.length) * 100) || 0;

          return (
            <div
              key={path.id}
              className="card"
              onClick={() => selectPathway(path.id)}
              style={{
                cursor: "pointer",
                borderWidth: isActive ? "2px" : "1px",
                borderColor: isActive ? "var(--primary-color)" : "var(--border-color)",
                boxShadow: isActive ? "var(--shadow-md)" : "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                transition: "var(--transition-smooth)"
              }}
            >
              <div className="flex justify-between items-start">
                <div style={{ color: isActive ? "var(--primary-color)" : "var(--text-muted)" }}>
                  {getPathwayIcon(path.title)}
                </div>
                {isActive && (
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-color)", backgroundColor: "var(--primary-light)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 700 }}>
                    Active Track
                  </span>
                )}
              </div>
              <div>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 600 }}>{path.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  {path.description.substring(0, 100)}...
                </p>
              </div>
              <div style={{ marginTop: "auto" }}>
                <div className="flex justify-between" style={{ fontSize: "0.75rem", marginBottom: "4px", color: "var(--text-muted)" }}>
                  <span>Milestones</span>
                  <strong>{progressPercent}%</strong>
                </div>
                <ProgressBar value={progressPercent} showLabel={false} height="4px" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Pathway steps checklist */}
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>
              {selectedPathway.title} Checklist
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0 }}>
              Complete checkpoints to progress through your comeback roadmap.
            </p>
          </div>

          <div style={{ minWidth: "150px" }}>
            <ProgressBar value={pathwayProgress} showLabel={true} height="6px" color="var(--primary-color)" />
          </div>
        </div>

        {/* Steps checklists */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {selectedPathway.steps.map((step) => (
            <div
              key={step.id}
              onClick={() => togglePathwayStep(selectedPathway.id, step.id)}
              style={{
                display: "flex",
                alignItems: "start",
                gap: "1rem",
                padding: "1rem",
                backgroundColor: "var(--bg-main)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                border: "1px solid var(--border-color)",
                transition: "var(--transition-smooth)"
              }}
              className="pathway-step-row"
            >
              <div style={{ marginTop: "2px", color: step.isCompleted ? "#10b981" : "var(--text-light)" }}>
                {step.isCompleted ? <CheckCircle2 size={20} fill="#10b981" style={{ color: "white" }} /> : <Circle size={20} />}
              </div>
              <div>
                <h5
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    textDecoration: step.isCompleted ? "line-through" : "none",
                    color: step.isCompleted ? "var(--text-light)" : "var(--text-main)",
                    marginBottom: "0.15rem"
                  }}
                >
                  {step.title}
                </h5>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-muted)",
                    margin: 0
                  }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .pathway-step-row:hover {
          border-color: var(--primary-color) !important;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
};

export default CareerPathways;
