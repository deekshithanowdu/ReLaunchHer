import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import { Plus, Trash2 } from "lucide-react";

const ResumeForm = ({ resumeData, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate({ [e.target.name]: e.target.value });
  };

  // Add Item to Array Sections
  const addExperience = () => {
    const list = [...(resumeData.experience || [])];
    list.push({ role: "", company: "", duration: "", description: "" });
    onUpdate({ experience: list });
  };

  const removeExperience = (idx) => {
    const list = (resumeData.experience || []).filter((_, i) => i !== idx);
    onUpdate({ experience: list });
  };

  const handleExperienceChange = (idx, field, val) => {
    const list = (resumeData.experience || []).map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: val };
      }
      return item;
    });
    onUpdate({ experience: list });
  };

  // Projects Arrays
  const addProject = () => {
    const list = [...(resumeData.projects || [])];
    list.push({ title: "", tech: "", description: "" });
    onUpdate({ projects: list });
  };

  const removeProject = (idx) => {
    const list = (resumeData.projects || []).filter((_, i) => i !== idx);
    onUpdate({ projects: list });
  };

  const handleProjectChange = (idx, field, val) => {
    const list = (resumeData.projects || []).map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: val };
      }
      return item;
    });
    onUpdate({ projects: list });
  };

  // Education Arrays
  const addEducation = () => {
    const list = [...(resumeData.education || [])];
    list.push({ school: "", degree: "", year: "" });
    onUpdate({ education: list });
  };

  const removeEducation = (idx) => {
    const list = (resumeData.education || []).filter((_, i) => i !== idx);
    onUpdate({ education: list });
  };

  const handleEducationChange = (idx, field, val) => {
    const list = (resumeData.education || []).map((item, i) => {
      if (i === idx) {
        return { ...item, [field]: val };
      }
      return item;
    });
    onUpdate({ education: list });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <h4 style={{ fontSize: "1.1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
        Personal & Summary
      </h4>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="resume-personal-grid">
        <Input
          label="Full Name"
          id="res-fullName"
          name="fullName"
          value={resumeData.fullName || ""}
          onChange={handleChange}
        />
        <Input
          label="Email Address"
          id="res-email"
          name="email"
          type="email"
          value={resumeData.email || ""}
          onChange={handleChange}
        />
        <Input
          label="Phone Number"
          id="res-phone"
          name="phone"
          value={resumeData.phone || ""}
          onChange={handleChange}
          className="span-12"
        />
        <Input
          label="Location (City, State)"
          id="res-location"
          name="preferredLocation"
          value={resumeData.preferredLocation || ""}
          onChange={handleChange}
          className="span-12"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Professional Summary</label>
        <textarea
          name="summary"
          rows="4"
          value={resumeData.summary || ""}
          onChange={handleChange}
          className="form-control"
          placeholder="Experienced Software Developer returning to the workforce with updated skills in React..."
        />
      </div>

      {/* Experience block */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 style={{ fontSize: "1.1rem" }}>Work Experience</h4>
          <Button onClick={addExperience} variant="secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
            <Plus size={14} /> Add Role
          </Button>
        </div>

        {(resumeData.experience || []).map((exp, idx) => (
          <div key={idx} className="card" style={{ marginBottom: "1rem", backgroundColor: "var(--bg-main)", position: "relative" }}>
            <button
              onClick={() => removeExperience(idx)}
              style={{ position: "absolute", right: "12px", top: "12px", background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
            >
              <Trash2 size={16} />
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }} className="resume-personal-grid">
              <Input
                label="Role Title"
                id={`role-${idx}`}
                value={exp.role || ""}
                onChange={(e) => handleExperienceChange(idx, "role", e.target.value)}
              />
              <Input
                label="Company Name"
                id={`comp-${idx}`}
                value={exp.company || ""}
                onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
              />
              <Input
                label="Duration (e.g., 2018 - 2022)"
                id={`dur-${idx}`}
                value={exp.duration || ""}
                onChange={(e) => handleExperienceChange(idx, "duration", e.target.value)}
                className="span-12"
              />
              <div className="form-group span-12" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Responsibilities / Accomplishments</label>
                <textarea
                  rows="3"
                  value={exp.description || ""}
                  onChange={(e) => handleExperienceChange(idx, "description", e.target.value)}
                  className="form-control"
                  placeholder="Developed frontend interfaces, scaled dashboard queries..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Projects block */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 style={{ fontSize: "1.1rem" }}>Projects</h4>
          <Button onClick={addProject} variant="secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
            <Plus size={14} /> Add Project
          </Button>
        </div>

        {(resumeData.projects || []).map((proj, idx) => (
          <div key={idx} className="card" style={{ marginBottom: "1rem", backgroundColor: "var(--bg-main)", position: "relative" }}>
            <button
              onClick={() => removeProject(idx)}
              style={{ position: "absolute", right: "12px", top: "12px", background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
            >
              <Trash2 size={16} />
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }} className="resume-personal-grid">
              <Input
                label="Project Title"
                id={`proj-${idx}`}
                value={proj.title || ""}
                onChange={(e) => handleProjectChange(idx, "title", e.target.value)}
              />
              <Input
                label="Technologies Used"
                id={`tech-${idx}`}
                value={proj.tech || ""}
                onChange={(e) => handleProjectChange(idx, "tech", e.target.value)}
              />
              <div className="form-group span-12" style={{ gridColumn: "span 2" }}>
                <label className="form-label">Project Description</label>
                <textarea
                  rows="3"
                  value={proj.description || ""}
                  onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                  className="form-control"
                  placeholder="Describe your design decisions and implementation metrics."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Education block */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 style={{ fontSize: "1.1rem" }}>Education</h4>
          <Button onClick={addEducation} variant="secondary" style={{ padding: "0.3rem 0.6rem", fontSize: "0.8rem" }}>
            <Plus size={14} /> Add Education
          </Button>
        </div>

        {(resumeData.education || []).map((edu, idx) => (
          <div key={idx} className="card" style={{ marginBottom: "1rem", backgroundColor: "var(--bg-main)", position: "relative" }}>
            <button
              onClick={() => removeEducation(idx)}
              style={{ position: "absolute", right: "12px", top: "12px", background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
            >
              <Trash2 size={16} />
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }} className="resume-personal-grid">
              <Input
                label="Degree / Major"
                id={`deg-${idx}`}
                value={edu.degree || ""}
                onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
              />
              <Input
                label="School / University"
                id={`school-${idx}`}
                value={edu.school || ""}
                onChange={(e) => handleEducationChange(idx, "school", e.target.value)}
              />
              <Input
                label="Graduation Year"
                id={`yr-${idx}`}
                value={edu.year || ""}
                onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                className="span-12"
              />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @media (max-width: 576px) {
          .resume-personal-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeForm;
