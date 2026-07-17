import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, LogOut, User, Bell, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import { useAppContext } from "../../context/AppContext";

const Navbar = ({ toggleMobileSidebar }) => {
  const { currentUser, logout, isAuthenticated } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { notifications } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;
  const isDashboard = location.pathname.startsWith("/dashboard") || 
                      location.pathname.startsWith("/profile") || 
                      location.pathname.startsWith("/career") || 
                      location.pathname.startsWith("/readiness") || 
                      location.pathname.startsWith("/resume") || 
                      location.pathname.startsWith("/skills") || 
                      location.pathname.startsWith("/learning") || 
                      location.pathname.startsWith("/portfolio") || 
                      location.pathname.startsWith("/interview") || 
                      location.pathname.startsWith("/jobs") || 
                      location.pathname.startsWith("/applications") || 
                      location.pathname.startsWith("/mentors") || 
                      location.pathname.startsWith("/community") || 
                      location.pathname.startsWith("/support-circles") || 
                      location.pathname.startsWith("/notifications") || 
                      location.pathname.startsWith("/settings");

  return (
    <header
      style={{
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 500,
        height: "70px",
        display: "flex",
        alignItems: "center",
        transition: "var(--transition-smooth)"
      }}
    >
      <div
        className="w-full"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 1.5rem",
          maxWidth: "1440px",
          margin: "0 auto"
        }}
      >
        <div className="flex items-center gap-4">
          {/* Mobile menu trigger */}
          {isAuthenticated && isDashboard && (
            <button
              onClick={toggleMobileSidebar}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-main)",
                cursor: "pointer",
                display: "none" // Toggle by media rules in CSS but handled by JS overlay
              }}
              className="mobile-sidebar-toggle"
            >
              <Menu size={24} />
            </button>
          )}

          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "1.4rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "var(--primary-color)"
            }}
          >
            <span>ReLaunchHer</span>
          </Link>
        </div>



        <div className="flex items-center gap-4">
          {/* Public Links */}
          {!isDashboard && (
            <nav
              style={{
                display: "flex",
                gap: "1.75rem",
                alignItems: "center",
                marginRight: "0.5rem"
              }}
              className="public-nav-links"
            >
              <Link to="/" style={{ color: location.pathname === "/" ? "var(--primary-color)" : "var(--text-muted)", fontSize: "0.95rem", fontWeight: 500 }}>Home</Link>
              <Link to="/how-it-works" style={{ color: location.pathname === "/how-it-works" ? "var(--primary-color)" : "var(--text-muted)", fontSize: "0.95rem", fontWeight: 500 }}>How It Works</Link>
              <Link to="/about" style={{ color: location.pathname === "/about" ? "var(--primary-color)" : "var(--text-muted)", fontSize: "0.95rem", fontWeight: 500 }}>About</Link>
            </nav>
          )}


          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Notifications bell */}
              <Link
                to="/notifications"
                style={{
                  color: "var(--text-muted)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "var(--accent-color)",
                      color: "white",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      borderRadius: "50%",
                      width: "16px",
                      height: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </Link>

              {/* User settings / Profile link */}
              {isDashboard ? (
                <div className="flex items-center gap-3">
                  <div
                    onClick={() => navigate("/profile")}
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem"
                    }}
                  >
                    <div
                      style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        backgroundColor: "var(--primary-light)",
                        color: "var(--primary-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600
                      }}
                    >
                      {currentUser?.fullName ? currentUser.fullName.charAt(0) : <User size={18} />}
                    </div>
                    <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "var(--text-main)" }} className="nav-username">
                      {currentUser?.fullName || "Returner"}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "var(--text-muted)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      padding: "0.5rem"
                    }}
                    title="Log Out"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: "0.85rem" }}>
                  Go to Dashboard
                </Link>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <Link to="/login" className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                Start Comeback
              </Link>
            </div>
          )}

          {/* Light/Dark mode switcher at the far right */}
          <button
            onClick={toggleTheme}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "var(--text-muted)",
              display: "flex",
              alignItems: "center",
              padding: "0.5rem",
              borderRadius: "50%"
            }}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .public-nav-links {
            display: none !important;
          }
          .mobile-sidebar-toggle {
            display: block !important;
          }
          .nav-username {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
