import React from "react";
import { Calendar, Trash2, Edit, AlertCircle, ArrowRight } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const ApplicationCard = ({ application, onEdit, onDelete, onMoveRight, onMoveLeft }) => {
  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Saved": return "var(--text-light)";
      case "Applied": return "#60a5fa";
      case "Assessment": return "#fbbf24";
      case "Interview": return "var(--primary-color)";
      case "Offer": return "#10b981";
      case "Rejected": return "#ef4444";
      default: return "var(--text-muted)";
    }
  };

  return (
    <div className="kanban-card">
      <div className="flex justify-between items-start gap-2 mb-2">
        <h5 style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>
          {application.jobTitle}
        </h5>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          <button
            onClick={() => onEdit(application)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-light)" }}
            title="Edit Details"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(application.id)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
            title="Delete Application"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
      
      <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 500 }}>
        {application.company}
      </p>

      {application.notes && (
        <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", backgroundColor: "var(--bg-main)", padding: "0.4rem", borderRadius: "4px", marginBottom: "0.75rem", fontStyle: "italic" }}>
          {application.notes.length > 80 ? `${application.notes.substring(0, 80)}...` : application.notes}
        </p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-light)" }}>
        {application.interviewDate && (
          <span className="flex items-center gap-1" style={{ color: "var(--primary-color)", fontWeight: 500 }}>
            <Calendar size={12} />
            Interview: {formatDate(application.interviewDate)}
          </span>
        )}
        
        {application.reminderDate && (
          <span className="flex items-center gap-1">
            <AlertCircle size={12} />
            Remind: {formatDate(application.reminderDate)}
          </span>
        )}
      </div>

      {/* Movement buttons inside card footer */}
      <div className="flex justify-between items-center mt-3" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.5rem" }}>
        {onMoveLeft ? (
          <button
            onClick={onMoveLeft}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-light)",
              fontSize: "0.75rem",
              display: "flex",
              alignItems: "center"
            }}
          >
            &larr; Prev
          </button>
        ) : <span />}

        {onMoveRight ? (
          <button
            onClick={onMoveRight}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--primary-color)",
              fontSize: "0.75rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "2px"
            }}
          >
            Next &rarr;
          </button>
        ) : <span />}
      </div>
    </div>
  );
};

export default ApplicationCard;
