import React, { useState } from "react";
import Modal from "../common/Modal";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";

const MentorBookingModal = ({ isOpen, onClose, mentor, onConfirm }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const timeOptions = [
    { label: "10:00 AM - 10:45 AM EST", value: "10:00 AM" },
    { label: "11:00 AM - 11:45 AM EST", value: "11:00 AM" },
    { label: "2:00 PM - 2:45 PM EST", value: "2:00 PM" },
    { label: "3:00 PM - 3:45 PM EST", value: "3:00 PM" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !time) return;
    
    onConfirm({
      mentorId: mentor.id,
      mentorName: mentor.name,
      mentorTitle: mentor.jobTitle,
      date,
      time,
      notes
    });
    
    // Reset state
    setDate("");
    setTime("");
    setNotes("");
  };

  if (!mentor) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book a session with ${mentor.name}`} size="sm">
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        
        {/* Date selection input */}
        <Input
          label="Select Date"
          id="booking-date"
          type="date"
          required={true}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* Time selection dropdown */}
        <Select
          label="Select Time Slot"
          id="booking-time"
          required={true}
          options={timeOptions}
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* Optional details field */}
        <div className="form-group">
          <label htmlFor="booking-notes" className="form-label">
            Notes / What do you want to cover?
          </label>
          <textarea
            id="booking-notes"
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-control"
            placeholder="Introduce yourself and outline what advice or questions you have."
          />
        </div>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1rem" }}>
          <Button onClick={onClose} variant="secondary">
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={!date || !time}>
            Confirm Booking
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MentorBookingModal;
