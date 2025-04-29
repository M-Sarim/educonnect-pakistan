import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";

const StudentSessions = () => {
  const { user, token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        const data = await apiRequest(
          "http://localhost:5001/api/sessions/student",
          "GET",
          null,
          token
        );
        setSessions(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch student sessions:", err.message);
        setError("Failed to load your sessions. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [token]);

  const handleMarkCompleted = async (sessionId) => {
    try {
      await apiRequest(
        `http://localhost:5001/api/sessions/${sessionId}/complete`,
        "PUT",
        null,
        token
      );
      setSessions(
        sessions.map((session) =>
          session._id === sessionId
            ? { ...session, status: "completed" }
            : session
        )
      );
    } catch (err) {
      console.error("Failed to mark session as completed:", err.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "scheduled":
        return { backgroundColor: "#ddd6fe", color: "#5b21b6" };
      case "completed":
        return { backgroundColor: "#bbf7d0", color: "#166534" };
      case "cancelled":
        return { backgroundColor: "#fecaca", color: "#991b1b" };
      default:
        return { backgroundColor: "#f2f2f2", color: "#4d4d4d" };
    }
  };

  return (
    <div className="sessions-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .sessions-container {
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem;
          color: #1e293b;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        
        .sessions-header {
          border-bottom: 3px solid #8b5cf6;
          padding-bottom: 1.25rem;
          margin-bottom: 2.5rem;
        }
        
        .sessions-heading {
          color: #6d28d9;
          font-weight: 700;
          font-size: 2rem;
          margin: 0 0 0.5rem 0;
        }
        
        .sessions-subheading {
          color: #64748b;
          margin: 0;
          font-size: 1.1rem;
        }
        
        .sessions-loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }
        
        .sessions-spinner {
          width: 60px;
          height: 60px;
          border: 4px solid rgba(139, 92, 246, 0.2);
          border-top-color: #8b5cf6;
          border-radius: 50%;
          animation: spinner-rotation 1.2s linear infinite;
        }
        
        @keyframes spinner-rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .sessions-error {
          background-color: rgba(239, 68, 68, 0.1);
          color: #b91c1c;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          border-left: 5px solid #ef4444;
          font-weight: 500;
        }
        
        .sessions-empty {
          text-align: center;
          padding: 4rem 2rem;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .sessions-empty-text {
          color: #64748b;
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }
        
        .sessions-book-button {
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          color: white;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 1rem;
          box-shadow: 0 4px 10px rgba(107, 40, 217, 0.25);
        }
        
        .sessions-book-button:hover {
          background: linear-gradient(90deg, #7c3aed, #5b21b6);
          box-shadow: 0 6px 15px rgba(107, 40, 217, 0.35);
          transform: translateY(-2px);
        }
        
        .sessions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .session-card {
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          border: 1px solid #f1f5f9;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
        }
        
        .session-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .session-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
        }
        
        .card-content {
          padding: 1.75rem;
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }
        
        .tutor-name {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }
        
        .status-chip {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        
        .card-info {
          margin-bottom: 1.25rem;
        }
        
        .date-time {
          display: flex;
          align-items: center;
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        
        .date-time-icon {
          margin-right: 0.5rem;
          color: #8b5cf6;
        }
        
        .session-type {
          display: flex;
          align-items: center;
          color: #64748b;
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        
        .session-type-icon {
          margin-right: 0.5rem;
          color: #8b5cf6;
        }
        
        .complete-button {
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          color: white;
          border: none;
          padding: 0.75rem 1.25rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          width: 100%;
          margin-top: 1rem;
          box-shadow: 0 4px 10px rgba(107, 40, 217, 0.15);
        }
        
        .complete-button:hover {
          background: linear-gradient(90deg, #7c3aed, #5b21b6);
          box-shadow: 0 6px 15px rgba(107, 40, 217, 0.25);
        }
        
        .session-divider {
          height: 1px;
          background-color: #e2e8f0;
          margin: 1rem 0;
        }
        
        @media (max-width: 768px) {
          .sessions-container {
            padding: 1.5rem;
          }
          
          .sessions-grid {
            grid-template-columns: 1fr;
          }
          
          .sessions-heading {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <div className="sessions-header">
        <h2 className="sessions-heading">My Sessions</h2>
        <p className="sessions-subheading">
          View and manage your tutoring sessions
        </p>
      </div>

      {isLoading && (
        <div className="sessions-loader">
          <div className="sessions-spinner"></div>
        </div>
      )}

      {error && <div className="sessions-error">{error}</div>}

      {!isLoading && !error && sessions.length === 0 && (
        <div className="sessions-empty">
          <p className="sessions-empty-text">
            You don't have any sessions scheduled yet.
          </p>
          <button className="sessions-book-button">Book a Session</button>
        </div>
      )}

      {!isLoading && !error && sessions.length > 0 && (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <div key={session._id} className="session-card">
              <div className="card-content">
                <div className="card-header">
                  <h3 className="tutor-name">
                    {user.role === "student"
                      ? `${session.tutor.name}`
                      : `${session.student.name}`}
                  </h3>
                  <span
                    className="status-chip"
                    style={getStatusStyle(session.status)}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="card-info">
                  <div className="date-time">
                    <span className="date-time-icon">📅</span>
                    {new Date(session.date).toLocaleDateString()} at{" "}
                    {session.time}
                  </div>

                  <div className="session-type">
                    <span className="session-type-icon">📚</span>
                    {session.type}
                  </div>

                  <div className="session-divider"></div>

                  <div className="session-subject">
                    <span className="session-type-icon">📝</span>
                    {session.subject || "General Tutoring"}
                  </div>
                </div>

                {user.role === "student" && session.status === "completed" && (
                  <div className="tutor-rating">
                    <span className="session-type-icon">⭐</span>
                    {session.rating
                      ? `Rating: ${session.rating}/5`
                      : "Not rated yet"}
                  </div>
                )}

                {user.role === "tutor" && session.status !== "completed" && (
                  <button
                    className="complete-button"
                    onClick={() => handleMarkCompleted(session._id)}
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSessions;
