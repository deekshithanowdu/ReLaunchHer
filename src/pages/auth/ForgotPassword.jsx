import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: "400px", padding: "2.5rem 2rem" }}>
          <h2 style={{ fontSize: "1.4rem", marginBottom: "0.5rem", textAlign: "center" }}>Reset Password</h2>
          
          {submitted ? (
            <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div
                style={{
                  backgroundColor: "var(--primary-light)",
                  color: "var(--primary-color)",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.85rem",
                  textAlign: "left"
                }}
              >
                Password reset link has been dispatched to <strong>{email}</strong>. Please check your inbox or spam folders.
              </div>
              <Link to="/login" className="btn btn-primary" style={{ marginTop: "1rem" }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center", marginBottom: "1rem" }}>
                Provide your email address below, and we will dispatch a validation link to reset your account credentials.
              </p>
              
              <Input
                label="Email Address"
                id="forgot-email"
                type="email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button type="submit" variant="primary" style={{ marginTop: "0.5rem" }}>
                Send Reset Link
              </Button>
            </form>
          )}

          {!submitted && (
            <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", textAlign: "center", color: "var(--text-muted)", margin: "1.5rem 0 0 0" }}>
              Remember credentials?{" "}
              <Link to="/login" style={{ fontWeight: 600 }}>
                Login
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
