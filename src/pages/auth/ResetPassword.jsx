import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem 2rem" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", textAlign: "center" }}>Set New Password</h2>

          {error && (
            <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "0.75rem", borderRadius: "4px", fontSize: "0.8rem", marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          {submitted ? (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ backgroundColor: "#d1fae5", color: "#065f46", padding: "0.75rem 1rem", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", textAlign: "left" }}>
                Password has been modified successfully. You can now use your updated password credentials to access your account dashboard.
              </div>
              <Link to="/login" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Log In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Input
                label="New Password"
                id="reset-password-input"
                type="password"
                required={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Input
                label="Confirm New Password"
                id="reset-confirm-password"
                type="password"
                required={true}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <Button type="submit" variant="primary" style={{ marginTop: "0.5rem" }}>
                Save Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
