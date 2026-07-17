import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ApplicationCard from "../../components/jobs/ApplicationCard";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { Plus, SlidersHorizontal, Archive } from "lucide-react";

const ApplicationTracker = () => {
  const {
    applications,
    addJobApplication,
    updateApplicationStatus,
    deleteApplication,
    updateApplicationDetails
  } = useAppContext();

  // Kanban Columns
  const columns = ["Saved", "Applied", "Assessment", "Interview", "Offer", "Rejected"];

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form fields
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Saved");
  const [notes, setNotes] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const handleOpenAdd = () => {
    setIsEditing(false);
    setJobTitle("");
    setCompany("");
    setStatus("Saved");
    setNotes("");
    setInterviewDate("");
    setReminderDate("");
    setIsOpenModal(true);
  };

  const handleOpenEdit = (app) => {
    setIsEditing(true);
    setEditingId(app.id);
    setJobTitle(app.jobTitle);
    setCompany(app.company);
    setStatus(app.status);
    setNotes(app.notes || "");
    setInterviewDate(app.interviewDate || "");
    setReminderDate(app.reminderDate || "");
    setIsOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jobTitle || !company) return;

    const data = {
      jobTitle,
      company,
      status,
      notes,
      interviewDate,
      reminderDate
    };

    if (isEditing) {
      updateApplicationDetails(editingId, data);
      setToastMessage("Application details updated!");
    } else {
      addJobApplication(data);
      setToastMessage("Application logged in tracker!");
    }

    setIsOpenModal(false);
  };

  const handleMoveRight = (app) => {
    const colIdx = columns.indexOf(app.status);
    if (colIdx < columns.length - 1) {
      updateApplicationStatus(app.id, columns[colIdx + 1]);
      setToastMessage(`Moved to ${columns[colIdx + 1]}`);
    }
  };

  const handleMoveLeft = (app) => {
    const colIdx = columns.indexOf(app.status);
    if (colIdx > 0) {
      updateApplicationStatus(app.id, columns[colIdx - 1]);
      setToastMessage(`Moved to ${columns[colIdx - 1]}`);
    }
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deleteApplication(deleteId);
    setDeleteId(null);
    setToastMessage("Application deleted.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Application Kanban Board</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Manage and track job application phases, record schedules, and note follow-up deadlines.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" iconBefore={<Plus size={16} />}>
          Log Application
        </Button>
      </div>

      {/* Kanban Grid */}
      <div className="kanban-grid-board">
        {columns.map((colName) => {
          const colApps = applications.filter(app => app.status === colName);
          return (
            <div key={colName} className="kanban-col">
              <div className="kanban-col-header">
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--secondary-color)", textTransform: "uppercase" }}>
                  {colName}
                </span>
                <span
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary-color)",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "4px",
                    fontWeight: 700
                  }}
                >
                  {colApps.length}
                </span>
              </div>

              {/* Cards drawer lists */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {colApps.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onEdit={handleOpenEdit}
                    onDelete={(id) => setDeleteId(id)}
                    onMoveRight={() => handleMoveRight(app)}
                    onMoveLeft={() => handleMoveLeft(app)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit modal */}
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} title={isEditing ? "Edit Application Details" : "Log New Application"} size="sm">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Input
            label="Job Position Title"
            id="app-jobTitle"
            required={true}
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
          />
          <Input
            label="Company Name"
            id="app-company"
            required={true}
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <Select
            label="Application Stage"
            id="app-status"
            options={columns}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="app-modal-split">
            <Input
              label="Interview Date"
              id="app-intDate"
              type="date"
              value={interviewDate}
              onChange={(e) => setInterviewDate(e.target.value)}
            />
            <Input
              label="Follow-up Reminder Date"
              id="app-remDate"
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="app-notes" className="form-label">Notes & Comments</label>
            <textarea
              id="app-notes"
              rows="3"
              className="form-control"
              placeholder="e.g. Discussed remote flexibility bounds with recruiter."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button onClick={() => setIsOpenModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Save Details" : "Log Application"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Discard Application record?"
        message="This action will permanently remove this application from your Kanban board. Please confirm."
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .app-modal-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ApplicationTracker;
