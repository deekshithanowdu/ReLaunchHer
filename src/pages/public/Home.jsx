import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Star, ShieldCheck, Heart, Sparkles, HelpCircle, Compass, HelpCircle as QuestionIcon } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const stats = [
    { label: "Comeback Journeys", value: "10,000+" },
    { label: "Dedicated Mentors", value: "5,000+" },
    { label: "Learning Milestones", value: "20,000+" },
    { label: "Job Opportunities", value: "8,000+" }
  ];

  const features = [
    { title: "Career Story Builder", desc: "Reframe your employment gap positively as a series of growth events rather than empty voids." },
    { title: "Skill Assessments", desc: "Evaluate your confidence index against market expectations for your target comeback role." },
    { title: "Interactive Roadmaps", desc: "Embark on custom learning schedules seed-mapped with articles, repositories, and challenges." },
    { title: "Portfolio Showcasing", desc: "Log active client designs and production deployments to show immediate technical utility." },
    { title: "Mock Interview Sessions", desc: "Walk through curated pools of HR, technical, and behavioral queries before real calls." },
    { title: "Returnships & Flex Jobs", desc: "Filter job boards customized with returnships, remote works, and flexible commitments." }
  ];

  const stories = [
    {
      name: "Monica Geller",
      role: "Lead Frontend Engineer",
      company: "InnovateTech",
      break: "3 Years for Caregiving",
      text: "I was terrified that three years away from code meant starting over. ReLaunchHer helped me structure my learning pathway, map my soft skills, and land an interview with a partner returnship program."
    },
    {
      name: "Phoebe Buffay",
      role: "Product Manager",
      company: "FlexFlow Solutions",
      break: "2 Years for Family Health",
      text: "Re-framing my gap story was the breakthrough. Understanding that organizing volunteers and managing schedules was project coordination gave me the confidence to apply to mid-level roles."
    }
  ];

  const faqs = [
    { q: "What is a Returnship?", a: "A returnship is a paid, structured internship-style program designed specifically for professionals returning to work after a career break. It typically lasts 3 to 6 months and includes mentoring, skills refreshers, and potential transition to a full-time role." },
    { q: "Is ReLaunchHer only for technology jobs?", a: "No! While we support tech paths like software development and design, we also have pathways and job matches for project management, data analysis, copywriting, and marketing." },
    { q: "Do I have to pay to use the platform?", a: "The core tools (profile, timeline builder, resume score, mock interviews, and jobs board) are completely free. Premium courses or individual certification vouchers are optional." }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: "5rem 0 4rem 0", backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border-color)", transition: "var(--transition-smooth)" }}>
        <div className="container text-center" style={{ maxWidth: "800px" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem", color: "var(--primary-color)", backgroundColor: "var(--primary-light)", padding: "0.4rem 0.8rem", borderRadius: "9999px", fontSize: "0.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>
            <Sparkles size={14} /> Restarting Careers with Confidence
          </span>
          <h1 style={{ fontSize: "3rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--secondary-color)", marginBottom: "1.25rem" }}>
            Your Career Break Is Not the End of Your Story.
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", marginBottom: "2.5rem", maxWidth: "650px", margin: "0 auto 2.5rem auto" }}>
            Rebuild your skills. Rediscover your confidence. Restart your career. ReLaunchHer guides you from resume gap to comeback ready.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/register" className="btn btn-primary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Start My Career Comeback
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary" style={{ padding: "0.75rem 1.75rem", fontSize: "1rem" }}>
              Explore How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Visual Journey flowchart */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--bg-main)" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "1.8rem" }}>
            The Comeback Roadmap
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "between",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
              maxWidth: "1100px",
              margin: "0 auto"
            }}
            className="journey-flowchart"
          >
            {[
              { num: "01", title: "Share Story", desc: "Detail break activities" },
              { num: "02", title: "Assess Skills", desc: "Identify key gaps" },
              { num: "03", title: "Learn & Build", desc: "Build roadmap" },
              { num: "04", title: "Practice Mock", desc: "Mock interview drills" },
              { num: "05", title: "Apply Flex", desc: "Apply with confidence" }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div
                  className="card text-center"
                  style={{
                    flex: 1,
                    minWidth: "160px",
                    padding: "1.5rem 1rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-color)", opacity: 0.5, marginBottom: "0.5rem" }}>
                    {step.num}
                  </span>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.25rem" }}>{step.title}</h4>
                  <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>{step.desc}</p>
                </div>
                {idx < 4 && (
                  <span
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--text-light)",
                      fontWeight: "bold"
                    }}
                    className="journey-arrow"
                  >
                    &rarr;
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--bg-card)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container" style={{ maxWidth: "900px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.8rem" }}>
            The Re-entry Obstacles
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem" }}>
            Returning to work after a break is more than just searching job ads. It is a transition that requires addressing unique pain points:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="problem-grid">
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ color: "var(--accent-color)" }}><Heart size={24} /></div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>Resume Gap Apprehension</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Fear that hiring managers will discard profiles instantly due to empty dates.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ color: "var(--accent-color)" }}><ShieldCheck size={24} /></div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>Outdated Skill Indices</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Rapid evolution in code libraries, design packages, and coordination methodologies.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ color: "var(--accent-color)" }}><Compass size={24} /></div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>Imposter Syndrome</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Loss of professional confidence and fear of explaining domestic break details.</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
              <div style={{ color: "var(--accent-color)" }}><CheckCircle2 size={24} /></div>
              <div>
                <h4 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>Lack of Flexible Jobs</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>Portals mainly list standard 60-hour in-office jobs, discarding hybrid or core availability needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "var(--bg-main)" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.8rem" }}>
            The ReLaunchHer Ecosystem
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem", maxWidth: "600px", margin: "0 auto 3rem auto" }}>
            We provide a complete, integrated system designed specifically to bridge career breaks.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {features.map((feat, idx) => (
              <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--primary-color)", fontWeight: 600 }}>
                  <CheckCircle2 size={18} />
                  <span>{feat.title}</span>
                </div>
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--primary-color)", color: "white" }}>
        <div className="container" style={{ display: "flex", justify: "around", flexWrap: "wrap", gap: "2rem" }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: "center", flex: 1, minWidth: "150px" }}>
              <h2 style={{ fontSize: "3rem", fontWeight: 800, color: "white", marginBottom: "0.25rem" }}>{stat.value}</h2>
              <span style={{ fontSize: "0.9rem", opacity: 0.85, fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section style={{ padding: "5rem 0", backgroundColor: "var(--bg-card)" }}>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "1rem", fontSize: "1.8rem" }}>
            Comeback Stories
          </h2>
          <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "3rem" }}>
            Real transformations from women who reclaimed their professional identities.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="problem-grid">
            {stories.map((story, idx) => (
              <div key={idx} className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="flex gap-2 mb-2" style={{ color: "#fbbf24" }}>
                  <Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" /><Star size={16} fill="#fbbf24" />
                </div>
                <p style={{ fontStyle: "italic", fontSize: "0.9rem", color: "var(--text-main)", margin: 0 }}>
                  "{story.text}"
                </p>
                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", marginTop: "0.5rem" }} className="flex justify-between items-center">
                  <div>
                    <h5 style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>{story.name}</h5>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{story.role} at {story.company}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--primary-color)", fontWeight: 600, backgroundColor: "var(--primary-light)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                    {story.break}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: "5rem 0", backgroundColor: "var(--bg-main)", borderTop: "1px solid var(--border-color)" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "3rem", fontSize: "1.8rem" }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="card"
                style={{ padding: "1.25rem", cursor: "pointer" }}
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center">
                  <h4 style={{ fontSize: "0.95rem", margin: 0, fontWeight: 600 }}>{faq.q}</h4>
                  <span style={{ color: "var(--primary-color)" }}>{activeFaq === idx ? "-" : "+"}</span>
                </div>
                {activeFaq === idx && (
                  <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.75rem", paddingStyle: "none", margin: 0 }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "var(--bg-card)",
          borderTop: "1px solid var(--border-color)",
          padding: "3rem 0 2rem 0",
          marginTop: "auto",
          transition: "var(--transition-smooth)"
        }}
      >
        <div className="container" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          <div style={{ display: "flex", justify: "between", flexWrap: "wrap", gap: "2rem" }}>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <h4 style={{ color: "var(--primary-color)", fontWeight: 700, fontSize: "1.2rem", marginBottom: "0.75rem" }}>
                ReLaunchHer
              </h4>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0, maxWidth: "250px" }}>
                Your Career. Your Comeback. Your Future. Re-entry tools for modern women returning to the workforce.
              </p>
            </div>
            
            <div style={{ display: "flex", gap: "3rem" }}>
              <div>
                <h5 style={{ fontSize: "0.85rem", color: "var(--secondary-color)", marginBottom: "0.75rem", fontWeight: 600 }}>Platform</h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8rem" }}>
                  <li><Link to="/register" style={{ color: "var(--text-muted)" }}>Get Started</Link></li>
                  <li><Link to="/login" style={{ color: "var(--text-muted)" }}>Login</Link></li>
                  <li><Link to="/how-it-works" style={{ color: "var(--text-muted)" }}>How It Works</Link></li>
                </ul>
              </div>
              <div>
                <h5 style={{ fontSize: "0.85rem", color: "var(--secondary-color)", marginBottom: "0.75rem", fontWeight: 600 }}>Company</h5>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.8rem" }}>
                  <li><Link to="/about" style={{ color: "var(--text-muted)" }}>About Us</Link></li>
                  <li><span style={{ color: "var(--text-light)" }}>Partnerships</span></li>
                  <li><span style={{ color: "var(--text-light)" }}>Privacy Policy</span></li>
                </ul>
              </div>
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem", display: "flex", justify: "between", fontSize: "0.75rem", color: "var(--text-light)" }}>
            <span>&copy; {new Date().getFullYear()} ReLaunchHer Inc. All rights reserved.</span>
            <span>Made with &hearts; for Career Returners</span>
          </div>
        </div>
      </footer>
      <style>{`
        @media (max-width: 768px) {
          .journey-flowchart {
            flex-direction: column !important;
            align-items: center !important;
            gap: 1rem !important;
          }
          .journey-arrow {
            transform: rotate(90deg) !important;
            margin: 0.25rem 0 !important;
          }
          .problem-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
