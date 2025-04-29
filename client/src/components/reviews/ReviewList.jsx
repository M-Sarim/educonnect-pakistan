import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";

const ReviewList = ({ tutorId }) => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest(
          `http://localhost:5001/api/reviews/${tutorId}`,
          "GET",
          null,
          token
        );
        setReviews(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch reviews:", err.message);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviews();
  }, [tutorId, token]);

  const styles = {
    container: {
      fontFamily: "Poppins, sans-serif",
    },
    heading: {
      fontSize: "22px",
      fontWeight: "600",
      marginBottom: "20px",
      color: "#0F172A",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    reviewList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "16px",
    },
    reviewItem: {
      backgroundColor: "#F8FAFC",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    reviewItemHover: {
      transform: "translateY(-3px)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    reviewContent: {
      marginBottom: "12px",
      color: "#334155",
      fontSize: "15px",
      lineHeight: "1.6",
    },
    reviewRating: {
      display: "flex",
      alignItems: "center",
      marginBottom: "12px",
      gap: "4px",
    },
    starRating: {
      display: "flex",
      marginRight: "8px",
    },
    star: {
      color: "#F59E0B",
      marginRight: "1px",
    },
    ratingNumber: {
      fontWeight: "600",
      color: "#0F172A",
    },
    reviewAuthor: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginTop: "12px",
    },
    authorAvatar: {
      width: "32px",
      height: "32px",
      borderRadius: "50%",
      backgroundColor: "#E0E7FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#4F46E5",
      fontWeight: "600",
      fontSize: "14px",
    },
    authorName: {
      color: "#64748B",
      fontSize: "14px",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      padding: "32px",
    },
    spinner: {
      width: "40px",
      height: "40px",
      border: "4px solid rgba(99, 102, 241, 0.1)",
      borderTopColor: "#4F46E5",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    emptyState: {
      backgroundColor: "#F8FAFC",
      padding: "32px",
      borderRadius: "12px",
      textAlign: "center",
      color: "#64748B",
    },
    error: {
      backgroundColor: "#FEF2F2",
      color: "#DC2626",
      padding: "16px",
      borderRadius: "8px",
      marginBottom: "16px",
    },
    keyframes: `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `,
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={styles.star}>
        {i < rating ? "★" : "☆"}
      </span>
    ));
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.container}>
      <style>{styles.keyframes}</style>

      {error && <div style={styles.error}>{error}</div>}

      {isLoading ? (
        <div style={styles.loader}>
          <div style={styles.spinner}></div>
        </div>
      ) : reviews.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No reviews yet. Be the first to leave a review!</p>
        </div>
      ) : (
        <ul style={styles.reviewList}>
          {reviews.map((review, index) => (
            <li
              key={review._id}
              style={
                hoveredIndex === index
                  ? { ...styles.reviewItem, ...styles.reviewItemHover }
                  : styles.reviewItem
              }
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={styles.reviewRating}>
                <div style={styles.starRating}>
                  {renderStars(review.rating)}
                </div>
                <span style={styles.ratingNumber}>{review.rating}/5</span>
              </div>
              <div style={styles.reviewContent}>{review.reviewText}</div>
              <div style={styles.reviewAuthor}>
                <div style={styles.authorAvatar}>
                  {getInitials(review.student?.name || "Anonymous")}
                </div>
                <span style={styles.authorName}>
                  {review.student?.name || "Anonymous User"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
