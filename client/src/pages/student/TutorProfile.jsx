import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";
import ReviewList from "../../components/reviews/ReviewList.jsx";
import ReviewForm from "../../components/reviews/ReviewForm.jsx";
import BookingForm from "../../components/sessions/BookingForm.jsx";
import WishlistButton from "../../components/wishlist/WishlistButton.jsx";

const TutorProfile = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [tutor, setTutor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

  const fetchTutor = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest(
        `http://localhost:5001/api/tutors/${id}`,
        "GET",
        null,
        token
      );
      setTutor(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tutor:", err.message);
      setError("Failed to load tutor information. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutor();
  }, [id]);

  const styles = {
    container: {
      fontFamily: "Poppins, sans-serif",
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "32px",
      color: "#2D3748",
      backgroundColor: "#F7FAFC",
      borderRadius: "12px",
    },
    profileHeader: {
      display: "flex",
      flexDirection: "column",
      position: "relative",
      marginBottom: "32px",
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    headerBanner: {
      height: "160px",
      background: "linear-gradient(135deg, #6366F1 0%, #2563EB 100%)",
      position: "relative",
    },
    profileImage: {
      width: "140px",
      height: "140px",
      borderRadius: "50%",
      border: "6px solid white",
      backgroundColor: "#EEF2FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "48px",
      fontWeight: "bold",
      color: "#4F46E5",
      position: "absolute",
      top: "80px",
      left: "50px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    },
    wishlistButtonContainer: {
      position: "absolute",
      top: "24px",
      right: "24px",
      zIndex: 2,
    },
    profileContent: {
      padding: "32px 32px 32px 210px",
    },
    tutorName: {
      fontSize: "32px",
      fontWeight: "800",
      margin: "0 0 12px 0",
      color: "#1A202C",
      letterSpacing: "-0.5px",
    },
    subjectTags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "20px",
    },
    subjectTag: {
      backgroundColor: "#EEF2FF",
      color: "#4F46E5",
      padding: "6px 16px",
      borderRadius: "20px",
      fontSize: "14px",
      fontWeight: "500",
      letterSpacing: "0.2px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    tutorStats: {
      display: "flex",
      gap: "24px",
      marginBottom: "12px",
      alignItems: "center",
    },
    rateChip: {
      backgroundColor: "#E6FFFA",
      color: "#0D9488",
      padding: "8px 16px",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "15px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    modeChip: {
      backgroundColor: "#F3F4F6",
      color: "#4B5563",
      padding: "8px 16px",
      borderRadius: "20px",
      fontWeight: "600",
      fontSize: "15px",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      fontSize: "15px",
    },
    loader: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "400px",
    },
    spinner: {
      width: "60px",
      height: "60px",
      border: "5px solid rgba(99, 102, 241, 0.1)",
      borderTopColor: "#6366F1",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    errorMessage: {
      backgroundColor: "#FEE2E2",
      color: "#B91C1C",
      padding: "20px",
      borderRadius: "12px",
      marginBottom: "32px",
      fontSize: "16px",
      boxShadow: "0 2px 8px rgba(185, 28, 28, 0.1)",
    },
    tabsContainer: {
      marginBottom: "32px",
      borderBottom: "1px solid #E2E8F0",
    },
    tabsList: {
      display: "flex",
      listStyle: "none",
      padding: 0,
      margin: 0,
      gap: "8px",
    },
    tabItem: {
      padding: "14px 24px",
      cursor: "pointer",
      fontWeight: "600",
      position: "relative",
      color: "#718096",
      transition: "color 0.3s ease",
      borderRadius: "8px 8px 0 0",
    },
    activeTab: {
      color: "#4F46E5",
      borderBottom: "3px solid #4F46E5",
      backgroundColor: "rgba(99, 102, 241, 0.05)",
    },
    contentSection: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      padding: "32px",
      marginBottom: "32px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    sectionTitle: {
      fontSize: "22px",
      fontWeight: "700",
      marginTop: 0,
      marginBottom: "20px",
      color: "#1A202C",
      letterSpacing: "-0.3px",
      position: "relative",
      paddingBottom: "10px",
    },
    sectionTitleAfter: {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "40px",
      height: "3px",
      backgroundColor: "#4F46E5",
      borderRadius: "1.5px",
    },
    qualificationsList: {
      padding: 0,
      margin: 0,
      listStyle: "none",
    },
    qualificationItem: {
      padding: "14px 0",
      borderBottom: "1px solid #E2E8F0",
      fontSize: "16px",
      color: "#4A5568",
    },
    aboutText: {
      lineHeight: "1.8",
      color: "#4A5568",
      fontSize: "16px",
    },
    availabilityTable: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: "0",
      marginTop: "16px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      borderRadius: "12px",
      overflow: "hidden",
    },
    availabilityRow: {
      transition: "background-color 0.2s ease",
    },
    availabilityRowHover: {
      backgroundColor: "#F9FAFB",
    },
    availabilityCell: {
      padding: "16px 12px",
      borderBottom: "1px solid #E2E8F0",
    },
    dayCell: {
      fontWeight: "600",
      width: "140px",
      backgroundColor: "#F3F4F6",
      color: "#4B5563",
    },
    bookingContainer: {
      backgroundColor: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
      padding: "32px",
      marginBottom: "32px",
    },
    reviewSubtitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginTop: "32px",
      marginBottom: "16px",
      color: "#2D3748",
    },
  };

  const keyframesStyle = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
  `;

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={styles.container}>
        {isLoading ? (
          <div style={styles.loader}>
            <div style={styles.spinner}></div>
          </div>
        ) : error ? (
          <div style={styles.errorMessage}>{error}</div>
        ) : (
          tutor && (
            <>
              <div style={styles.profileHeader}>
                <div style={styles.headerBanner}></div>
                <div style={styles.profileImage}>{getInitials(tutor.name)}</div>
                <div style={styles.wishlistButtonContainer}>
                  <WishlistButton tutorId={tutor._id} />
                </div>
                <div style={styles.profileContent}>
                  <h1 style={styles.tutorName}>{tutor.name}</h1>
                  <div style={styles.subjectTags}>
                    {tutor.subjects.map((subject, idx) => (
                      <span key={idx} style={styles.subjectTag}>
                        {subject}
                      </span>
                    ))}
                  </div>
                  <div style={styles.tutorStats}>
                    <span style={styles.rateChip}>
                      PKR {tutor.hourlyRate}/hr
                    </span>
                    <span style={styles.modeChip}>{tutor.preferences}</span>
                    <div style={styles.statItem}>
                      <span style={{ fontWeight: "bold" }}>Experience:</span>{" "}
                      {tutor.experience || "Not specified"}
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.tabsContainer}>
                <ul style={styles.tabsList}>
                  <li
                    style={{
                      ...styles.tabItem,
                      ...(activeTab === "about" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("about")}
                  >
                    About
                  </li>
                  <li
                    style={{
                      ...styles.tabItem,
                      ...(activeTab === "qualifications"
                        ? styles.activeTab
                        : {}),
                    }}
                    onClick={() => setActiveTab("qualifications")}
                  >
                    Qualifications
                  </li>
                  <li
                    style={{
                      ...styles.tabItem,
                      ...(activeTab === "reviews" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("reviews")}
                  >
                    Reviews
                  </li>
                  <li
                    style={{
                      ...styles.tabItem,
                      ...(activeTab === "booking" ? styles.activeTab : {}),
                    }}
                    onClick={() => setActiveTab("booking")}
                  >
                    Book a Session
                  </li>
                </ul>
              </div>

              {activeTab === "about" && (
                <div style={styles.contentSection}>
                  <h3 style={styles.sectionTitle}>
                    About
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <p style={styles.aboutText}>
                    {tutor.bio ||
                      "No bio information available for this tutor."}
                  </p>

                  <h3 style={styles.sectionTitle}>
                    Teaching Style
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <p style={styles.aboutText}>
                    {tutor.teachingStyle ||
                      "No teaching style information available."}
                  </p>

                  <h3 style={styles.sectionTitle}>
                    Availability
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <table style={styles.availabilityTable}>
                    <tbody>
                      {tutor.availability && tutor.availability.length > 0 ? (
                        tutor.availability.map((day, idx) => (
                          <tr
                            key={idx}
                            style={styles.availabilityRow}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "#F9FAFB";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "";
                            }}
                          >
                            <td
                              style={{
                                ...styles.availabilityCell,
                                ...styles.dayCell,
                              }}
                            >
                              {day.day}
                            </td>
                            <td style={styles.availabilityCell}>
                              {day.timeSlots.join(", ")}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" style={styles.availabilityCell}>
                            No availability information provided.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === "qualifications" && (
                <div style={styles.contentSection}>
                  <h3 style={styles.sectionTitle}>
                    Qualifications
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <ul style={styles.qualificationsList}>
                    {tutor.qualifications ? (
                      tutor.qualifications
                        .split(",")
                        .map((qualification, idx) => (
                          <li key={idx} style={styles.qualificationItem}>
                            {qualification.trim()}
                          </li>
                        ))
                    ) : (
                      <li style={styles.qualificationItem}>
                        No qualifications listed.
                      </li>
                    )}
                  </ul>

                  <h3 style={styles.sectionTitle}>
                    Experience
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <p style={styles.aboutText}>
                    {tutor.experience || "No experience information available."}
                  </p>
                </div>
              )}

              {activeTab === "reviews" && (
                <div style={styles.contentSection}>
                  <h3 style={styles.sectionTitle}>
                    Reviews
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <ReviewList tutorId={tutor._id} />
                  <div style={{ marginTop: "32px" }}>
                    <h4 style={styles.reviewSubtitle}>Write a Review</h4>
                    <ReviewForm
                      tutorId={tutor._id}
                      onReviewSubmitted={fetchTutor}
                    />
                  </div>
                </div>
              )}

              {activeTab === "booking" && (
                <div style={styles.bookingContainer}>
                  <h3 style={styles.sectionTitle}>
                    Book a Session with {tutor.name}
                    <div style={styles.sectionTitleAfter}></div>
                  </h3>
                  <BookingForm tutor={tutor} />
                </div>
              )}
            </>
          )
        )}
      </div>
    </>
  );
};

export default TutorProfile;
