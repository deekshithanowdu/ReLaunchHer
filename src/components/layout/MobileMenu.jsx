import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Heart, Layers, Users } from "lucide-react";

const MobileMenu = () => {
  const location = useLocation();

  const activeStyle = {
    color: "var(--primary-color)",
    fontWeight: 600
  };

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "Story", path: "/career-break-story", icon: <Heart size={20} /> },
    { label: "Jobs", path: "/jobs", icon: <Layers size={20} /> },
    { label: "Mentors", path: "/mentors", icon: <Users size={20} /> }
  ];

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60px",
        backgroundColor: "var(--bg-card)",
        borderTop: "1px solid var(--border-color)",
        display: "none", // Displayed only under 768px via media query
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: 600,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.05)"
      }}
      className="mobile-bottom-menu-bar"
    >
      {navItems.map((item, idx) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={idx}
            to={item.path}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.75rem",
              color: isActive ? "var(--primary-color)" : "var(--text-muted)",
              gap: "0.25rem"
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
      <style>{`
        @media (max-width: 768px) {
          .mobile-bottom-menu-bar {
            display: flex !important;
          }
          /* Add spacing at bottom of main content to prevent mobile menu blocking view */
          body {
            padding-bottom: 60px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default MobileMenu;
