import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";
import { Link } from "react-router-dom";

const TutorSessions = () => {
  const { user, token } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [actionStatus, setActionStatus] = useState({ id: null, status: "" });

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(
        "http://localhost:5001/api/sessions/tutor",
        "GET",
        null,
        token
      );
      setSessions(data);
    } catch (err) {
      console.error("Failed to fetch tutor sessions:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkCompleted = async (id) => {
    setActionStatus({ id, status: "loading" });
    try {
      await apiRequest(
        `http://localhost:5001/api/tutors/session/${id}/complete`,
        "PUT",
        null,
        token
      );
      setActionStatus({ id, status: "success" });
      setTimeout(() => setActionStatus({ id: null, status: "" }), 2000);
      fetchSessions();
    } catch (err) {
      console.error("Error marking session completed:", err.message);
      setActionStatus({ id, status: "error" });
      setTimeout(() => setActionStatus({ id: null, status: "" }), 2000);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [token]);

  const filteredSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const today = new Date();

    if (activeTab === "upcoming") {
      return sessionDate >= today && session.status !== "completed";
    } else if (activeTab === "completed") {
      return session.status === "completed";
    } else if (activeTab === "past") {
      return sessionDate < today && session.status !== "completed";
    }
    return true;
  });

  filteredSessions.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    if (activeTab === "upcoming") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  const formatDateTime = (dateStr, timeStr) => {
    const date = new Date(dateStr);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return `${date.toLocaleDateString("en-US", options)} at ${timeStr}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "status-scheduled";
      case "completed":
        return "status-completed";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="sessions-container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');
          
          :root {
            --primary-color: #5c258d;
            --primary-light: #8b5fbf;
            --primary-dark: #3a1772;
            --accent-color: #8be9fd;
            --accent-light: #a3eeff;
            --accent-dark: #4389a2;
            --success-color: #50fa7b;
            --warning-color: #ffb86c;
            --danger-color: #ff5555;
            --text-primary: #f8f8f2;
            --text-secondary: rgba(248, 248, 242, 0.75);
            --text-muted: rgba(248, 248, 242, 0.6);
            --bg-primary: linear-gradient(135deg, #30cfd0 0%, #5c258d 100%);
            --bg-card: rgba(255, 255, 255, 0.1);
            --border-color: rgba(255, 255, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.3);
          }
          
          .sessions-container {
            font-family: 'Montserrat', sans-serif;
            max-width: 1100px;
            margin: 0 auto;
            padding: 2.5rem;
            color: var(--text-primary);
            background: var(--bg-primary);
            border-radius: 16px;
            box-shadow: 0 10px 30px var(--shadow-color);
          }
          
          .sessions-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 1.5rem;
            margin-bottom: 2.5rem;
          }
          
          .sessions-header h2 {
            font-size: 2.2rem;
            font-weight: 700;
            margin: 0;
            background: linear-gradient(90deg, var(--accent-light), #bd93f9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 2px 10px rgba(139, 233, 253, 0.3);
          }
          
          .back-link {
            color: var(--accent-color);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.1);
          }
          
          .back-link:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-5px);
          }
          
          .tab-navigation {
            display: flex;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 2.5rem;
            gap: 0.5rem;
          }
          
          .tab-button {
            padding: 1rem 2rem;
            background: rgba(255, 255, 255, 0.05);
            border: none;
            border-radius: 8px 8px 0 0;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 1rem;
            color: var(--text-secondary);
            cursor: pointer;
            border-bottom: 3px solid transparent;
            transition: all 0.3s ease;
          }
          
          .tab-button.active {
            color: var(--accent-color);
            border-bottom: 3px solid var(--accent-color);
            background: rgba(139, 233, 253, 0.1);
          }
          
          .tab-button:hover:not(.active) {
            color: var(--text-primary);
            background: rgba(255, 255, 255, 0.1);
          }
          
          .session-cards {
            display: grid;
            gap: 1.5rem;
          }
          
          .session-card {
            background: var(--bg-card);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1.8rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            border-left: 5px solid var(--accent-color);
            transition: all 0.3s ease;
            border: 1px solid var(--border-color);
          }
          
          .session-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          }
          
          .session-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
          }
          
          .session-title {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
          }
          
          .session-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1.5rem;
            margin-bottom: 1.8rem;
          }
          
          .detail-item {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .detail-label {
            font-size: 0.95rem;
            color: var(--text-muted);
            font-weight: 500;
          }
          
          .detail-value {
            font-weight: 600;
            font-size: 1.1rem;
          }
          
          .status-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.4rem 1rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
          }
          
          .status-scheduled {
            background: rgba(139, 233, 253, 0.2);
            color: var(--accent-color);
            border: 1px solid var(--accent-color);
          }
          
          .status-completed {
            background: rgba(80, 250, 123, 0.2);
            color: var(--success-color);
            border: 1px solid var(--success-color);
          }
          
          .status-cancelled {
            background: rgba(255, 85, 85, 0.2);
            color: var(--danger-color);
            border: 1px solid var(--danger-color);
          }
          
          .session-actions {
            display: flex;
            justify-content: flex-end;
            gap: 1rem;
            margin-top: 1.2rem;
            border-top: 1px solid var(--border-color);
            padding-top: 1.2rem;
          }
          
          .action-button {
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            font-size: 0.95rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            letter-spacing: 0.5px;
          }
          
          .primary-button {
            background: linear-gradient(90deg, #8be9fd, #bd93f9);
            color: #282a36;
            border: none;
            box-shadow: 0 4px 10px rgba(139, 233, 253, 0.3);
          }
          
          .primary-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(139, 233, 253, 0.5);
          }
          
          .primary-button:disabled {
            background: linear-gradient(90deg, #586e75, #657b83);
            opacity: 0.7;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }
          
          .success-button {
            background: linear-gradient(90deg, #50fa7b, #00b894);
            color: #282a36;
            border: none;
            box-shadow: 0 4px 10px rgba(80, 250, 123, 0.3);
          }
          
          .success-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(80, 250, 123, 0.5);
          }
          
          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: var(--text-secondary);
            border: 1px dashed var(--border-color);
          }
          
          .empty-state h3 {
            font-size: 1.4rem;
            margin-bottom: 1rem;
            color: var(--text-primary);
          }
          
          .empty-state p {
            font-size: 1.1rem;
            max-width: 500px;
            margin: 0 auto;
          }
          
          .loading-state {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 300px;
          }
          
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(139, 233, 253, 0.3);
            border-radius: 50%;
            border-top-color: var(--accent-color);
            animation: spin 1s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.05); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @media (max-width: 768px) {
            .sessions-container {
              padding: 1.5rem;
              border-radius: 0;
            }
            
            .sessions-header {
              flex-direction: column;
              gap: 1rem;
              align-items: flex-start;
            }
            
            .tab-navigation {
              overflow-x: auto;
              padding-bottom: 0.5rem;
              width: 100%;
            }
            
            .tab-button {
              padding: 0.8rem 1.2rem;
              font-size: 0.9rem;
              white-space: nowrap;
            }
            
            .session-details {
              grid-template-columns: 1fr;
            }
            
            .session-title {
              font-size: 1.2rem;
            }
          }
        `}
      </style>

      <div className="sessions-header">
        <h2>My Teaching Sessions</h2>
        <Link to="/tutor/dashboard" className="back-link">
          &larr; Back to Dashboard
        </Link>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Sessions
        </button>
        <button
          className={`tab-button ${activeTab === "completed" ? "active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Sessions
        </button>
        <button
          className={`tab-button ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Due Sessions
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      ) : filteredSessions.length === 0 ? (
        <div className="empty-state">
          <h3>No {activeTab} sessions found</h3>
          <p>When you have {activeTab} sessions, they will appear here.</p>
        </div>
      ) : (
        <div className="session-cards">
          {filteredSessions.map((session) => (
            <div key={session._id} className="session-card">
              <div className="session-header">
                <h3 className="session-title">
                  Session with {session.student?.name || "Unknown Student"}
                </h3>
                <span
                  className={`status-badge ${getStatusColor(session.status)}`}
                >
                  {session.status.charAt(0).toUpperCase() +
                    session.status.slice(1)}
                </span>
              </div>

              <div className="session-details">
                <div className="detail-item">
                  <span className="detail-label">Date & Time</span>
                  <span className="detail-value">
                    {formatDateTime(session.date, session.time)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Session Type</span>
                  <span className="detail-value">
                    {session.type.charAt(0).toUpperCase() +
                      session.type.slice(1)}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">Subject</span>
                  <span className="detail-value">
                    {session.subject || "Not specified"}
                  </span>
                </div>
              </div>

              {session.notes && (
                <div className="detail-item" style={{ marginBottom: "1rem" }}>
                  <span className="detail-label">Session Notes</span>
                  <span className="detail-value">{session.notes}</span>
                </div>
              )}

              {user.role === "tutor" && session.status !== "completed" && (
                <div className="session-actions">
                  <button
                    className={`action-button ${
                      actionStatus.id === session._id &&
                      actionStatus.status === "success"
                        ? "success-button"
                        : "primary-button"
                    }`}
                    onClick={() => handleMarkCompleted(session._id)}
                    disabled={
                      actionStatus.id === session._id &&
                      actionStatus.status === "loading"
                    }
                  >
                    {actionStatus.id === session._id
                      ? actionStatus.status === "loading"
                        ? "Processing..."
                        : actionStatus.status === "success"
                        ? "✓ Marked Complete"
                        : actionStatus.status === "error"
                        ? "Failed - Try Again"
                        : "Mark as Completed"
                      : "Mark as Completed"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorSessions;
