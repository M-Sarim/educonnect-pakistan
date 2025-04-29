import { useState } from "react";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";

const ReviewForm = ({ tutorId, onReviewSubmitted }) => {
  const { token } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await apiRequest(
        "http://localhost:5000/api/reviews",
        "POST",
        {
          tutor: tutorId,
          rating: Number(rating),
          reviewText: text,
        },
        token
      );

      setText("");
      setRating(5);
      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    form: {
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#F8FAFC",
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "600",
      marginTop: 0,
      marginBottom: "16px",
      color: "#0F172A",
    },
    ratingContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "16px",
      gap: "8px",
    },
    ratingLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#475569",
    },
    starContainer: {
      display: "flex",
      gap: "4px",
    },
    star: {
      fontSize: "28px",
      cursor: "pointer",
      color: "#E2E8F0",
      transition: "color 0.2s ease",
    },
    filledStar: {
      color: "#F59E0B",
    },
    textareaContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      marginBottom: "16px",
    },
    textareaLabel: {
      fontSize: "14px",
      fontWeight: "500",
      color: "#475569",
    },
    textarea: {
      padding: "12px 16px",
      borderRadius: "8px",
      border: "1px solid #E2E8F0",
      minHeight: "120px",
      fontSize: "15px",
      fontFamily: "inherit",
      resize: "vertical",
      outline: "none",
      transition: "border-color 0.2s ease",
    },
    textareaFocus: {
      borderColor: "#4F46E5",
    },
    error: {
      color: "#DC2626",
      backgroundColor: "#FEF2F2",
      padding: "12px 16px",
      borderRadius: "8px",
      fontSize: "14px",
      marginBottom: "16px",
    },
    submitButton: {
      backgroundColor: "#4F46E5",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px 0",
      fontSize: "15px",
      fontWeight: "600",
      cursor: "pointer",
      width: "100%",
      transition: "background-color 0.2s ease",
    },
    submitButtonHover: {
      backgroundColor: "#4338CA",
    },
    disabledButton: {
      backgroundColor: "#94A3B8",
      cursor: "not-allowed",
    },
  };

  const [buttonHover, setButtonHover] = useState(false);
  const [textareaFocus, setTextareaFocus] = useState(false);

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.ratingContainer}>
        <label style={styles.ratingLabel}>Your Rating</label>
        <div style={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={{
                ...styles.star,
                ...(star <= (hoverRating || rating) ? styles.filledStar : {}),
              }}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div style={styles.textareaContainer}>
        <label style={styles.textareaLabel}>Your Review</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Share your experience with this tutor..."
          required
          style={
            textareaFocus
              ? { ...styles.textarea, ...styles.textareaFocus }
              : styles.textarea
          }
          onFocus={() => setTextareaFocus(true)}
          onBlur={() => setTextareaFocus(false)}
        />
      </div>

      {error && <div style={styles.error}>{error}</div>}

      <button
        type="submit"
        disabled={isSubmitting}
        style={
          isSubmitting
            ? { ...styles.submitButton, ...styles.disabledButton }
            : buttonHover
            ? { ...styles.submitButton, ...styles.submitButtonHover }
            : styles.submitButton
        }
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
      >
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
