import React, { useState } from "react";
import { ThumbsUp, MessageSquare, Trash2, Tag, Calendar } from "lucide-react";
import { formatDate } from "../../utils/helpers";
import CommentSection from "./CommentSection";

const PostCard = ({ post, onLike, onDelete, onAddComment, currentUserName }) => {
  const [showComments, setShowComments] = useState(false);

  const isAuthor = post.author === currentUserName || post.author === "Jane Doe"; // mock check

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-3">
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "var(--primary-light)",
              color: "var(--primary-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600
            }}
          >
            {post.author.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h5 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.15rem" }}>
              {post.author}
            </h5>
            <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
              {post.authorTitle}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--text-light)", display: "flex", alignItems: "center", gap: "2px" }}>
            <Calendar size={12} /> {formatDate(post.date)}
          </span>
          {isAuthor && onDelete && (
            <button
              onClick={() => onDelete(post.id)}
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "#ef4444", padding: "0.25rem" }}
              title="Delete Post"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <p style={{ fontSize: "0.9rem", color: "var(--text-main)", margin: 0, whiteSpace: "pre-line", lineBreak: "anywhere" }}>
        {post.content}
      </p>

      <div className="flex justify-between items-center" style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.75rem", fontSize: "0.85rem" }}>
        {/* Category Badge */}
        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.75rem", color: "var(--primary-color)", fontWeight: 500 }}>
          <Tag size={12} /> {post.category}
        </span>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => onLike(post.id)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: post.isLiked ? "var(--primary-color)" : "var(--text-muted)",
              fontWeight: post.isLiked ? 600 : 500
            }}
          >
            <ThumbsUp size={16} style={{ fill: post.isLiked ? "var(--primary-color)" : "none" }} />
            <span>{post.likes}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              color: "var(--text-muted)",
              fontWeight: 500
            }}
          >
            <MessageSquare size={16} />
            <span>{post.comments ? post.comments.length : 0}</span>
          </button>
        </div>
      </div>

      {showComments && (
        <div style={{ marginTop: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
          <CommentSection
            comments={post.comments || []}
            onAddComment={(text) => onAddComment(post.id, text)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;
