import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import { Save, User, Settings, ShieldAlert } from "lucide-react";

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { addNotification } = useAppContext();

  // Local Form state
  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [education, setEducation] = useState(currentUser?.education || "");
  const [previousExperience, setPreviousExperience] = useState(currentUser?.previousExperience || "");
  const [careerBreakDuration, setCareerBreakDuration] = useState(currentUser?.careerBreakDuration || "");
  const [targetCareer, setTargetCareer] = useState(currentUser?.targetCareer || "");
  const [preferredLocation, setPreferredLocation] = useState(currentUser?.preferredLocation || "");

  // Preferences
  const [locationType, setLocationType] = useState(currentUser?.workPreferences?.locationType || "Remote");
  const [timeCommitment, setTimeCommitment] = useState(currentUser?.workPreferences?.timeCommitment || "Full-Time");
  const [travelPreference, setTravelPreference] = useState(currentUser?.workPreferences?.travelPreference || "No Travel");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSave = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      setToastMessage("Name and Email are required fields.");
      setToastType("error");
      return;
    }

    const updatedData = {
      fullName,
      email,
      phone,
      education,
      previousExperience,
      careerBreakDuration,
      targetCareer,
      preferredLocation,
      workPreferences: {
        locationType,
        timeCommitment,
        travelPreference
      }
    };

    updateProfile(updatedData);
    addNotification("System Notifications", "Your profile details and job preferences have been updated.");
    setToastMessage("Profile saved successfully!");
    setToastType("success");
  };

  const travelOptions = ["No Travel", "Limited Travel", "Willing to Travel"];
  const locationOptions = ["Remote", "Hybrid", "Office"];
  const commitmentOptions = ["Full-Time", "Part-Time", "Flexible Hours"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>My Profile & Preferences</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Manage your personal details, career goals, and flexibility requirements to align with compatible listings.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
        
        {/* Core Profile Edit Card */}
        <div className="card">
          <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Row 1: Personal */}
            <div>
              <h4 style={{ fontSize: "1.05rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }} className="flex items-center gap-2">
                <User size={18} /> Personal Background
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="profile-fields-grid">
                <Input
                  label="Full Name"
                  id="prof-name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={true}
                />
                <Input
                  label="Email Address"
                  id="prof-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
                <Input
                  label="Phone Number"
                  id="prof-phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  label="Highest Academic Education"
                  id="prof-edu"
                  placeholder="e.g. Master of Business Admin, Cornell"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Career details */}
            <div>
              <h4 style={{ fontSize: "1.05rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                Career Details
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="profile-fields-grid">
                <Input
                  label="Previous Experience/Title"
                  id="prof-prev"
                  placeholder="e.g. QA Lead or Marketing Director"
                  value={previousExperience}
                  onChange={(e) => setPreviousExperience(e.target.value)}
                />
                <Select
                  label="Career Break Duration"
                  id="prof-dur"
                  options={["1 Year", "2 Years", "3 Years", "4 Years", "5+ Years"]}
                  value={careerBreakDuration}
                  onChange={(e) => setCareerBreakDuration(e.target.value)}
                />
                <Select
                  label="Target Comeback Path"
                  id="prof-target"
                  options={["Frontend Developer", "UI/UX Designer", "Data Analyst", "Project Manager"]}
                  value={targetCareer}
                  onChange={(e) => setTargetCareer(e.target.value)}
                />
                <Input
                  label="Preferred Location/Base City"
                  id="prof-loc"
                  placeholder="e.g. Chicago, IL"
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Row 3: Work Preferences */}
            <div>
              <h4 style={{ fontSize: "1.05rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }} className="flex items-center gap-2">
                <Settings size={18} /> Flexibility & Work Preferences
              </h4>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }} className="profile-flexibility-grid">
                <Select
                  label="Workplace Format"
                  id="pref-format"
                  options={locationOptions}
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                />
                <Select
                  label="Weekly Hours Commitment"
                  id="pref-time"
                  options={commitmentOptions}
                  value={timeCommitment}
                  onChange={(e) => setTimeCommitment(e.target.value)}
                />
                <Select
                  label="Travel Restrictions"
                  id="pref-travel"
                  options={travelOptions}
                  value={travelPreference}
                  onChange={(e) => setTravelPreference(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Block */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.25rem", display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="primary" iconBefore={<Save size={16} />}>
                Save Profile Changes
              </Button>
            </div>

          </form>
        </div>

      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 768px) {
          .profile-fields-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-flexibility-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;
