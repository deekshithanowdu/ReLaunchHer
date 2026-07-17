import React, { useState } from "react";
import Button from "../common/Button";
import { formatDate } from "../../utils/helpers";

const CommentSection = ({ comments = [], onAddComment }) => {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(commentText);
    setCommentText("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Comments lists */}
      {comments.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "0.5rem" }}>
          {comments.map((comment, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "var(--bg-main)",
                padding: "0.75rem",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.85rem"
              }}
            >
              <div className="flex justify-between items-center mb-1">
                <strong style={{ color: "var(--text-main)", fontWeight: 600 }}>{comment.author}</strong>
                <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                  {formatDate(comment.date)}
                </span>
              </div>
              <p style={{ color: "var(--text-muted)", margin: 0, lineBreak: "anywhere" }}>{comment.content}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add comment form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          className="form-control"
          style={{ padding: "0.5rem 0.75rem", fontSize: "0.85rem" }}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!commentText.trim()}
          style={{ padding: "0.5rem 1rem", fontSize: "0.85rem" }}
        >
          Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentSection;
