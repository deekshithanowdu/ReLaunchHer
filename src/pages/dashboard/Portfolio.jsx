import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProjectCard from "../../components/portfolio/ProjectCard";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { Plus, Sparkles } from "lucide-react";

const Portfolio = () => {
  const {
    portfolio,
    addPortfolioProject,
    deletePortfolioProject,
    updatePortfolioProject
  } = useAppContext();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [gitHubLink, setGitHubLink] = useState("");
  const [liveDemo, setLiveDemo] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [category, setCategory] = useState("Frontend");

  const [deleteId, setDeleteId] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const categories = ["Frontend", "Backend", "Full Stack", "Mobile App", "UI/UX Design", "Data Analytics", "Product Management"];

  const handleOpenAdd = () => {
    setIsEditing(false);
    setTitle("");
    setDescription("");
    setTechnologies("");
    setGitHubLink("");
    setLiveDemo("");
    setCompletionDate("");
    setCategory("Frontend");
    setIsOpenModal(true);
  };

  const handleOpenEdit = (proj) => {
    setIsEditing(true);
    setEditingId(proj.id);
    setTitle(proj.title);
    setDescription(proj.description);
    setTechnologies(proj.technologies);
    setGitHubLink(proj.gitHubLink || "");
    setLiveDemo(proj.liveDemo || "");
    setCompletionDate(proj.completionDate || "");
    setCategory(proj.category || "Frontend");
    setIsOpenModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return;

    const data = {
      title,
      description,
      technologies,
      gitHubLink,
      liveDemo,
      completionDate,
      category
    };

    if (isEditing) {
      updatePortfolioProject(editingId, data);
      setToastMessage("Project updated successfully!");
    } else {
      addPortfolioProject(data);
      setToastMessage("Project added to portfolio!");
    }

    setIsOpenModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteId) return;
    deletePortfolioProject(deleteId);
    setDeleteId(null);
    setToastMessage("Project removed from portfolio.");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>My Comeback Portfolio</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Showcase your updated technical capabilities. Link direct repositories and working web application demonstrations.
          </p>
        </div>

        <Button onClick={handleOpenAdd} variant="primary" iconBefore={<Plus size={16} />}>
          Add Project
        </Button>
      </div>

      {portfolio.length === 0 ? (
        <div className="card text-center" style={{ padding: "4rem 2rem", border: "1px dashed var(--border-color)", boxShadow: "none" }}>
          <p style={{ color: "var(--text-light)", marginBottom: "1.5rem" }}>Your portfolio is currently empty. Add projects to demonstrate your skills.</p>
          <Button onClick={handleOpenAdd} variant="primary">Add Your First Project</Button>
        </div>
      ) : (
        /* Grid of Projects */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {portfolio.map((proj) => (
            <ProjectCard
              key={proj.id}
              project={proj}
              onEdit={handleOpenEdit}
              onDelete={(id) => setDeleteId(id)}
            />
          ))}
        </div>
      )}

      {/* CRUD Project modal */}
      <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} title={isEditing ? "Edit Project Details" : "Add Portfolio Project"} size="md">
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="portfolio-modal-split">
            <Input
              label="Project Title"
              id="port-title"
              required={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Select
              label="Category"
              id="port-cat"
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <Input
            label="Technologies Used (Comma-separated)"
            id="port-tech"
            placeholder="React, CSS, Node, MongoDB..."
            value={technologies}
            onChange={(e) => setTechnologies(e.target.value)}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="portfolio-modal-split">
            <Input
              label="GitHub Link (Code)"
              id="port-git"
              type="url"
              placeholder="https://github.com/username/project"
              value={gitHubLink}
              onChange={(e) => setGitHubLink(e.target.value)}
            />
            <Input
              label="Live Demo Link"
              id="port-demo"
              type="url"
              placeholder="https://example.com/project"
              value={liveDemo}
              onChange={(e) => setLiveDemo(e.target.value)}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            <Input
              label="Completion Date"
              id="port-date"
              type="date"
              value={completionDate}
              onChange={(e) => setCompletionDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="port-desc" className="form-label">Project Description</label>
            <textarea
              id="port-desc"
              rows="4"
              className="form-control"
              required={true}
              placeholder="Detail design decisions, feature outlines, and technical challenges solved."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
            <Button onClick={() => setIsOpenModal(false)} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              {isEditing ? "Save Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project?"
        message="This action will permanently discard this project case study. Please confirm."
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .portfolio-modal-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
