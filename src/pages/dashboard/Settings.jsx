import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";
import ConfirmDialog from "../../components/common/ConfirmDialog";
import { Sun, Moon, Eye, ShieldAlert, Key } from "lucide-react";

const Settings = () => {
  const { currentUser, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { settings, setSettings, addNotification } = useAppContext();
  const navigate = useNavigate();

  // Local Form state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Settings checkbox preferences
  const [emailNotifs, setEmailNotifs] = useState(settings.notificationsEmail);
  const [pushNotifs, setPushNotifs] = useState(settings.notificationsPush);
  const [language, setLanguage] = useState(settings.language || "English");

  const [toastMessage, setToastMessage] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSavePreferences = (e) => {
    e.preventDefault();
    setSettings({
      notificationsEmail: emailNotifs,
      notificationsPush: pushNotifs,
      language
    });
    addNotification("System Notifications", "System workspace preferences updated.");
    setToastMessage("Settings updated successfully!");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!password) return;

    if (password.length < 6) {
      setToastMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match.");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    addNotification("System Notifications", "Your account security password has been modified.");
    setToastMessage("Password changed successfully!");
  };

  const handleDeleteAccount = () => {
    logout();
    setToastMessage("Your account has been deleted.");
    // Wait briefly and navigate to landing
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Account Settings</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Manage your account configurations, security credentials, push notifications, and themes.
        </p>
      </div>

      <div className="dashboard-grid">
        
        {/* Left Column (8 cols): Security and Preferences */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Preferences Form */}
          <div className="card">
            <h4 style={{ fontSize: "1.05rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
              General Preferences
            </h4>
            <form onSubmit={handleSavePreferences} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <label className="flex items-center gap-2" style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                  <input
                    type="checkbox"
                    checked={emailNotifs}
                    onChange={(e) => setEmailNotifs(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
                  />
                  <span>Receive email alerts for mentor bookings and jobs compatibility.</span>
                </label>

                <label className="flex items-center gap-2" style={{ cursor: "pointer", fontSize: "0.9rem" }}>
                  <input
                    type="checkbox"
                    checked={pushNotifs}
                    onChange={(e) => setPushNotifs(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
                  />
                  <span>Receive dashboard notifications when community comments occur.</span>
                </label>
              </div>

              <Select
                label="Interface Language"
                id="sett-lang"
                options={["English", "Spanish", "French", "German"]}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />

              <div style={{ display: "flex", justify: "flex-end" }}>
                <Button type="submit" variant="primary">
                  Save Preferences
                </Button>
              </div>
            </form>
          </div>

          {/* Security Form */}
          <div className="card">
            <h4 style={{ fontSize: "1.05rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }} className="flex items-center gap-2">
              <Key size={18} /> Modify Account Password
            </h4>
            <form onSubmit={handlePasswordSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="settings-fields-split">
                <Input
                  label="New Password"
                  id="sett-pwd"
                  type="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Confirm New Password"
                  id="sett-pwd-conf"
                  type="password"
                  required={true}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justify: "flex-end" }}>
                <Button type="submit" variant="primary">
                  Change Password
                </Button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column (4 cols): Theme Mode & Destructive Actions */}
        <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Theme panel */}
          <div className="card">
            <h4 style={{ fontSize: "1rem", marginBottom: "1rem", fontWeight: 600 }}>Aesthetic Themes</h4>
            
            <div
              onClick={toggleTheme}
              style={{
                cursor: "pointer",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                display: "flex",
                justifyContent: "between",
                alignItems: "center",
                backgroundColor: "var(--bg-main)"
              }}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }} className="flex items-center gap-2">
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
                {darkMode ? "Dark Theme Mode" : "Light Theme Mode"}
              </span>
              <span style={{ color: "var(--primary-color)", fontSize: "0.8rem", fontWeight: 600 }}>Toggle</span>
            </div>
          </div>

          {/* Delete Account */}
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h4 style={{ fontSize: "1rem", color: "#ef4444", margin: 0, fontWeight: 600 }} className="flex items-center gap-1">
              <ShieldAlert size={16} /> Destructive Zone
            </h4>
            <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
              Once you confirm, all logged timeline history, portfolios, and applications will be deleted.
            </p>

            <Button onClick={() => setShowDeleteConfirm(true)} variant="danger">
              Delete Account
            </Button>
          </div>

        </div>

      </div>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteAccount}
        title="Delete ReLaunchHer Account?"
        message="This is high risk and cannot be undone. All your comeback data will be permanently cleared."
      />

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 576px) {
          .settings-fields-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Settings;
