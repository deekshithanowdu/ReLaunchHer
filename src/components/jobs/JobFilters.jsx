import React from "react";
import { Search, MapPin, SlidersHorizontal, RotateCcw } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";

const JobFilters = ({ filters, onChange, onReset }) => {
  const handleTextChange = (e) => {
    onChange({ [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    onChange({ [e.target.name]: e.target.checked });
  };

  const jobTypes = ["Full-Time", "Part-Time", "Contract"];

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div className="flex justify-between items-center" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: "0.75rem" }}>
        <h4 style={{ fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SlidersHorizontal size={18} /> Filters
        </h4>
        <button
          onClick={onReset}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-light)",
            fontSize: "0.8rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem"
          }}
        >
          <RotateCcw size={12} /> Reset All
        </button>
      </div>

      {/* Keyword Search */}
      <div>
        <label className="form-label" style={{ fontSize: "0.8rem" }}>Search Keywords</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            name="searchQuery"
            value={filters.searchQuery || ""}
            onChange={handleTextChange}
            placeholder="React, Designer, Scrum..."
            className="form-control"
            style={{ paddingLeft: "2.5rem" }}
          />
          <Search
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-light)"
            }}
          />
        </div>
      </div>

      {/* Location Filter */}
      <div>
        <label className="form-label" style={{ fontSize: "0.8rem" }}>Location</label>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            name="locationQuery"
            value={filters.locationQuery || ""}
            onChange={handleTextChange}
            placeholder="New York, Chicago..."
            className="form-control"
            style={{ paddingLeft: "2.5rem" }}
          />
          <MapPin
            size={18}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-light)"
            }}
          />
        </div>
      </div>

      {/* Job Type Select */}
      <div>
        <label className="form-label" style={{ fontSize: "0.8rem" }}>Job Commitment</label>
        <select
          name="jobType"
          value={filters.jobType || ""}
          onChange={handleTextChange}
          className="form-control"
        >
          <option value="">All Commitments</option>
          {jobTypes.map((type, idx) => (
            <option key={idx} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Toggles Checklist */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px solid var(--border-color)", paddingTop: "1rem" }}>
        <label className="flex items-center gap-2" style={{ cursor: "pointer", fontSize: "0.875rem" }}>
          <input
            type="checkbox"
            name="isRemote"
            checked={!!filters.isRemote}
            onChange={handleCheckboxChange}
            style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
          />
          <span>Remote Roles</span>
        </label>

        <label className="flex items-center gap-2" style={{ cursor: "pointer", fontSize: "0.875rem" }}>
          <input
            type="checkbox"
            name="isReturnship"
            checked={!!filters.isReturnship}
            onChange={handleCheckboxChange}
            style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
          />
          <span>Returnship Programs</span>
        </label>

        <label className="flex items-center gap-2" style={{ cursor: "pointer", fontSize: "0.875rem" }}>
          <input
            type="checkbox"
            name="isFlexible"
            checked={!!filters.isFlexible}
            onChange={handleCheckboxChange}
            style={{ width: "16px", height: "16px", accentColor: "var(--primary-color)" }}
          />
          <span>Flexible Hours</span>
        </label>
      </div>
    </div>
  );
};

export default JobFilters;
