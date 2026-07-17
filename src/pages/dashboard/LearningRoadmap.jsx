import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProgressBar from "../../components/common/ProgressBar";
import Toast from "../../components/common/Toast";
import { CheckCircle2, Circle, BookOpen, ExternalLink, Calendar, Compass } from "lucide-react";
import Button from "../../components/common/Button";

const LearningRoadmap = () => {
  const { courses, toggleCourseComplete } = useAppContext();
  
  const [toastMessage, setToastMessage] = useState("");

  const handleToggleComplete = (courseId, title) => {
    toggleCourseComplete(courseId);
    const target = courses.find(c => c.id === courseId);
    const nextState = target && target.status === "Completed" ? "In Progress" : "Completed";
    setToastMessage(`Roadmap task "${title}" marked as ${nextState}.`);
  };

  // Calculate overall learning progression
  const completedCount = courses.filter(c => c.status === "Completed").length;
  const overallProgress = courses.length > 0 ? Math.round((completedCount / courses.length) * 100) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed": return "#10b981";
      case "In Progress": return "var(--primary-color)";
      default: return "var(--text-light)";
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Learning Roadmap</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Follow a structured weekly schedule designed to refresh your core technical capabilities and construct portfolio assets.
          </p>
        </div>

        <div style={{ minWidth: "180px" }} className="flex items-center gap-3">
          <ProgressBar value={overallProgress} showLabel={true} height="8px" color="var(--primary-color)" />
        </div>
      </div>

      {/* Main Roadmap card checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {courses.map((course, idx) => {
          const isComplete = course.status === "Completed";
          
          return (
            <div
              key={course.id}
              className="card"
              style={{
                borderLeft: `5px solid ${getStatusColor(course.status)}`,
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-color)", backgroundColor: "var(--primary-light)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                      {course.week || `Week ${idx + 1}`}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                      &bull; {course.duration} duration
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--secondary-color)" }}>
                    {course.title}
                  </h3>
                </div>

                <Button
                  onClick={() => handleToggleComplete(course.id, course.title)}
                  variant={isComplete ? "secondary" : "primary"}
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}
                  iconBefore={isComplete ? <CheckCircle2 size={14} style={{ color: "#10b981" }} /> : <Circle size={14} />}
                >
                  {isComplete ? "Completed" : "Mark Complete"}
                </Button>
              </div>

              <p style={{ fontSize: "0.875rem", color: "var(--text-muted)", margin: 0 }}>
                {course.description}
              </p>

              {/* Resources list items */}
              {course.resources && course.resources.length > 0 && (
                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", marginTop: "0.25rem" }}>
                  <h5 style={{ fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: 600 }} className="flex items-center gap-1">
                    <BookOpen size={12} /> Suggested Learning Assets:
                  </h5>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                    {course.resources.map((res, rIdx) => {
                      const isLink = res.startsWith("http");
                      return isLink ? (
                        <a
                          key={rIdx}
                          href={res}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "2px",
                            backgroundColor: "var(--bg-main)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)"
                          }}
                        >
                          Resource {rIdx + 1} <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span
                          key={rIdx}
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--text-muted)",
                            backgroundColor: "var(--bg-main)",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "4px",
                            border: "1px solid var(--border-color)"
                          }}
                        >
                          {res}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>
          );
        })}
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

export default LearningRoadmap;
