import React from "react";
import Navbar from "../../components/layout/Navbar";
import { Link } from "react-router-dom";
import { CheckCircle2, ChevronRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    { title: "Define Your Story", desc: "Build a positive Career Break Story. Document volunteer projects, family management skills, or community organizing, transforming gaps into assets." },
    { title: "Assess & Learn", desc: "Use our Skill Assessments to gauge confidence levels. If you identify gaps, follow our customized Learning Roadmaps." },
    { title: "Construct a Portfolio", desc: "Log personal code repositories or design links directly inside our portfolio display board to exhibit your capability." },
    { title: "Connect & Apply", desc: "Meet with top industry mentors, schedule mock interviews, and submit applications directly to returnship and remote job listings." }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      <section style={{ padding: "4rem 0 3rem 0", backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container text-center" style={{ maxWidth: "800px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--secondary-color)", marginBottom: "1rem" }}>
            How ReLaunchHer Works
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
            Four structured checkpoints to guide you from career break to career comeback.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "800px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {steps.map((step, idx) => (
              <div key={idx} className="card" style={{ display: "flex", gap: "1.5rem", alignItems: "start", padding: "2rem" }} className="step-card">
                <div
                  style={{
                    backgroundColor: "var(--primary-light)",
                    color: "var(--primary-color)",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  {idx + 1}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--secondary-color)", marginBottom: "0.5rem" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
              Get Started Now <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 576px) {
          .step-card {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;
