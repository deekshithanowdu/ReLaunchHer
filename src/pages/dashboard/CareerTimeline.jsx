import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import TimelineEvent from "../../components/timeline/TimelineEvent";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { Plus, SlidersHorizontal } from "lucide-react";

const CareerTimeline = () => {
  const {
    timelineEvents,
    addTimelineEvent,
    deleteTimelineEvent,
    updateTimelineEvent
  } = useAppContext();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("Started Career");
  const [description, setDescription] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const categories = [
    "Started Career",
    "Previous Job",
    "Promotion",
    "Career Break",
    "Learning",
    "Certification",
    "Project",
    "Volunteer Work",
    "Career Goal",
    "Job Application"
  ];

  const handleOpenAdd = () => {
    setIsEditing(false);
    setDate("");
    setCategory("Started Career");
    setDescription("");
    setIsOpenModal(true);
  };

  const handleOpenEdit = (evt) => {
    setIsEditing(true);
    setEditingId(evt.id);
    setDate(evt.date);
    setCategory(evt.category);
    setDescription(evt.description);
    setIsOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !description) return;

    if (isEditing) {
      updateTimelineEvent(editingId, { date, category, description });
      setToastMessage("Event updated successfully!");
    } else {
      addTimelineEvent({ date, category, description });
      setToastMessage("Event added successfully!");
    }

    setIsOpenModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deleteTimelineEvent(deleteId);
    setDeleteId(null);
    setToastMessage("Event deleted successfully.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Career Timeline Builder</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Visualize your career roadmap, including past achievements, your break duration, and current learning milestones.
          </p>
        </div>
        
        <Button onClick={handleOpenAdd} variant="primary" iconBefore={<Plus size={16} />}>
          Add Timeline Event
        </Button>
      </div>

      {timelineEvents.length === 0 ? (
        <div style={{ padding: "4rem 0" }}>
          <p style={{ textAlign: "center", color: "var(--text-light)" }}>
            Your career timeline is empty. Start adding milestones!
          </p>
        </div>
      ) : (
        /* Timeline flow */
        <div className="timeline-container">
          {timelineEvents.map((evt) => (
            <TimelineEvent
              key={evt.id}
              event={evt}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* CRUD Event modal */}
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} title={isEditing ? "Edit Timeline Event" : "Add Timeline Event"} size="sm">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Input
            label="Milestone Date"
            id="evt-date"
            type="date"
            required={true}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <Select
            label="Category"
            id="evt-cat"
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <div className="form-group">
            <label htmlFor="evt-desc" className="form-label">Description</label>
            <textarea
              id="evt-desc"
              rows="3"
              className="form-control"
              required={true}
              placeholder="e.g. Graduated from university, started development role, or commenced volunteer community service."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button onClick={() => setIsOpenModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Save Changes" : "Create Milestone"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Timeline Event?"
        message="This action will permanently discard this timeline milestone. Please confirm."
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default CareerTimeline;
