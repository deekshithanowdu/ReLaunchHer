import React from "react";
import { Star, MessageSquare, Briefcase, Calendar, Sparkles } from "lucide-react";
import Button from "../common/Button";

const MentorCard = ({ mentor, matchScore = 0, onBook }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div>
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex gap-3">
            {/* Initials Avatar */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-light)",
                color: "var(--primary-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "1.1rem"
              }}
            >
              {mentor.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.15rem" }}>
                {mentor.name}
              </h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, fontWeight: 500 }}>
                {mentor.jobTitle}
              </p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <span
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                color: matchScore >= 80 ? "#10b981" : "var(--primary-color)",
                backgroundColor: matchScore >= 80 ? "#d1fae5" : "var(--primary-light)",
                padding: "0.25rem 0.5rem",
                borderRadius: "var(--radius-sm)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem"
              }}
            >
              <Sparkles size={12} />
              {matchScore}% Match
            </span>
          </div>
        </div>

        {/* Rating details */}
        <div className="flex items-center gap-4 mt-2" style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
          <span className="flex items-center gap-1">
            <Star size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
            <strong style={{ color: "var(--text-main)" }}>{mentor.rating}</strong> ({mentor.reviewsCount} reviews)
          </span>
          <span className="flex items-center gap-1">
            <Briefcase size={14} /> {mentor.experience}
          </span>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineBreak: "anywhere" }}>
        {mentor.careerJourney.length > 180 ? `${mentor.careerJourney.substring(0, 180)}...` : mentor.careerJourney}
      </p>

      {/* Expertise pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {mentor.skills.map((skill, idx) => (
          <span
            key={idx}
            style={{
              fontSize: "0.7rem",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary-color)",
              padding: "0.15rem 0.4rem",
              borderRadius: "4px",
              fontWeight: 500
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Availability slots */}
      <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "auto" }}>
        <h5 style={{ fontSize: "0.8rem", color: "var(--text-light)", marginBottom: "0.5rem", fontWeight: 600 }}>
          Next Available:
        </h5>
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem", marginBottom: "1rem" }}>
          {mentor.availability.map((slot, idx) => (
            <li key={idx} style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={12} /> {slot}
            </li>
          ))}
        </ul>

        <Button onClick={() => onBook(mentor)} variant="primary" style={{ width: "100%", padding: "0.5rem", fontSize: "0.85rem" }}>
          Book Career Chat
        </Button>
      </div>
    </div>
  );
};

export default MentorCard;
