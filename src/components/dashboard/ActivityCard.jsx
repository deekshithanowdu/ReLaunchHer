import React from "react";
import { Compass, BookOpen, Briefcase, Award, CheckCircle } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const ActivityCard = ({ activities = [] }) => {
  const getIcon = (type) => {
    switch (type) {
      case "Job Applications":
        return <Briefcase size={16} />;
      case "Mentor Sessions":
        return <UsersIcon size={16} />;
      case "Learning Reminders":
        return <BookOpen size={16} />;
      case "Interview Reminders":
        return <Award size={16} />;
      default:
        return <Compass size={16} />;
    }
  };

  const UsersIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  return (
    <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <h4 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Recent Activity</h4>
      
      {activities.length === 0 ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "150px" }}>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>No activities recorded yet.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1, overflowY: "auto", maxHeight: "300px" }}>
          {activities.slice(0, 5).map((act, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "start",
                paddingBottom: idx === activities.length - 1 ? 0 : "0.75rem",
                borderBottom: idx === activities.length - 1 ? "none" : "1px solid var(--border-color)"
              }}
            >
              <div
                style={{
                  padding: "0.4rem",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary-color)",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                {getIcon(act.type)}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "0.85rem", color: "var(--text-main)", margin: 0, fontWeight: 500 }}>
                  {act.text}
                </p>
                <div className="flex justify-between items-center mt-1">
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                    {act.type}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                    {formatDate(act.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityCard;
