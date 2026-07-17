import React from "react";
import { Users, MessageSquare, Plus, Check } from "lucide-react";
import Button from "../common/Button";

const SupportCircleCard = ({ circle, onJoin, onLeave, onView }) => {
  const handleToggleJoin = () => {
    if (circle.joined) {
      onLeave(circle.id);
    } else {
      onJoin(circle.id);
    }
  };

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1rem", height: "100%" }}>
      <div>
        <h4 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "0.25rem" }}>
          {circle.name}
        </h4>
        <span style={{ fontSize: "0.75rem", backgroundColor: "var(--primary-light)", color: "var(--primary-color)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
          {circle.category}
        </span>
      </div>

      <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", flexGrow: 1, margin: 0 }}>
        {circle.description}
      </p>

      <div className="flex items-center gap-4" style={{ fontSize: "0.8rem", color: "var(--text-light)" }}>
        <span className="flex items-center gap-1">
          <Users size={14} /> {circle.membersCount} members
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={14} /> {circle.postsCount} discussions
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem", marginTop: "auto" }}>
        <Button
          onClick={handleToggleJoin}
          variant={circle.joined ? "secondary" : "primary"}
          style={{ padding: "0.5rem", fontSize: "0.8rem" }}
          iconBefore={circle.joined ? <Check size={14} /> : <Plus size={14} />}
        >
          {circle.joined ? "Joined" : "Join Circle"}
        </Button>
        
        <Button
          onClick={() => onView(circle)}
          variant="secondary"
          style={{ padding: "0.5rem", fontSize: "0.8rem" }}
        >
          Open Circle
        </Button>
      </div>
    </div>
  );
};

export default SupportCircleCard;
