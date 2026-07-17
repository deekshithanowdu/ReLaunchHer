import React from "react";
import Navbar from "../../components/layout/Navbar";
import { Sparkles, Heart, Award, Shield } from "lucide-react";

const About = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      <section style={{ padding: "4rem 0 3rem 0", backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container text-center" style={{ maxWidth: "800px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--secondary-color)", marginBottom: "1rem" }}>
            About ReLaunchHer
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
            Re-inventing career re-entry paths. We believe a career break is simply a chapter of life, not the end of your story.
          </p>
        </div>
      </section>

      <section style={{ padding: "4rem 0" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <div className="card" style={{ padding: "2rem", marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", color: "var(--secondary-color)", marginBottom: "1rem" }}>Our Mission</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              Women take career breaks for numerous reasons—raising children, managing elder care, relocations, health recoveries, or self-care. Too often, returning is met with rigid hiring systems that filter profiles solely on chronological continuous work experience.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", margin: 0 }}>
              ReLaunchHer was founded to redesign this pipeline. We partner with returner-friendly organizations and provide client-side tools that rebuild confidence, prove capabilities, and bridge resume gaps.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="about-grid">
            <div className="card">
              <div style={{ color: "var(--primary-color)", marginBottom: "0.75rem" }}><Heart size={28} /></div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Empathetic Design</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>We value family commitment and caregiver experiences, translating those organizing achievements into transferable business scores.</p>
            </div>

            <div className="card">
              <div style={{ color: "var(--primary-color)", marginBottom: "0.75rem" }}><Award size={28} /></div>
              <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Ready to Return</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>Our platform goes past listing openings: it prepares you with actual portfolios, mock interviews, and mentoring logs.</p>
            </div>
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
