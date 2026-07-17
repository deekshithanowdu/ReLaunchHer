import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import SupportCircleCard from "../../components/community/SupportCircleCard";
import PostCard from "../../components/community/PostCard";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import Toast from "../../components/common/Toast";
import { ArrowLeft, MessageSquare, Users, Send } from "lucide-react";

const SupportCircles = () => {
  const { currentUser } = useAuth();
  const { circles, joinCircle, leaveCircle, posts, addPost, likePost, addComment, deletePost } = useAppContext();

  // Active Circle view: if null, display directory cards. If set, display circle workspace details.
  const [activeCircle, setActiveCircle] = useState(null);
  
  // Custom Circle Posting
  const [circlePostText, setCirclePostText] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleJoin = (circleId) => {
    joinCircle(circleId);
    setToastMessage("Joined support circle successfully!");
    
    // Sync activeCircle ref state if opened
    if (activeCircle && activeCircle.id === circleId) {
      setActiveCircle(prev => ({
        ...prev,
        joined: true,
        membersCount: prev.membersCount + 1
      }));
    }
  };

  const handleLeave = (circleId) => {
    leaveCircle(circleId);
    setToastMessage("Left support circle.");
    
    if (activeCircle && activeCircle.id === circleId) {
      setActiveCircle(prev => ({
        ...prev,
        joined: false,
        membersCount: Math.max(0, prev.membersCount - 1)
      }));
    }
  };

  const handleOpenCircle = (circle) => {
    setActiveCircle(circle);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!circlePostText.trim()) return;

    // Simulate adding post to the circle (filtering posts by circle name or category)
    addPost(circlePostText, activeCircle.name);
    setCirclePostText("");
    setToastMessage("Circle discussion updated!");
  };

  // Filter posts related to this circle category name
  const circlePosts = posts.filter(post => post.category === activeCircle?.name);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      {!activeCircle ? (
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Support Circles Directory</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
            Join dedicated support communities tailored to your specific returner background and flexibility needs.
          </p>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setActiveCircle(null)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--primary-color)"
            }}
            className="mb-2"
          >
            <ArrowLeft size={16} /> Back to Directory
          </button>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{activeCircle.name}</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>{activeCircle.description}</p>
        </div>
      )}

      {!activeCircle ? (
        /* 1. DIRECTORY LISTS VIEW */
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {circles.map((circle) => (
            <SupportCircleCard
              key={circle.id}
              circle={circle}
              onJoin={handleJoin}
              onLeave={handleLeave}
              onView={handleOpenCircle}
            />
          ))}
        </div>
      ) : (
        /* 2. SPECIFIC SUPPORT CIRCLE PANEL DISCUSSION VIEW */
        <div className="dashboard-grid">
          {/* Discussions feeds */}
          <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Create Post in Circle */}
            {activeCircle.joined ? (
              <div className="card">
                <form onSubmit={handlePostSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <textarea
                    value={circlePostText}
                    onChange={(e) => setCirclePostText(e.target.value)}
                    placeholder={`Write a message to ${activeCircle.name}...`}
                    className="form-control"
                    rows="3"
                    required={true}
                    style={{ resize: "none" }}
                  />
                  <div style={{ display: "flex", justify: "flex-end" }}>
                    <Button type="submit" variant="primary" disabled={!circlePostText.trim()} iconBefore={<Send size={14} />}>
                      Post in Circle
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card text-center" style={{ padding: "2rem" }}>
                <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
                  You must be a member of this circle to view and publish comments in discussions.
                </p>
                <Button onClick={() => handleJoin(activeCircle.id)} variant="primary">
                  Join support circle
                </Button>
              </div>
            )}

            {/* Posts feed */}
            {activeCircle.joined && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 600 }}>Circle Discussions</h4>
                
                {circlePosts.length === 0 ? (
                  <EmptyState
                    title="No discussions logged yet"
                    description="Be the first to ask questions or share thoughts in this peer group."
                  />
                ) : (
                  circlePosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={likePost}
                      onDelete={deletePost}
                      onAddComment={addComment}
                      currentUserName={currentUser?.fullName}
                    />
                  ))
                )}
              </div>
            )}

          </div>

          {/* Circle Info Side Panel */}
          <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              <h4 style={{ fontSize: "1rem", margin: 0, fontWeight: 600 }}>Circle Metrics</h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                <span className="flex items-center gap-2">
                  <Users size={16} style={{ color: "var(--primary-color)" }} />
                  <strong>{activeCircle.membersCount}</strong> members joined
                </span>
                <span className="flex items-center gap-2">
                  <MessageSquare size={16} style={{ color: "var(--primary-color)" }} />
                  <strong>{circlePosts.length}</strong> active posts
                </span>
              </div>

              <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
                <Button
                  onClick={() => activeCircle.joined ? handleLeave(activeCircle.id) : handleJoin(activeCircle.id)}
                  variant={activeCircle.joined ? "secondary" : "primary"}
                  style={{ width: "100%" }}
                >
                  {activeCircle.joined ? "Leave Circle" : "Join Circle"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default SupportCircles;
