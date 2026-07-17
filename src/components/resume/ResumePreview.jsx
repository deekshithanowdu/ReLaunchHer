import React from "react";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

const ResumePreview = ({ resumeData }) => {
  const {
    fullName = "Jane Doe",
    email = "jane.doe@example.com",
    phone = "(555) 019-2834",
    preferredLocation = "Chicago, IL",
    summary = "Detail-oriented software engineer with years of frontend experience. Actively returning to tech with specialized capabilities in modern React setups.",
    experience = [],
    projects = [],
    education = []
  } = resumeData;

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        color: "#1e293b",
        padding: "2.5rem",
        borderRadius: "var(--radius-sm)",
        border: "1px solid #cbd5e1",
        boxShadow: "var(--shadow-md)",
        fontFamily: "Outfit, sans-serif",
        minHeight: "297mm", // A4 Ratio approximation
        lineHeight: "1.5",
        colorScheme: "light"
      }}
      className="resume-print-document"
    >
      {/* Header section */}
      <div style={{ borderBottom: "3px solid #6d28d9", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.25rem", color: "#0f172a", fontWeight: 700, margin: 0 }}>
          {fullName}
        </h1>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", marginTop: "0.75rem", fontSize: "0.85rem", color: "#475569" }}>
          {email && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Mail size={14} /> {email}
            </span>
          )}
          {phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Phone size={14} /> {phone}
            </span>
          )}
          {preferredLocation && (
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <MapPin size={14} /> {preferredLocation}
            </span>
          )}
        </div>
      </div>

      {/* Two Column Layout Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
        
        {/* Profile Summary */}
        {summary && (
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem", marginBottom: "0.75rem" }}>
              Professional Summary
            </h3>
            <p style={{ fontSize: "0.9rem", color: "#334155", margin: 0 }}>
              {summary}
            </p>
          </div>
        )}

        {/* Experience Column */}
        {experience.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem", marginBottom: "1rem" }}>
              Professional Experience
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {experience.map((exp, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start" style={{ marginBottom: "0.25rem" }}>
                    <h4 style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 600, margin: 0 }}>
                      {exp.role} <span style={{ fontWeight: 400, color: "#64748b" }}>at {exp.company}</span>
                    </h4>
                    <span style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 500 }}>
                      {exp.duration}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#334155", margin: 0 }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Column */}
        {projects.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem", marginBottom: "1rem" }}>
              Projects
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {projects.map((proj, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-start" style={{ marginBottom: "0.25rem" }}>
                    <h4 style={{ fontSize: "1rem", color: "#0f172a", fontWeight: 600, margin: 0 }}>
                      {proj.title}
                    </h4>
                    {proj.tech && (
                      <span style={{ fontSize: "0.8rem", color: "#6d28d9", fontWeight: 600 }}>
                        {proj.tech}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "#334155", margin: 0 }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Column */}
        {education.length > 0 && (
          <div>
            <h3 style={{ fontSize: "1.1rem", color: "#6d28d9", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "1px solid #e2e8f0", paddingBottom: "0.25rem", marginBottom: "1rem" }}>
              Education
            </h3>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div>
                    <h4 style={{ fontSize: "0.95rem", color: "#0f172a", fontWeight: 600, margin: 0 }}>
                      {edu.degree}
                    </h4>
                    <span style={{ fontSize: "0.85rem", color: "#475569" }}>
                      {edu.school}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                    {edu.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ResumePreview;
