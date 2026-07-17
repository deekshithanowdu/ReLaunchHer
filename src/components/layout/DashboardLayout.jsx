import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(prev => !prev);
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar toggleMobileSidebar={toggleMobileSidebar} />
      
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar isMobileOpen={mobileSidebarOpen} closeSidebar={closeMobileSidebar} />
        
        <main
          style={{
            flex: 1,
            padding: "2rem",
            backgroundColor: "var(--bg-main)",
            transition: "var(--transition-smooth)",
            overflowX: "hidden"
          }}
          className="dashboard-main-content"
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {children}
          </div>
        </main>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .dashboard-main-content {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;
