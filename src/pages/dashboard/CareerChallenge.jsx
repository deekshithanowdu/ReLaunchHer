import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ProgressBar from "../../components/common/ProgressBar";
import Toast from "../../components/common/Toast";
import { Award, CheckCircle, Zap, Shield, Flame, BookOpen, Compass, Code, Mic, Users, Heart } from "lucide-react";
import Button from "../../components/common/Button";

const CareerChallenge = () => {
  const { challengeTasks, completeChallengeDay, addNotification } = useAppContext();
  
  const [toastMessage, setToastMessage] = useState("");

  const handleCompleteDay = (day, title) => {
    completeChallengeDay(day);
    setToastMessage(`Day ${day} task "${title}" marked as completed! Badge unlocked.`);
  };

  // Calculations
  const completedTasks = challengeTasks.filter(t => t.isCompleted);
  const totalCompleted = completedTasks.length;
  const progressPercent = Math.round((totalCompleted / challengeTasks.length) * 100) || 0;

  // Streak is calculated by longest sequential completed tasks from day 1
  let currentStreak = 0;
  for (let i = 0; i < challengeTasks.length; i++) {
    if (challengeTasks[i].isCompleted) {
      currentStreak += 1;
    } else {
      break;
    }
  }

  // Total points earned
  const totalPoints = completedTasks.reduce((acc, t) => acc + t.points, 0);

  const getBadgeIcon = (name) => {
    switch (name) {
      case "Comeback Starter": return <Compass size={24} />;
      case "Resume Refreshed": return <Flame size={24} style={{ color: "#f97316" }} />;
      case "Self-Aware Leader": return <Shield size={24} style={{ color: "#3b82f6" }} />;
      case "Lifelong Learner": return <BookOpen size={24} style={{ color: "#8b5cf6" }} />;
      case "Maker Persona": return <Code size={24} style={{ color: "#ec4899" }} />;
      case "Fluent Speaker": return <Mic size={24} style={{ color: "#10b981" }} />;
      case "Networker Pro": return <Users size={24} style={{ color: "#f59e0b" }} />;
      default: return <Award size={24} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Page Header */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>30-Day Career Comeback Challenge</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Embark on small, daily actionable goals over 30 days to build momentum, secure badges, and track your launch progress.
        </p>
      </div>

      {/* Grid of stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem" }}>
        
        {/* Streak card */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
          <div style={{ padding: "0.75rem", borderRadius: "50%", backgroundColor: "#fff5f5", color: "#ef4444" }}>
            <Flame size={28} fill="#ef4444" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Current Streak</span>
            <strong style={{ fontSize: "1.5rem" }}>{currentStreak} Tasks</strong>
          </div>
        </div>

        {/* Points card */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
          <div style={{ padding: "0.75rem", borderRadius: "50%", backgroundColor: "var(--primary-light)", color: "var(--primary-color)" }}>
            <Zap size={28} fill="var(--primary-color)" />
          </div>
          <div>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Experience Points</span>
            <strong style={{ fontSize: "1.5rem" }}>{totalPoints} XP</strong>
          </div>
        </div>

        {/* Progress card */}
        <div className="card" style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1.25rem" }}>
          <div style={{ padding: "0.75rem", borderRadius: "50%", backgroundColor: "#e6fbf1", color: "#10b981" }}>
            <CheckCircle size={28} />
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block" }}>Overall Progress</span>
            <strong style={{ fontSize: "1.25rem" }}>{progressPercent}% Complete</strong>
          </div>
        </div>

      </div>

      <div className="dashboard-grid">
        
        {/* Left Column (8 cols): Challenge days list */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1rem" }}>Daily Milestones</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {challengeTasks.map((task) => (
                <div
                  key={task.day}
                  style={{
                    backgroundColor: "var(--bg-main)",
                    borderRadius: "var(--radius-md)",
                    padding: "1rem 1.25rem",
                    border: "1px solid var(--border-color)",
                    display: "flex",
                    alignItems: "start",
                    gap: "1rem",
                    transition: "var(--transition-smooth)"
                  }}
                  className="challenge-row"
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: task.isCompleted ? "#d1fae5" : "var(--border-color)",
                      color: task.isCompleted ? "#065f46" : "var(--text-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      flexShrink: 0
                    }}
                  >
                    D{task.day}
                  </div>

                  <div style={{ flex: 1 }}>
                    <h5 style={{ fontSize: "0.95rem", fontWeight: 600, color: task.isCompleted ? "var(--text-light)" : "var(--text-main)", textDecoration: task.isCompleted ? "line-through" : "none", marginBottom: "0.15rem" }}>
                      {task.title}
                    </h5>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                      {task.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--primary-color)" }}>
                        +{task.points} XP
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
                        &bull; Badge: {task.badge}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleCompleteDay(task.day, task.title)}
                    variant={task.isCompleted ? "secondary" : "primary"}
                    disabled={task.isCompleted}
                    style={{ padding: "0.35rem 0.75rem", fontSize: "0.75rem" }}
                  >
                    {task.isCompleted ? "Completed" : "Complete Task"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Badges vault */}
        <div className="span-4">
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>Badges Unlocked</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem" }}>
              {challengeTasks.map((task) => {
                const isUnlocked = task.isCompleted;
                return (
                  <div
                    key={task.day}
                    style={{
                      border: "1px solid var(--border-color)",
                      backgroundColor: isUnlocked ? "var(--bg-card)" : "var(--bg-main)",
                      borderRadius: "var(--radius-sm)",
                      padding: "0.75rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      opacity: isUnlocked ? 1 : 0.45,
                      transition: "var(--transition-smooth)"
                    }}
                    title={isUnlocked ? `Unlocked: ${task.badge}` : `Locked: Complete Day ${task.day} to unlock`}
                  >
                    <div style={{ marginBottom: "0.5rem", color: isUnlocked ? "var(--primary-color)" : "var(--text-light)" }}>
                      {getBadgeIcon(task.badge)}
                    </div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "var(--text-main)", display: "block" }}>
                      {task.badge}
                    </span>
                    <span style={{ fontSize: "0.6rem", color: "var(--text-light)", marginTop: "2px" }}>
                      {isUnlocked ? "Unlocked" : `Day ${task.day}`}
                    </span>
                  </div>
                );
              })}
            </div>
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
        .challenge-row:hover {
          border-color: var(--primary-color) !important;
        }
      `}</style>
    </div>
  );
};

export default CareerChallenge;
