import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Heart,
  History,
  GitBranch,
  CheckSquare,
  User,
  FileText,
  TrendingUp,
  BookOpen,
  Briefcase,
  Layers,
  Award,
  Users,
  Compass,
  Bell,
  Settings,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  HelpCircle as QuestionIcon
} from "lucide-react";

const Sidebar = ({ isMobileOpen, closeSidebar }) => {
  const location = useLocation();

  const menuSections = [
    {
      title: "CAREER JOURNEY",
      items: [
        { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        { label: "Career Break Story", path: "/career-break-story", icon: <Heart size={18} /> },
        { label: "Career Timeline", path: "/career-timeline", icon: <History size={18} /> },
        { label: "Career Pathways", path: "/career-pathways", icon: <GitBranch size={18} /> },
        { label: "Readiness Checklist", path: "/readiness", icon: <CheckSquare size={18} /> }
      ]
    },
    {
      title: "DEVELOPMENT",
      items: [
        { label: "Profile", path: "/profile", icon: <User size={18} /> },
        { label: "Resume Builder", path: "/resume", icon: <FileText size={18} /> },
        { label: "Skill Assessment", path: "/skills", icon: <TrendingUp size={18} /> },
        { label: "Learning Roadmap", path: "/learning", icon: <BookOpen size={18} /> },
        { label: "Portfolio", path: "/portfolio", icon: <Briefcase size={18} /> },
        { label: "Mock Interview", path: "/interview", icon: <Award size={18} /> }
      ]
    },
    {
      title: "OPPORTUNITIES",
      items: [
        { label: "Jobs", path: "/jobs", icon: <Layers size={18} /> },
        { label: "Applications", path: "/applications", icon: <CheckCircle size={18} /> },
        { label: "Mentors", path: "/mentors", icon: <Users size={18} /> },
        { label: "Community", path: "/community", icon: <Compass size={18} /> },
        { label: "Support Circles", path: "/support-circles", icon: <Users size={18} /> }
      ]
    },
    {
      title: "PROGRESS",
      items: [
        { label: "Career Challenge", path: "/career-challenge", icon: <Award size={18} /> },
        { label: "Notifications", path: "/notifications", icon: <Bell size={18} /> },
        { label: "Settings", path: "/settings", icon: <Settings size={18} /> }
      ]
    }
  ];

  const sidebarContent = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "1.5rem 1rem",
        backgroundColor: "var(--bg-card)",
        color: "var(--text-main)",
        overflowY: "auto",
        borderRight: "1px solid var(--border-color)",
        transition: "var(--transition-smooth)"
      }}
    >
      {menuSections.map((section, idx) => (
        <div key={idx} style={{ marginBottom: "1.5rem" }}>
          <h5
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "var(--text-light)",
              marginBottom: "0.75rem",
              paddingLeft: "0.5rem"
            }}
          >
            {section.title}
          </h5>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
            {section.items.map((item, itemIdx) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={itemIdx}>
                  <Link
                    to={item.path}
                    onClick={closeSidebar}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.625rem 0.75rem",
                      borderRadius: "var(--radius-sm)",
                      fontSize: "0.9rem",
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? "var(--primary-color)" : "var(--text-muted)",
                      backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                      transition: "var(--transition-smooth)"
                    }}
                    className="sidebar-link-item"
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        style={{
          width: "260px",
          height: "calc(100vh - 70px)",
          position: "sticky",
          top: "70px",
          zIndex: 100
        }}
        className="desktop-sidebar-aside"
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {isMobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            width: "100%",
            height: "calc(100vh - 70px)",
            backgroundColor: "rgba(15, 23, 42, 0.4)",
            zIndex: 900
          }}
          onClick={closeSidebar}
        >
          <div
            style={{
              width: "260px",
              height: "100%",
              backgroundColor: "var(--bg-card)",
              boxShadow: "var(--shadow-lg)",
              animation: "slideInLeft 0.2s ease-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
      <style>{`
        .sidebar-link-item:hover {
          color: var(--primary-color) !important;
          background-color: var(--primary-light) !important;
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        @media (max-width: 768px) {
          .desktop-sidebar-aside {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Sidebar;
