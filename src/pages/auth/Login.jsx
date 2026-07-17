import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { validateLogin } from "../../utils/validation";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Navbar from "../../components/layout/Navbar";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError("");

    const validation = validateLogin({ email, password });
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await login(email, password, rememberMe);
      navigate("/dashboard");
    } catch (err) {
      setGeneralError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />
      
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div className="card" style={{ width: "100%", maxWidth: "420px", padding: "2.5rem 2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.5rem", textAlign: "center" }}>Welcome Back</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "2rem", textAlign: "center" }}>
            Login to access your comeback workspace
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input
              label="Email Address"
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required={true}
            />

            <Input
              label="Password"
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required={true}
            />

            <div className="flex justify-between items-center" style={{ fontSize: "0.85rem", marginTop: "-0.25rem" }}>
              <label className="flex items-center gap-1" style={{ cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
                />
                <span>Remember Me</span>
              </label>

              <Link to="/forgot-password" style={{ fontWeight: 500 }}>
                Forgot Password?
              </Link>
            </div>

            <Button type="submit" variant="primary" loading={loading} style={{ marginTop: "1rem" }}>
              Log In
            </Button>
          </form>

          <p style={{ marginTop: "1.5rem", fontSize: "0.85rem", textAlignment: "center", color: "var(--text-muted)", textAlign: "center" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ fontWeight: 600 }}>
              Start Your Comeback
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
