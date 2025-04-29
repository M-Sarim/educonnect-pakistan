import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";

const BookingForm = ({ tutor }) => {
  const { token } = useAuth();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState(
    tutor.preferences === "online" ? "online" : "in-person"
  );
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBook = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await apiRequest(
        "http://localhost:5001/api/sessions",
        "POST",
        {
          tutorId: tutor._id,
          date,
          time,
          type,
        },
        token
      );
      setMessage("Session booked successfully!");
      setDate("");
      setTime("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "600",
      color: "#0F172A",
      margin: "0 0 16px 0",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#475569",
    },
    input: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #E2E8F0",
      fontSize: "15px",
      color: "#1E293B",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    selectWrapper: {
      position: "relative",
    },
    select: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #E2E8F0",
      fontSize: "15px",
      color: "#1E293B",
      appearance: "none",
      width: "100%",
      background: "white",
      outline: "none",
      cursor: "pointer",
    },
    selectArrow: {
      position: "absolute",
      right: "16px",
      top: "50%",
      transform: "translateY(-50%)",
      color: "#64748B",
    },
    rateInfo: {
      backgroundColor: "#F0FDF4",
      color: "#16A34A",
      padding: "16px",
      borderRadius: "8px",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    errorText: {
      color: "#DC2626",
      backgroundColor: "#FEF2F2",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "14px",
    },
    successText: {
      color: "#16A34A",
      backgroundColor: "#F0FDF4",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    submitButton: {
      backgroundColor: "#4F46E5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "14px 0",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
    },
    submitButtonHover: {
      backgroundColor: "#4338CA",
    },
    divider: {
      height: "1px",
      backgroundColor: "#E2E8F0",
      margin: "12px 0",
    },
  };

  const [buttonHover, setButtonHover] = useState(false);

  return (
    <form onSubmit={handleBook} style={styles.form}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Select Time</label>
        <input
          type="text"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          placeholder="e.g. 10:00 AM"
          required
          style={styles.input}
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Session Type</label>
        <div style={styles.selectWrapper}>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={styles.select}
          >
            <option value="online">Online</option>
            <option value="in-person">In-person</option>
          </select>
          <span style={styles.selectArrow}>▼</span>
        </div>
      </div>

      <div style={styles.divider}></div>

      <div style={styles.rateInfo}>
        <span>💰</span> Session Rate: PKR {tutor.hourlyRate}/hr
      </div>

      {error && <div style={styles.errorText}>{error}</div>}
      {message && (
        <div style={styles.successText}>
          <span>✅</span> {message}
        </div>
      )}

      <button
        type="submit"
        style={
          buttonHover
            ? { ...styles.submitButton, ...styles.submitButtonHover }
            : styles.submitButton
        }
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Book Now"}
        {!isSubmitting && <span>→</span>}
      </button>
    </form>
  );
};

export default BookingForm;
