import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import ResumeForm from "../../components/resume/ResumeForm";
import ResumePreview from "../../components/resume/ResumePreview";
import ResumeScoreCard from "../../components/resume/ResumeScoreCard";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { Printer, Save, FileText, Download } from "lucide-react";

const ResumeBuilder = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addNotification } = useAppContext();

  // Load resume data directly from currentUser object, or fallback to mock defaults
  const [resumeData, setResumeData] = useState(() => {
    return {
      fullName: currentUser?.fullName || "Jane Doe",
      email: currentUser?.email || "jane.doe@example.com",
      phone: currentUser?.phone || "(555) 019-2834",
      preferredLocation: currentUser?.preferredLocation || "Chicago, IL",
      summary: currentUser?.summary || "Detail-oriented professional returning to the workforce with updated technical skills. Experienced in collaborating across cross-functional teams.",
      experience: currentUser?.experience || [
        { role: "Software Engineer", company: "OldTech Corp", duration: "2018 - 2022", description: "Developed React web interfaces, maintained standard CSS stylesheets, and reduced query latency by 15%." }
      ],
      projects: currentUser?.projects || [
        { title: "Personal Tracker Web App", tech: "React, LocalStorage", description: "Created an interactive workspace tracker to log routine exercises and tasks, persisting logs." }
      ],
      education: currentUser?.education_list || [
        { degree: "B.S. in Computer Science", school: "State University", year: "2018" }
      ]
    };
  });

  const [toastMessage, setToastMessage] = useState("");

  const handleFormUpdate = (updatedChunk) => {
    setResumeData(prev => ({
      ...prev,
      ...updatedChunk
    }));
  };

  const handleSave = () => {
    // Save to auth currentUser state
    updateProfile({
      fullName: resumeData.fullName,
      email: resumeData.email,
      phone: resumeData.phone,
      preferredLocation: resumeData.preferredLocation,
      summary: resumeData.summary,
      experience: resumeData.experience,
      projects: resumeData.projects,
      education_list: resumeData.education
    });
    addNotification("System Notifications", "Your resume template has been updated and saved.");
    setToastMessage("Resume saved successfully!");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="resume-builder-wrapper">
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Resume Builder</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Construct a professional, re-entry tailored resume. Write a clear summary explaining your transition gap.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.5rem" }} className="no-print">
          <Button onClick={handlePrint} variant="secondary" iconBefore={<Printer size={16} />}>
            Print / PDF
          </Button>
          <Button onClick={handleSave} variant="primary" iconBefore={<Save size={16} />}>
            Save Resume
          </Button>
        </div>
      </div>

      {/* Main Builder Grid layout */}
      <div className="builder-layout-split no-print">
        {/* Left Column (Inputs) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }} className="builder-form-panel">
          <ResumeScoreCard resumeData={resumeData} />
          
          <div className="card">
            <ResumeForm resumeData={resumeData} onUpdate={handleFormUpdate} />
          </div>
        </div>

        {/* Right Column (Live Document Preview) */}
        <div className="builder-preview-panel">
          <h4 style={{ fontSize: "1rem", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
            <FileText size={18} /> Live Preview Page
          </h4>
          <ResumePreview resumeData={resumeData} />
        </div>
      </div>

      {/* Printing Only Wrapper layout */}
      <div className="only-print">
        <ResumePreview resumeData={resumeData} />
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <style>{`
        .builder-layout-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: start;
        }
        .only-print {
          display: none;
        }
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          header, aside, .no-print, .mobile-bottom-menu-bar {
            display: none !important;
          }
          main {
            padding: 0 !important;
          }
          .only-print {
            display: block !important;
          }
        }
        @media (max-width: 1024px) {
          .builder-layout-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ResumeBuilder;
