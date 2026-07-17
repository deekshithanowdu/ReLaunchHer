import React from "react";
import { Edit2, Trash2, Calendar, Award, Briefcase, Heart, BookOpen, Star } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const TimelineEvent = ({ event, onEdit, onDelete }) => {
  const getIcon = (category) => {
    switch (category) {
      case "Started Career": return <Star size={16} />;
      case "Previous Job": return <Briefcase size={16} />;
      case "Promotion": return <Award size={16} />;
      case "Career Break": return <Heart size={16} />;
      case "Learning": return <BookOpen size={16} />;
      case "Certification": return <Award size={16} style={{ color: "#fbbf24" }} />;
      default: return <Calendar size={16} />;
    }
  };

  return (
    <div className="timeline-event-item">
      <div className="timeline-badge-node" />
      
      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1.25rem" }}>
        <div className="flex justify-between items-start gap-2">
          <div>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "var(--primary-color)",
                backgroundColor: "var(--primary-light)",
                padding: "0.2rem 0.5rem",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              {getIcon(event.category)}
              {event.category}
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)", marginLeft: "0.75rem" }}>
              {formatDate(event.date)}
            </span>
          </div>
          
          <div style={{ display: "flex", gap: "0.35rem" }}>
            <button
              onClick={() => onEdit(event)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-light)" }}
              title="Edit Event"
            >
              <Edit2 size={13} />
            </button>
            <button
              onClick={() => onDelete(event.id)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
              title="Delete Event"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        <p style={{ fontSize: "0.9rem", color: "var(--text-main)", margin: 0, fontWeight: 500 }}>
          {event.description}
        </p>
      </div>
    </div>
  );
};

export default TimelineEvent;
