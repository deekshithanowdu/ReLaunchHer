import React from "react";
import { Link } from "react-router-dom";
import { HelpCircle } from "lucide-react";
import Navbar from "../../components/layout/Navbar";

const NotFound = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--bg-main)" }}>
      <Navbar />
      <div
        className="container text-center"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.5rem"
        }}
      >
        <HelpCircle size={64} style={{ color: "var(--primary-color)", marginBottom: "1.5rem" }} />
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>404 - Page Not Found</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem", maxWidth: "450px" }}>
          We could not find the page you are looking for. Please check the URL or navigate back to the home view.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
