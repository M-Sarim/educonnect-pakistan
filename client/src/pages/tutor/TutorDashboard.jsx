import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";

const TutorDashboard = () => {
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    upcomingSessions: 0,
    totalStudents: 0,
    rating: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await apiRequest(
        "http://localhost:5001/api/tutors/dashboard",
        "GET",
        null,
        token
      );
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch tutor stats:", error.message);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  return (
    <div className="dashboard-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .dashboard-container {
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem;
          color: #1e293b;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        
        .dashboard-header {
          border-bottom: 3px solid #8b5cf6;
          padding-bottom: 1.25rem;
          margin-bottom: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .dashboard-header h2 {
          color: #6d28d9;
          font-weight: 700;
          font-size: 2rem;
          margin: 0;
        }
        
        .dashboard-welcome {
          background: linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%);
          border-radius: 12px;
          padding: 2rem;
          margin-bottom: 2.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 10px 15px -3px rgba(107, 40, 217, 0.2);
        }
        
        .welcome-message {
          flex: 1;
        }
        
        .welcome-message h3 {
          font-size: 1.5rem;
          color: white;
          margin-bottom: 0.75rem;
          font-weight: 600;
        }
        
        .welcome-message p {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-size: 1.1rem;
        }
        
        .dashboard-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        
        .stat-card {
          background-color: white;
          border-radius: 12px;
          padding: 1.75rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border-top: 5px solid #8b5cf6;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card h4 {
          color: #64748b;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .stat-card p {
          color: #6d28d9;
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
        }
        
        .dashboard-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }
        
        .dashboard-card {
          background-color: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          min-height: 240px;
          transition: transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
        }
        
        .dashboard-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          color: #8b5cf6;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          background-color: rgba(139, 92, 246, 0.1);
          border-radius: 16px;
        }
        
        .card-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #1e293b;
        }
        
        .card-description {
          color: #64748b;
          margin-bottom: 2rem;
          flex-grow: 1;
          line-height: 1.6;
          font-size: 1.05rem;
        }
        
        .card-link {
          display: inline-block;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          color: white;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s;
          text-align: center;
          box-shadow: 0 4px 10px rgba(107, 40, 217, 0.25);
          width: 100%;
        }
        
        .card-link:hover {
          background: linear-gradient(90deg, #7c3aed, #5b21b6);
          box-shadow: 0 6px 15px rgba(107, 40, 217, 0.35);
        }
        
        .loading-indicator {
          display: inline-flex;
          align-items: center;
          font-size: 1.25rem;
          color: #8b5cf6;
          gap: 0.5rem;
        }
        
        .loading-indicator::after {
          content: '...';
          animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
          0% { content: '.'; }
          33% { content: '..'; }
          66% { content: '...'; }
        }
        
        @media (max-width: 992px) {
          .dashboard-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .dashboard-cards {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .dashboard-stats {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .dashboard-cards {
            grid-template-columns: 1fr;
          }
          
          .dashboard-container {
            padding: 1.5rem;
          }
          
          .dashboard-header h2 {
            font-size: 1.75rem;
          }
        }
        
        @media (max-width: 576px) {
          .dashboard-stats {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="dashboard-header">
        <h2>Tutor Dashboard</h2>
      </div>

      <div className="dashboard-welcome">
        <div className="welcome-message">
          <h3>Welcome back, {user.name}!</h3>
          <p>
            Manage your upcoming sessions and track your teaching performance
          </p>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h4>Upcoming Sessions</h4>
          {loadingStats ? (
            <div className="loading-indicator">Loading</div>
          ) : (
            <p>{stats.upcomingSessions}</p>
          )}
        </div>
        <div className="stat-card">
          <h4>Total Students</h4>
          {loadingStats ? (
            <div className="loading-indicator">Loading</div>
          ) : (
            <p>{stats.totalStudents}</p>
          )}
        </div>
        <div className="stat-card">
          <h4>Average Rating</h4>
          {loadingStats ? (
            <div className="loading-indicator">Loading</div>
          ) : (
            <p>{stats.rating.toFixed(1)}</p>
          )}
        </div>
      </div>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">📅</div>
          <h3 className="card-title">My Sessions</h3>
          <p className="card-description">
            View and manage your upcoming and past tutoring sessions. Monitor
            student progress and prepare for classes.
          </p>
          <Link to="/tutor/sessions" className="card-link">
            View Sessions
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👤</div>
          <h3 className="card-title">Edit Profile</h3>
          <p className="card-description">
            Update your personal information, expertise, qualifications, and set
            your teaching availability.
          </p>
          <Link to="/tutor/profile" className="card-link">
            Update Profile
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">💰</div>
          <h3 className="card-title">Payment History</h3>
          <p className="card-description">
            Track your earnings, view payment history, and manage payout methods
            for your tutoring services.
          </p>
          <Link to="/tutor/payments" className="card-link">
            View Payments
          </Link>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📚</div>
          <h3 className="card-title">Teaching Resources</h3>
          <p className="card-description">
            Access teaching materials, worksheets, and educational resources to
            enhance your tutoring sessions.
          </p>
          <Link to="/tutor/resources" className="card-link">
            Access Resources
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TutorDashboard;
