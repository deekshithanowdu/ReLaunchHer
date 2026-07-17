import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useAuth } from "../../context/AuthContext";
import { calculateMentorMatch } from "../../utils/helpers";
import MentorCard from "../../components/mentors/MentorCard";
import MentorBookingModal from "../../components/mentors/MentorBookingModal";
import EmptyState from "../../components/common/EmptyState";
import Toast from "../../components/common/Toast";
import Input from "../../components/common/Input";
import Select from "../../components/common/Select";
import { Sparkles, Calendar, Search } from "lucide-react";
import { formatDate } from "../../utils/helpers";

const Mentors = () => {
  const { currentUser } = useAuth();
  const { mentors, skills, bookings, bookMentor, cancelBooking } = useAppContext();

  const [selectedMentor, setSelectedMentor] = useState(null);
  
  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  const [toastMessage, setToastMessage] = useState("");

  const handleOpenBooking = (mentor) => {
    setSelectedMentor(mentor);
  };

  const handleConfirmBooking = (bookingData) => {
    bookMentor(bookingData);
    setSelectedMentor(null);
    setToastMessage(`Booking session confirmed with ${bookingData.mentorName}!`);
  };

  const handleCancelBooking = (bookingId) => {
    cancelBooking(bookingId);
    setToastMessage("Booking cancelled.");
  };

  // Compute matched mentors list
  const matchedMentors = mentors
    .map((mentor) => {
      const matchScore = calculateMentorMatch(mentor, currentUser || {}, skills);
      return {
        ...mentor,
        matchScore
      };
    })
    .filter((mentor) => {
      // Search keywords
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = mentor.name.toLowerCase().includes(query);
        const matchesSkills = mentor.skills.some(s => s.toLowerCase().includes(query));
        const matchesTitle = mentor.jobTitle.toLowerCase().includes(query);
        if (!matchesName && !matchesSkills && !matchesTitle) return false;
      }

      // Industry Select
      if (selectedIndustry && mentor.industry !== selectedIndustry) {
        return false;
      }

      return true;
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  const industryOptions = ["Technology", "Design", "Product Management", "Data Science & Analytics"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      
      {/* Header section */}
      <div>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>Mentors Hub</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Connect with experienced, returner-friendly advisors. View compatibility matches based on your target career options.
        </p>
      </div>

      {/* Booked Sessions layout */}
      {bookings.length > 0 && (
        <div className="card">
          <h4 style={{ fontSize: "1rem", marginBottom: "1rem", fontWeight: 600 }}>My Confirmed Bookings</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }} className="bookings-grid">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  backgroundColor: "var(--bg-main)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem"
                }}
              >
                <div>
                  <h5 style={{ fontSize: "0.9rem", fontWeight: 600, margin: 0 }}>{booking.mentorName}</h5>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{booking.mentorTitle}</span>
                </div>
                
                <div style={{ fontSize: "0.75rem", color: "var(--primary-color)", fontWeight: 600 }} className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(booking.date)} at {booking.time}
                </div>

                {booking.notes && (
                  <p style={{ fontSize: "0.7rem", color: "var(--text-muted)", margin: 0, fontStyle: "italic" }}>
                    Notes: {booking.notes}
                  </p>
                )}

                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  style={{
                    alignSelf: "flex-end",
                    background: "transparent",
                    border: "none",
                    color: "#ef4444",
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    marginTop: "0.5rem"
                  }}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid layout */}
      <div className="dashboard-grid">
        
        {/* Left Column (4 cols): Filters sidebar */}
        <div className="span-4">
          <div className="card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <h4 style={{ fontSize: "1rem", fontWeight: 600 }}>Filter Mentors</h4>
            
            {/* Keyword Search */}
            <div>
              <label className="form-label" style={{ fontSize: "0.8rem" }}>Search Keywords</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, skills..."
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

            {/* Industry Selector */}
            <Select
              label="Advising Industry"
              id="mentor-filter-ind"
              options={industryOptions}
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            />
          </div>
        </div>

        {/* Right Column (8 cols): Mentors listing grid */}
        <div className="span-8" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="flex justify-between items-center" style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
            <span>Showing {matchedMentors.length} matched guides</span>
            <span>Sorted by match compatibility</span>
          </div>

          {matchedMentors.length === 0 ? (
            <EmptyState
              title="No mentors found"
              description="Adjust your search keywords or clear criteria to find advice mentors."
              actionLabel="Reset Search Filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedIndustry("");
              }}
            />
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }} className="mentors-grid-list">
              {matchedMentors.map((mentor) => (
                <MentorCard
                  key={mentor.id}
                  mentor={mentor}
                  matchScore={mentor.matchScore}
                  onBook={handleOpenBooking}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {selectedMentor && (
        <MentorBookingModal
          isOpen={!!selectedMentor}
          onClose={() => setSelectedMentor(null)}
          mentor={selectedMentor}
          onConfirm={handleConfirmBooking}
        />
      )}

      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <style>{`
        @media (max-width: 768px) {
          .mentors-grid-list {
            grid-template-columns: 1fr !important;
          }
          .bookings-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Mentors;
