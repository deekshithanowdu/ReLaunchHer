import React from "react";
import { ExternalLink, Calendar, Code, Trash2, Edit } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%" }}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "0.25rem" }}>
            {project.title}
          </h4>
          <span style={{ fontSize: "0.75rem", backgroundColor: "var(--primary-light)", color: "var(--primary-color)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
            {project.category}
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.35rem" }}>
          <button
            onClick={() => onEdit(project)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-light)" }}
            title="Edit Project"
          >
            <Edit size={14} />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
            title="Delete Project"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flexGrow: 1, margin: 0, lineBreak: "anywhere" }}>
        {project.description}
      </p>

      {/* Tech items */}
      {project.technologies && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", margin: "0.5rem 0" }}>
          {project.technologies.split(",").map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: "0.7rem",
                backgroundColor: "var(--bg-main)",
                color: "var(--text-muted)",
                padding: "0.15rem 0.4rem",
                borderRadius: "4px",
                border: "1px solid var(--border-color)"
              }}
            >
              {tech.trim()}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-2" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", fontSize: "0.8rem" }}>
        <span className="flex items-center gap-1 style-date" style={{ color: "var(--text-light)" }}>
          <Calendar size={12} /> {formatDate(project.completionDate)}
        </span>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          {project.gitHubLink && (
            <a
              href={project.gitHubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "2px", fontWeight: 600, color: "var(--text-muted)" }}
              className="port-link"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "2px" }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> Code
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "2px", fontWeight: 600 }}
              className="port-link"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </div>
      <style>{`
        .port-link:hover {
          color: var(--primary-color) !important;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;
