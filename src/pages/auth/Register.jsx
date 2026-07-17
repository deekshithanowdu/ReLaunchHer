import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateRegistration } from "../../utils/validation";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";
import ProgressBar from "../../components/common/ProgressBar";

const Register = () => {
  const { register, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // Phase toggler: "register" or "onboarding"
  const [phase, setPhase] = useState("register");
  
  // Registration Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [careerBreakDuration, setCareerBreakDuration] = useState("");
  const [previousCareer, setPreviousCareer] = useState("");
  const [targetCareer, setTargetCareer] = useState("");

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  // Onboarding Wizard State (7 Steps)
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [education, setEducation] = useState("");
  const [breakReason, setBreakReason] = useState("");
  const [breakActivities, setBreakActivities] = useState("");
  const [currentSkills, setCurrentSkills] = useState("");
  const [locationPreference, setLocationPreference] = useState("Remote"); // Remote, Hybrid, Office
  const [timePreference, setTimePreference] = useState("Full-Time"); // Full-Time, Part-Time, Flexible Hours

  const breakDurations = ["1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"];
  const careers = ["Software Engineer", "UI/UX Designer", "Data Analyst", "Project Manager", "Other"];
  const targetCareers = ["Frontend Developer", "UI/UX Designer", "Data Analyst", "Project Manager"];

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const data = {
      fullName,
      email,
      password,
      confirmPassword,
      careerBreakDuration,
      previousCareer,
      targetCareer
    };

    const validation = validateRegistration(data);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await register({
        fullName,
        email,
        careerBreakDuration,
        previousCareer,
        targetCareer
      });
      // Move to onboarding wizard
      setPhase("onboarding");
    } catch (err) {
      setGeneralError(err.message || "Registration failed. Please check your inputs.");
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingNext = () => {
    if (onboardingStep < 7) {
      setOnboardingStep(prev => prev + 1);
    } else {
      handleOnboardingComplete();
    }
  };

  const handleOnboardingPrev = () => {
    if (onboardingStep > 1) {
      setOnboardingStep(prev => prev - 1);
    }
  };

  const handleOnboardingComplete = () => {
    const finalProfile = {
      education,
      breakReason,
      breakActivities,
      skillsList: currentSkills.split(",").map(s => s.trim()).filter(Boolean),
      workPreferences: {
        locationType: locationPreference,
        timeCommitment: timePreference
      }
    };
    completeOnboarding(finalProfile);
    navigate("/dashboard");
  };

  const handleSkipOnboarding = () => {
    completeOnboarding({});
    navigate("/dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        
        {phase === "register" ? (
          /* REGISTRATION SCREEN */
          <div className="card" style={{ width: "100%", maxWidth: "480px", padding: "2.5rem 2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", textAlign: "center" }}>Create Your Comeback Account</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem", textAlign: "center" }}>
              Join thousands of women restarting their career journeys
            </p>

            {generalError && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  marginBottom: "1.25rem"
                }}
              >
                {generalError}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="register-layout-grid">
                <Input
                  label="Full Name"
                  id="reg-fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  error={errors.fullName}
                  required={true}
                  className="span-12"
                />
                
                <Input
                  label="Email Address"
                  id="reg-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  required={true}
                  className="span-12"
                />

                <Input
                  label="Password"
                  id="reg-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  required={true}
                />

                <Input
                  label="Confirm Password"
                  id="reg-confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errors.confirmPassword}
                  required={true}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
                <Select
                  label="Career Break Duration"
                  id="reg-breakDuration"
                  options={breakDurations}
                  value={careerBreakDuration}
                  onChange={(e) => setCareerBreakDuration(e.target.value)}
                  error={errors.careerBreakDuration}
                  required={true}
                />

                <Select
                  label="Previous Professional Domain"
                  id="reg-prev"
                  options={careers}
                  value={previousCareer}
                  onChange={(e) => setPreviousCareer(e.target.value)}
                  error={errors.previousCareer}
                  required={true}
                />

                <Select
                  label="Target Career Comeback Track"
                  id="reg-target"
                  options={targetCareers}
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                  error={errors.targetCareer}
                  required={true}
                />
              </div>

              <Button type="submit" variant="primary" loading={loading} style={{ marginTop: "1rem" }}>
                Sign Up & Continue
              </Button>
            </form>

            <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", textAlignment: "center", color: "var(--text-muted)", textAlign: "center" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ fontWeight: 600 }}>
                Login
              </Link>
            </p>
          </div>
        ) : (
          /* ONBOARDING WIZARD SCREEN */
          <div className="card" style={{ width: "100%", maxWidth: "550px", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="flex justify-between items-center">
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--primary-color)", textTransform: "uppercase" }}>
                Step {onboardingStep} of 7: {
                  [
                    "Personal Background",
                    "Previous Career",
                    "Career Break Story",
                    "Current Skills",
                    "Target Career",
                    "Work Preferences",
                    "Comeback Strategy"
                  ][onboardingStep - 1]
                }
              </span>
              <button
                onClick={handleSkipOnboarding}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-light)",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600
                }}
              >
                Skip wizard & explore
              </button>
            </div>
            
            <ProgressBar value={onboardingStep} max={7} showLabel={false} height="6px" color="var(--primary-color)" />

            <div style={{ minHeight: "150px" }} className="onboarding-step-body">
              {onboardingStep === 1 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Tell us about your educational background</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>This helps us recommend paths that align with your credentials.</p>
                  <Input
                    label="School, College or Highest Degree"
                    id="onb-edu"
                    placeholder="e.g. B.S. in Computer Science, Northwestern University"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Detail your previous career experience</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>Confirming your previous responsibilities before the break.</p>
                  <div className="form-group">
                    <label className="form-label">Tell us about your previous role achievements</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={breakReason}
                      onChange={(e) => setBreakReason(e.target.value)}
                      placeholder="e.g., Managed databases, optimized UI assets, or directed local campaigns."
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>What did you do during your career break?</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>Volunteer work, household management, caregiving organizing, or freelance.</p>
                  <div className="form-group">
                    <label className="form-label">Activities and learnings during break</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={breakActivities}
                      onChange={(e) => setBreakActivities(e.target.value)}
                      placeholder="e.g. Managed volunteer website build, did freelance writing, raised children, or did caregiving."
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 4 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>What are your current skills?</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>List any technical or coordination skills you currently feel comfortable with.</p>
                  <Input
                    label="Skills (Comma-separated)"
                    id="onb-skills"
                    placeholder="HTML, CSS, Communication, Organization..."
                    value={currentSkills}
                    onChange={(e) => setCurrentSkills(e.target.value)}
                  />
                </div>
              )}

              {onboardingStep === 5 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Confirm your target career path</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>This sets your learning modules and job compatibility index.</p>
                  <Select
                    label="Target Path"
                    id="onb-target"
                    options={targetCareers}
                    value={targetCareer}
                    onChange={(e) => setTargetCareer(e.target.value)}
                  />
                </div>
              )}

              {onboardingStep === 6 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>What are your work preferences?</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1rem" }}>Determine location types and time commitments.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="register-layout-grid">
                    <Select
                      label="Location Preference"
                      id="onb-loc"
                      options={["Remote", "Hybrid", "Office"]}
                      value={locationPreference}
                      onChange={(e) => setLocationPreference(e.target.value)}
                    />
                    <Select
                      label="Time Commitment"
                      id="onb-time"
                      options={["Full-Time", "Part-Time", "Flexible Hours"]}
                      value={timePreference}
                      onChange={(e) => setTimePreference(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {onboardingStep === 7 && (
                <div>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Confirm your comeback plan</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "1.5rem" }}>You are ready to launch your Career Comeback! Click complete below to access your custom workspace.</p>
                  <div style={{ backgroundColor: "var(--bg-main)", padding: "1rem", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
                    <strong>Comeback Plan Initialized:</strong>
                    <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem", display: "flex", flexDirection: "column", gap: "0.25rem", color: "var(--text-muted)" }}>
                      <li>Target Career: {targetCareer}</li>
                      <li>Commitment: {timePreference} ({locationPreference})</li>
                      <li>Checkpoint Roadmap loaded</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "space-between", marginTop: "1rem" }}>
              <Button
                onClick={handleOnboardingPrev}
                variant="secondary"
                disabled={onboardingStep === 1}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleOnboardingNext}
                variant="primary"
              >
                {onboardingStep === 7 ? "Complete Onboarding" : "Next"}
              </Button>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @media (max-width: 576px) {
          .register-layout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Register;
