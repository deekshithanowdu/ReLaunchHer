import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { calculateJobCompatibility } from "../../utils/jobCompatibility";
import JobCompatibility from "../../components/jobs/JobCompatibility";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { ArrowLeft, Briefcase, MapPin, DollarSign, Calendar, ShieldCheck, HelpCircle } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { jobs, skills, addJobApplication, applications } = useAppContext();

  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const job = jobs.find(j => j.id === id);

  if (!job) {
    return (
      <div style={{ padding: "4rem 0", textAlignment: "center" }} className="text-center">
        <h3 className="mb-2">Job listing not found</h3>
        <Link to="/jobs" className="btn btn-primary">Back to Jobs Board</Link>
      </div>
    );
  }

  // Calculate compatibility details
  const compatibility = calculateJobCompatibility(job, currentUser || {}, skills);
  
  // Check if user has already applied
  const alreadyApplied = applications.some(app => app.jobTitle === job.title && app.company === job.company);

  const handleApply = () => {
    if (alreadyApplied) {
      setToastMessage("You have already logged an application for this position.");
      return;
    }

    setLoading(true);
    // Simulate application processing delay
    setTimeout(() => {
      addJobApplication({
        jobTitle: job.title,
        company: job.company,
        status: "Applied",
        notes: `Applied to ${job.title} on ${new Date().toLocaleDateString()}. Compatibility score: ${compatibility.total}%`,
        interviewDate: "",
        reminderDate: ""
      });
      setToastMessage("Application logged successfully! Added to your Tracker Kanban board.");
      setLoading(false);
    }, 700);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Back button link */}
      <div>
        <Link to="/jobs" style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.85rem", fontWeight: 600 }} className="mb-2">
          <ArrowLeft size={16} /> Back to Jobs Board
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="dashboard-grid">
        
        {/* Left Column (8 cols): Job Description & Specs */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Main header block */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{job.title}</h2>
              <span style={{ fontSize: "1rem", color: "var(--text-muted)", fontWeight: 600 }}>{job.company}</span>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "1rem 0" }} className="job-specs-bar">
              <span className="flex items-center gap-1 text-muted" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <MapPin size={16} /> {job.location}
              </span>
              <span className="flex items-center gap-1 text-muted" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <Briefcase size={16} /> {job.jobType}
              </span>
              <span className="flex items-center gap-1 text-muted" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <DollarSign size={16} /> {job.salary}
              </span>
              <span className="flex items-center gap-1 text-muted" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <Calendar size={16} /> Posted {formatDate(job.postedDate)}
              </span>
            </div>

            <div>
              <h4 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Role Overview</h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.6", margin: 0 }}>
                {job.description}
              </p>
            </div>
          </div>

          {/* Requirements block */}
          {job.requirements && (
            <div className="card">
              <h4 style={{ fontSize: "1.1rem", marginBottom: "0.75rem" }}>Requirements & Candidate Fit</h4>
              <ul style={{ paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {job.requirements.map((req, idx) => (
                  <li key={idx} style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Right Column (4 cols): Compatibility gauge & Log Action buttons */}
        <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <JobCompatibility compatibility={compatibility} />

          {/* Application trigger actions card */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4 style={{ fontSize: "1rem", margin: 0, fontWeight: 600 }}>Log Application</h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Applying directly or wanting to track your re-entry progress? Click below to log this position in your comeback Kanban board.
            </p>

            <Button
              onClick={handleApply}
              variant={alreadyApplied ? "secondary" : "primary"}
              disabled={alreadyApplied}
              loading={loading}
              style={{ width: "100%" }}
            >
              {alreadyApplied ? "Already Applied" : "Log Application / Apply"}
            </Button>
          </div>

        </div>

      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .job-specs-bar {
            flex-direction: column !important;
            gap: 0.75rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default JobDetails;
