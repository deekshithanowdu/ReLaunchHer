import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { interviewQuestions, interviewCategories, interviewDifficulties } from "../../data/interviewQuestions";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import ProgressBar from "../../components/common/ProgressBar";
import Toast from "../../components/common/Toast";
import { Mic, Award, Compass, RotateCcw, ArrowRight, Play, Eye, EyeOff, ShieldCheck } from "lucide-react";

const MockInterview = () => {
  const { interviewHistory, addInterviewAttempt } = useAppContext();

  // Mode: "setup", "active", "completed"
  const [mode, setMode] = useState("setup");
  const [category, setCategory] = useState("HR");
  const [difficulty, setDifficulty] = useState("Beginner");

  // Active quiz states
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealGuides, setRevealGuides] = useState({});
  const [seconds, setSeconds] = useState(0);

  const [toastMessage, setToastMessage] = useState("");

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (mode === "active") {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [mode]);

  const handleStart = () => {
    const list = interviewQuestions[category] || [];
    if (list.length === 0) {
      setToastMessage("No questions available for this category.");
      return;
    }
    setQuestions(list);
    setCurrentIdx(0);
    setAnswers({});
    setRevealGuides({});
    setSeconds(0);
    setMode("active");
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Record history
    const score = Math.round(
      (Object.keys(answers).filter(k => answers[k] && answers[k].trim().length > 20).length / questions.length) * 100
    ) || 0;
    
    addInterviewAttempt(category, difficulty, score, `${questions.length} questions answered.`);
    setMode("completed");
  };

  const handleReset = () => {
    setMode("setup");
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = questions.length > 0 ? Math.round(((currentIdx + 1) / questions.length) * 100) : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Mock Interview Simulator</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Practice explaining resume gaps, answering technical questions, and resolving behavioral scenarios under timing pressures.
        </p>
      </div>

      {mode === "setup" && (
        /* SETUP MODE PANEL */
        <div className="dashboard-grid">
          {/* Setup controls */}
          <div className="span-8">
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 600 }}>Configure Interview Session</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="setup-split-grid">
                <Select
                  label="Category"
                  id="mock-cat"
                  options={interviewCategories}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <Select
                  label="Difficulty Level"
                  id="mock-diff"
                  options={interviewDifficulties}
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
              </div>

              <div style={{ marginTop: "1rem" }}>
                <Button onClick={handleStart} variant="primary" iconBefore={<Play size={16} />} style={{ width: "100%" }}>
                  Start Mock Session
                </Button>
              </div>
            </div>
          </div>

          {/* History Lists */}
          <div className="span-4">
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%" }}>
              <h4 style={{ fontSize: "1rem", fontWeight: 600 }}>Session History</h4>
              
              {interviewHistory.length === 0 ? (
                <p style={{ color: "var(--text-light)", fontSize: "0.85rem", margin: "1rem 0" }}>No practice logs registered yet.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", overflowY: "auto", maxHeight: "250px" }}>
                  {interviewHistory.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: "var(--bg-main)",
                        padding: "0.75rem",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.8rem",
                        border: "1px solid var(--border-color)"
                      }}
                    >
                      <div className="flex justify-between font-semibold">
                        <span>{item.category} ({item.difficulty})</span>
                        <span style={{ color: item.score >= 70 ? "#10b981" : "var(--primary-color)" }}>{item.score}%</span>
                      </div>
                      <div className="flex justify-between mt-1 text-muted" style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
                        <span>{item.summary}</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {mode === "active" && questions.length > 0 && (
        /* ACTIVE INTERVIEW PROCESS PANEL */
        <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-color)", backgroundColor: "var(--primary-light)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                {category} &bull; {difficulty}
              </span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-light)", marginLeft: "1rem" }}>
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>
            
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--secondary-color)" }} className="flex items-center gap-1">
              <span>Time:</span> {formatTime(seconds)}
            </div>
          </div>

          <ProgressBar value={progressPercent} showLabel={false} height="4px" />

          {/* Question Text */}
          <div style={{ backgroundColor: "var(--bg-main)", padding: "1.5rem", borderRadius: "var(--radius-md)", border: "1px solid var(--border-color)" }}>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--secondary-color)", lineHeight: "1.4" }}>
              "{questions[currentIdx].question}"
            </h3>
          </div>

          {/* Textarea answer form */}
          <div className="form-group">
            <label className="form-label" htmlFor="mock-answer">Your Answer</label>
            <textarea
              id="mock-answer"
              rows="6"
              className="form-control"
              placeholder="Type your response here. For behavioral questions, remember to use the STAR method (Situation, Task, Action, Result)."
              value={answers[currentIdx] || ""}
              onChange={(e) => setAnswers(prev => ({ ...prev, [currentIdx]: e.target.value }))}
            />
          </div>

          {/* Guide recommendation toggle drawer */}
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
            <button
              onClick={() => setRevealGuides(prev => ({ ...prev, [currentIdx]: !prev[currentIdx] }))}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--primary-color)",
                fontSize: "0.85rem",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              {revealGuides[currentIdx] ? <EyeOff size={16} /> : <Eye size={16} />}
              {revealGuides[currentIdx] ? "Hide Answer Guide" : "Reveal Answer Guide"}
            </button>

            {revealGuides[currentIdx] && (
              <div
                style={{
                  backgroundColor: "var(--primary-light)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1rem",
                  marginTop: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}
              >
                <div style={{ fontSize: "0.8rem", color: "var(--primary-color)", fontWeight: 700 }} className="flex items-center gap-1">
                  <ShieldCheck size={14} /> Framing Advice:
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-main)", margin: 0 }}>
                  {questions[currentIdx].guide}
                </p>
                
                <div style={{ fontSize: "0.8rem", color: "var(--primary-color)", fontWeight: 700, marginTop: "0.5rem" }}>
                  Model Answer Reference:
                </div>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
                  "{questions[currentIdx].sampleAnswer}"
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mt-2">
            <Button onClick={handleReset} variant="secondary">
              Quit Session
            </Button>
            
            <Button onClick={handleNext} variant="primary" iconAfter={<ArrowRight size={16} />}>
              {currentIdx === questions.length - 1 ? "Complete Interview" : "Next Question"}
            </Button>
          </div>

        </div>
      )}

      {mode === "completed" && (
        /* COMPLETED REVIEW PANEL */
        <div className="card text-center" style={{ padding: "3rem 2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
          <Award size={64} style={{ color: "var(--primary-color)" }} />
          
          <div>
            <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>Mock Session Complete!</h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
              Your responses have been successfully logged in the career workspace history.
            </p>
          </div>

          <div style={{ backgroundColor: "var(--bg-main)", padding: "1.5rem", borderRadius: "var(--radius-md)", width: "100%", maxWidth: "450px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="completed-stats-split">
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block" }}>Total Duration</span>
                <strong style={{ fontSize: "1.2rem" }}>{formatTime(seconds)}</strong>
              </div>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "block" }}>Questions Attempted</span>
                <strong style={{ fontSize: "1.2rem" }}>{questions.length}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem" }}>
            <Button onClick={handleStart} variant="secondary" iconBefore={<RotateCcw size={16} />}>
              Restart Mock
            </Button>
            <Button onClick={handleReset} variant="primary">
              Done & Return
            </Button>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .setup-split-grid {
            grid-template-columns: 1fr !important;
          }
          .completed-stats-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MockInterview;
