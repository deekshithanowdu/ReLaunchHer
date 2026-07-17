import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { Bell, CheckCheck, Trash2, ShieldCheck, Calendar, Briefcase, BookOpen, AlertCircle, Compass } from "lucide-react";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Toast from "../../components/common/Toast";
import { formatDate } from "../../utils/helpers";

const Notifications = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification
  } = useAppContext();

  const [filterUnreadOnly, setFilterUnreadOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const getIcon = (type) => {
    switch (type) {
      case "Job Applications":
        return <Briefcase size={16} style={{ color: "#3b82f6" }} />;
      case "Mentor Sessions":
        return <UsersIcon size={16} style={{ color: "#f59e0b" }} />;
      case "Learning Reminders":
        return <BookOpen size={16} style={{ color: "#8b5cf6" }} />;
      case "Interview Reminders":
        return <AlertCircle size={16} style={{ color: "#ec4899" }} />;
      default:
        return <Compass size={16} style={{ color: "var(--primary-color)" }} />;
    }
  };

  const UsersIcon = ({ size, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );

  const handleMarkAllRead = () => {
    markAllNotificationsRead();
    setToastMessage("All alerts marked as read.");
  };

  const handleDelete = (id) => {
    deleteNotification(id);
    setToastMessage("Notification removed.");
  };

  const handleMarkRead = (id) => {
    markNotificationRead(id);
  };

  // Filter lists
  const filteredNotifications = notifications.filter((n) => {
    if (filterUnreadOnly && n.read) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>My Notifications</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Stay updated with mock reminders, mentor session bookings, application stage adjustments, and system status alerts.
          </p>
        </div>

        {notifications.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button onClick={handleMarkAllRead} variant="secondary" iconBefore={<CheckCheck size={16} />}>
              Mark All Read
            </Button>
          </div>
        )}
      </div>

      <div className="card">
        {/* Toggle options bar */}
        <div className="flex justify-between items-center mb-4" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setFilterUnreadOnly(false)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: !filterUnreadOnly ? 600 : 500,
                color: !filterUnreadOnly ? "var(--primary-color)" : "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              All Notifications ({notifications.length})
            </button>
            <button
              onClick={() => setFilterUnreadOnly(true)}
              style={{
                background: "transparent",
                border: "none",
                fontSize: "0.85rem",
                fontWeight: filterUnreadOnly ? 600 : 500,
                color: filterUnreadOnly ? "var(--primary-color)" : "var(--text-muted)",
                cursor: "pointer"
              }}
            >
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications feeds */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            title="All caught up!"
            description="You have no notifications in this view."
            icon={<ShieldCheck size={48} style={{ color: "#10b981" }} />}
          />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {filteredNotifications.map((n) => (
              <div
                key={n.id}
                style={{
                  display: "flex",
                  alignItems: "start",
                  gap: "1rem",
                  padding: "1rem",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: n.read ? "var(--bg-card)" : "var(--primary-light)",
                  border: "1px solid var(--border-color)",
                  transition: "var(--transition-smooth)"
                }}
              >
                <div
                  style={{
                    padding: "0.4rem",
                    borderRadius: "50%",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    boxShadow: "var(--shadow-sm)"
                  }}
                >
                  {getIcon(n.type)}
                </div>

                <div style={{ flex: 1 }}>
                  <div className="flex justify-between items-start mb-1">
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)" }}>
                      {n.type}
                    </span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-light)" }}>
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-main)",
                      margin: 0,
                      fontWeight: n.read ? 400 : 600
                    }}
                  >
                    {n.text}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "0.5rem", alignSelf: "center" }}>
                  {!n.read && (
                    <button
                      onClick={() => handleMarkRead(n.id)}
                      style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--primary-color)" }}
                      title="Mark as Read"
                    >
                      <CheckCheck size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(n.id)}
                    style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444" }}
                    title="Dismiss"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default Notifications;
