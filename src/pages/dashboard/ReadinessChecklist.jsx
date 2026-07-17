import React from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import ProgressBar from "../../components/common/ProgressBar";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";

const ReadinessChecklist = () => {
  const { currentUser } = useAuth();
  const {
    skills,
    courses,
    portfolio,
    interviewHistory,
    bookings,
    applications
  } = useAppContext();

  // Compute status checks dynamically based on global states
  const checks = [
    {
      id: "chk-profile",
      label: "Complete Profile Preferences",
      desc: "Specify your previous background and desired workspace boundaries.",
      completed: !!currentUser?.fullName && !!currentUser?.previousCareer && !!currentUser?.targetCareer,
      link: "/profile"
    },
    {
      id: "chk-resume",
      label: "Update & Frame Your Resume",
      desc: "Detail your qualifications and draft a summary reframing your gap.",
      completed: !!currentUser?.fullName && !!currentUser?.education,
      link: "/resume"
    },
    {
      id: "chk-skills",
      label: "Complete Skill Assessment",
      desc: "Evaluate your confidence in required pathways capabilities.",
      completed: skills.filter(s => s.confidence !== "Beginner").length >= 2,
      link: "/skills"
    },
    {
      id: "chk-learning",
      label: "Complete a Learning Plan Course",
      desc: "Refresh your technical knowledge and log roadmap progression.",
      completed: courses.some(c => c.status === "Completed"),
      link: "/learning"
    },
    {
      id: "chk-portfolio",
      label: "Build Your Portfolio",
      desc: "Add at least one active showcase project with source code and live links.",
      completed: portfolio.length > 0,
      link: "/portfolio"
    },
    {
      id: "chk-interview",
      label: "Practice Mock Interview Questions",
      desc: "Run mock verbal challenges across HR, Technical, and Behavioral categories.",
      completed: interviewHistory.length > 0,
      link: "/interview"
    },
    {
      id: "chk-mentor",
      label: "Connect with a Career Mentor",
      desc: "Schedule a chat or review booking slots with matched professionals.",
      completed: bookings.length > 0,
      link: "/mentors"
    },
    {
      id: "chk-jobs",
      label: "Apply for Jobs / Log Applications",
      desc: "Find compatible positions, check compatibility, and submit applications.",
      completed: applications.length > 0,
      link: "/jobs"
    }
  ];

  const completedCount = checks.filter(c => c.completed).length;
  const progressPercent = Math.round((completedCount / checks.length) * 100);

  const getReadinessLevel = (val) => {
    if (val >= 91) return { level: "Career Comeback Ready", desc: "Fantastic job! You have satisfied all readiness checkmarks. You are highly ready to launch your comeback.", color: "#10b981" };
    if (val >= 71) return { level: "Almost Ready", desc: "You are almost there. Practice some more mock questions or apply to jobs to cross the finish line.", color: "var(--primary-color)" };
    if (val >= 41) return { level: "Building Momentum", desc: "Great progress! Rebuilding confidence takes time. Continue completing roadmap course milestones.", color: "#f59e0b" };
    return { level: "Getting Started", desc: "Take your first steps. Fill out your profile and explain your career break to kickstart your score.", color: "#64748b" };
  };

  const statusInfo = getReadinessLevel(progressPercent);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Readiness Checklist</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Track critical checkpoints that prepare you to re-enter the corporate environment successfully.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="readiness-grid">
        
        {/* Left Column Checklist checks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }} className="readiness-checklist-col">
          {checks.map((chk) => (
            <div
              key={chk.id}
              className="card"
              style={{
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "start",
                gap: "1rem",
                borderLeft: chk.completed ? "4px solid #10b981" : "1px solid var(--border-color)",
                transition: "var(--transition-smooth)"
              }}
            >
              <div style={{ marginTop: "2px", color: chk.completed ? "#10b981" : "var(--text-light)" }}>
                {chk.completed ? <CheckCircle2 size={18} fill="#10b981" style={{ color: "white" }} /> : <Circle size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--text-main)", marginBottom: "0.15rem" }}>{chk.label}</h5>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0, marginBottom: "0.5rem" }}>{chk.desc}</p>
                <Link to={chk.link} style={{ fontSize: "0.75rem", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "2px" }}>
                  Go to section <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column Readiness Gauges */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="card text-center" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem", padding: "2.5rem" }}>
            <h4 style={{ fontSize: "1.1rem", margin: 0 }}>Launch Readiness Index</h4>
            
            <div
              style={{
                width: "140px",
                height: "140px",
                borderRadius: "50%",
                border: "10px solid var(--border-color)",
                borderTopColor: statusInfo.color,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <span style={{ fontSize: "2.25rem", fontWeight: 800 }}>{progressPercent}%</span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "2px" }}>Ready</span>
            </div>

            <div>
              <h5 style={{ fontSize: "1.1rem", color: statusInfo.color, marginBottom: "0.5rem", fontWeight: 600 }}>
                {statusInfo.level}
              </h5>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0, maxWidth: "300px" }}>
                {statusInfo.desc}
              </p>
            </div>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 600 }} className="flex items-center gap-1">
              <Sparkles size={16} style={{ color: "var(--primary-color)" }} /> Comeback Tips
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Completing the skill assessment and mock interview questions contributes the highest weight to landing returnships. We recommend starting with these elements.
            </p>
          </div>

        </div>

      </div>
      <style>{`
        @media (max-width: 768px) {
          .readiness-grid {
            grid-template-columns: 1fr !important;
          }
          .readiness-checklist-col {
            order: 2 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ReadinessChecklist;
