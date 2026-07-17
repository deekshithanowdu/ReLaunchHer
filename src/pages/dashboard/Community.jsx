import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import PostCard from "../../components/community/PostCard";
import Select from "../../components/common/Select";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { communityCategories } from "../../data/communityPosts";
import { Send, Search, Compass } from "lucide-react";
import Toast from "../../components/common/Toast";

const Community = () => {
  const { currentUser } = useAuth();
  const { posts, addPost, deletePost, likePost, addComment } = useAppContext();

  // Creating post form
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("General Discussion");

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    addPost(postContent, postCategory);
    setPostContent("");
    setToastMessage("Community post published!");
  };

  const handleLike = (postId) => {
    likePost(postId);
  };

  const handleDelete = (postId) => {
    deletePost(postId);
    setToastMessage("Post deleted.");
  };

  const handleAddComment = (postId, commentText) => {
    addComment(postId, commentText);
    setToastMessage("Comment published.");
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesContent = post.content.toLowerCase().includes(query);
      const matchesAuthor = post.author.toLowerCase().includes(query);
      if (!matchesContent && !matchesAuthor) return false;
    }

    if (selectedCategory && post.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Community Forum</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Connect with peers on the same journey. Share progress milestones, tips, and ask career questions.
        </p>
      </div>

      {/* Main layout grid */}
      <div className="dashboard-grid">
        
        {/* Left Column (8 cols): Post Form & Feeds */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          {/* Post Form */}
          <div className="card">
            <form onSubmit={handleCreatePost} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share a milestone, question, or resource..."
                  className="form-control"
                  rows="3"
                  required={true}
                  style={{ resize: "none" }}
                />
              </div>

              <div className="flex justify-between items-center" style={{ flexWrap: "wrap", gap: "1rem" }}>
                <div style={{ minWidth: "200px" }}>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="form-control"
                    style={{ padding: "0.375rem 0.75rem", fontSize: "0.85rem" }}
                  >
                    {communityCategories.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <Button type="submit" variant="primary" disabled={!postContent.trim()} iconBefore={<Send size={14} />}>
                  Publish Post
                </Button>
              </div>
            </form>
          </div>

          {/* Feeds list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filteredPosts.length === 0 ? (
              <EmptyState
                title="No posts found"
                description="Be the first to publish a post in this category, or reset filters."
                actionLabel="Reset Search Filters"
                onAction={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                }}
              />
            ) : (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onDelete={handleDelete}
                  onAddComment={handleAddComment}
                  currentUserName={currentUser?.fullName}
                />
              ))
            )}
          </div>

        </div>

        {/* Right Column (4 cols): Search and Filtering panels */}
        <div className="span-4" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 600 }} className="flex items-center gap-1">
              <Search size={16} /> Search Forum
            </h4>

            {/* Keyword Search */}
            <div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts or authors..."
                className="form-control"
                style={{ fontSize: "0.9rem" }}
              />
            </div>

            {/* Categories filters list */}
            <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
              <label className="form-label" style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-light)" }}>
                Categories Filter
              </label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => setSelectedCategory("")}
                  style={{
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    color: selectedCategory === "" ? "var(--primary-color)" : "var(--text-muted)",
                    fontWeight: selectedCategory === "" ? 600 : 500,
                    padding: "0.25rem"
                  }}
                >
                  All Categories
                </button>
                {communityCategories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      textAlign: "left",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      color: selectedCategory === cat ? "var(--primary-color)" : "var(--text-muted)",
                      fontWeight: selectedCategory === cat ? 600 : 500,
                      padding: "0.25rem"
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

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

export default Community;
