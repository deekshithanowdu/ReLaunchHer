import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { Save, Printer, Trash2, Eye, EyeOff, BookOpen } from "lucide-react";

const CareerBreakStory = () => {
  const { careerBreakStory, setCareerBreakStory, addNotification } = useAppContext();

  // Local state copy
  const [startDate, setStartDate] = useState(careerBreakStory.startDate || "");
  const [endDate, setEndDate] = useState(careerBreakStory.endDate || "");
  const [reason, setReason] = useState(careerBreakStory.reason || "");
  const [responsibilities, setResponsibilities] = useState(careerBreakStory.responsibilities || "");
  const [skillsDeveloped, setSkillsDeveloped] = useState(careerBreakStory.skillsDeveloped || "");
  const [coursesCompleted, setCoursesCompleted] = useState(careerBreakStory.coursesCompleted || "");
  const [projectsCompleted, setProjectsCompleted] = useState(careerBreakStory.projectsCompleted || "");
  const [volunteerWork, setVolunteerWork] = useState(careerBreakStory.volunteerWork || "");
  const [achievements, setAchievements] = useState(careerBreakStory.achievements || "");

  const [isPreview, setIsPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSave = (e) => {
    if (e) e.preventDefault();

    const storyData = {
      startDate,
      endDate,
      reason,
      responsibilities,
      skillsDeveloped,
      coursesCompleted,
      projectsCompleted,
      volunteerWork,
      achievements
    };

    setCareerBreakStory(storyData);
    addNotification("System Notifications", "Your Career Break Story details have been successfully saved.");
    setToastMessage("Story saved successfully!");
    setToastType("success");
  };

  const handleDelete = () => {
    setStartDate("");
    setEndDate("");
    setReason("");
    setResponsibilities("");
    setSkillsDeveloped("");
    setCoursesCompleted("");
    setProjectsCompleted("");
    setVolunteerWork("");
    setAchievements("");

    const cleared = {
      startDate: "",
      endDate: "",
      reason: "",
      responsibilities: "",
      skillsDeveloped: "",
      coursesCompleted: "",
      projectsCompleted: "",
      volunteerWork: "",
      achievements: ""
    };
    setCareerBreakStory(cleared);
    addNotification("System Notifications", "Career Break Story cleared.");
    setToastMessage("Story deleted successfully.");
    setToastType("warning");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="career-break-story-wrapper">
      
      {/* Page Header */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Career Break Story</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Reframe your break as an era of active learning, volunteering, and capacity building.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }} className="no-print">
          <Button onClick={() => setIsPreview(!isPreview)} variant="secondary" iconBefore={isPreview ? <EyeOff size={16} /> : <Eye size={16} />}>
            {isPreview ? "Edit Story" : "Preview Story"}
          </Button>
          <Button onClick={handlePrint} variant="secondary" iconBefore={<Printer size={16} />}>
            Print / PDF
          </Button>
          {!isPreview && (
            <Button onClick={() => setShowDeleteConfirm(true)} variant="danger" iconBefore={<Trash2 size={16} />}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {isPreview ? (
        /* PREVIEW MODE DISPLAY */
        <div className="card" style={{ padding: "2.5rem", backgroundColor: "#ffffff", color: "#1e293b", border: "1px solid #cbd5e1" }}>
          <div style={{ borderBottom: "2px solid var(--primary-color)", paddingBottom: "1rem", marginBottom: "1.5rem" }}>
            <h3 style={{ fontSize: "1.4rem", color: "var(--secondary-color)", fontWeight: 700, margin: 0 }}>
              Career Transition & Break Profile
            </h3>
            {startDate && (
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", display: "block", marginTop: "4px" }}>
                Break Duration: {startDate} {endDate ? `to ${endDate}` : "- Present"}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {reason && (
              <div>
                <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                  Primary Catalyst / Context
                </h5>
                <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{reason}</p>
              </div>
            )}

            {responsibilities && (
              <div>
                <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                  Domestic & Project Responsibilities
                </h5>
                <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{responsibilities}</p>
              </div>
            )}

            {skillsDeveloped && (
              <div>
                <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                  Acquired & Rebuilt Capabilities
                </h5>
                <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{skillsDeveloped}</p>
              </div>
            )}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="preview-split-grid">
              {coursesCompleted && (
                <div>
                  <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                    Completed Coursework
                  </h5>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{coursesCompleted}</p>
                </div>
              )}

              {projectsCompleted && (
                <div>
                  <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                    Practiced Mini-Projects
                  </h5>
                  <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{projectsCompleted}</p>
                </div>
              )}
            </div>

            {volunteerWork && (
              <div>
                <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                  Community & Volunteer Services
                </h5>
                <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{volunteerWork}</p>
              </div>
            )}

            {achievements && (
              <div>
                <h5 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--primary-color)", marginBottom: "0.4rem" }}>
                  General Achievements
                </h5>
                <p style={{ fontSize: "0.9rem", margin: 0, color: "#334155" }}>{achievements}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* EDITING MODE FORM */
        <div className="card no-print">
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="preview-split-grid">
              <Input
                label="Career Break Start Date"
                id="story-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                label="Career Break End Date (Leave empty if ongoing)"
                id="story-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="story-reason" className="form-label">
                Why did you take a career break?
              </label>
              <textarea
                id="story-reason"
                className="form-control"
                rows="3"
                placeholder="Briefly explain (caregiving, relocation, personal choice, etc.). Keeping it positive."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="story-resp" className="form-label">
                Responsibilities managed during the break
              </label>
              <textarea
                id="story-resp"
                className="form-control"
                rows="3"
                placeholder="Family logistics, managing home finances, fundraising coordinator, volunteer scheduler..."
                value={responsibilities}
                onChange={(e) => setResponsibilities(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="story-skills" className="form-label">
                Skills developed / refreshed
              </label>
              <textarea
                id="story-skills"
                className="form-control"
                rows="3"
                placeholder="Crisis mitigation, asynchronous organization, React components, CSS layouts..."
                value={skillsDeveloped}
                onChange={(e) => setSkillsDeveloped(e.target.value)}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="preview-split-grid">
              <div className="form-group">
                <label htmlFor="story-courses" className="form-label">Courses Completed</label>
                <textarea
                  id="story-courses"
                  className="form-control"
                  rows="3"
                  placeholder="Vite React Essentials, Git branches, Coursera PM..."
                  value={coursesCompleted}
                  onChange={(e) => setCoursesCompleted(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="story-projects" className="form-label">Projects Completed</label>
                <textarea
                  id="story-projects"
                  className="form-control"
                  rows="3"
                  placeholder="Task Manager apps, CSS responsive wireframes..."
                  value={projectsCompleted}
                  onChange={(e) => setProjectsCompleted(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="story-volunteer" className="form-label">Volunteer / Volunteer Work</label>
              <textarea
                id="story-volunteer"
                className="form-control"
                rows="2"
                placeholder="Maintained local community newsletters, did accounting, etc."
                value={volunteerWork}
                onChange={(e) => setVolunteerWork(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="story-achieve" className="form-label">Other achievements</label>
              <textarea
                id="story-achieve"
                className="form-control"
                rows="2"
                placeholder="Awards, community certificates, or accomplishments."
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
              />
            </div>

            <div style={{ display: "flex", justify: "flex-end", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
              <Button type="submit" variant="primary" iconBefore={<Save size={16} />}>
                Save Career Story
              </Button>
            </div>

          </form>
        </div>
      )}

      {/* Clearing Dialogue */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Clear Career Story details?"
        message="This will reset all the career break fields. This cannot be undone."
        confirmLabel="Reset Details"
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}

      {/* Printing Styles Override */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .no-print, header, aside, .mobile-bottom-menu-bar {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          .card {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .career-break-story-wrapper {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .preview-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CareerBreakStory;
