import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [report, setReport] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const fetchRequests = async () => {
    try {
      const data = await apiRequest(
        "http://localhost:5001/api/admin/verifications",
        "GET",
        null,
        token
      );
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch verification requests:", err.message);
    }
  };

  const fetchReport = async () => {
    try {
      const data = await apiRequest(
        "http://localhost:5001/api/admin/report",
        "GET",
        null,
        token
      );
      setReport(data);
    } catch (err) {
      console.error("Failed to fetch report:", err.message);
    }
  };

  const handleUpdate = async (id, status) => {
    const comment = prompt("Optional comment:") || "";
    try {
      await apiRequest(
        `http://localhost:5001/api/admin/verifications/${id}`,
        "PUT",
        { status, comment },
        token
      );
      fetchRequests();
    } catch (err) {
      console.error("Failed to update request:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchReport();
  }, []);

  return (
    <div className="admin-dashboard">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

        .admin-dashboard {
          font-family: 'Poppins', sans-serif;
          padding: 32px;
          background-color: #F8FAFC;
          min-height: 100vh;
          color: #1E293B;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .dashboard-title {
          font-size: 28px;
          font-weight: 700;
          color: #0F172A;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .admin-tabs {
          display: flex;
          background-color: white;
          border-radius: 12px;
          padding: 6px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          margin-bottom: 32px;
        }

        .tab-button {
          border: none;
          background: none;
          padding: 12px 24px;
          font-family: 'Poppins', sans-serif;
          font-size: 15px;
          font-weight: 500;
          color: #64748B;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease-in-out;
        }

        .tab-button.active {
          background-color: #3B82F6;
          color: white;
        }

        .tab-button:hover:not(.active) {
          background-color: #F1F5F9;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        }

        .stat-label {
          font-size: 15px;
          font-weight: 500;
          color: #64748B;
          margin-bottom: 8px;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
          color: #0F172A;
        }

        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: #0F172A;
          margin: 0 0 20px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .section-title::before {
          content: "";
          display: block;
          width: 4px;
          height: 20px;
          background-color: #3B82F6;
          border-radius: 2px;
        }

        .verification-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 20px;
        }

        .verification-item {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          display: flex;
          flex-direction: column;
        }

        .verification-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
        }

        .tutor-name {
          font-size: 18px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .tutor-email {
          font-size: 14px;
          color: #64748B;
          margin-bottom: 16px;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .status-pending {
          background-color: #FEF3C7;
          color: #D97706;
        }

        .status-approved {
          background-color: #DCFCE7;
          color: #16A34A;
        }

        .status-rejected {
          background-color: #FEE2E2;
          color: #DC2626;
        }

        .qualifications {
          font-size: 14px;
          color: #475569;
          margin-bottom: 20px;
          line-height: 1.5;
          flex-grow: 1;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .btn-approve {
          background-color: #22C55E;
          color: white;
        }

        .btn-approve:hover {
          background-color: #16A34A;
        }

        .btn-reject {
          background-color: #EF4444;
          color: white;
        }

        .btn-reject:hover {
          background-color: #DC2626;
        }

        .empty-state {
          text-align: center;
          padding: 48px;
          background-color: white;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .empty-message {
          font-size: 16px;
          color: #64748B;
        }
      `}</style>

      <div className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          Overview
        </button>
        <button
          className={`tab-button ${
            activeTab === "verifications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("verifications")}
        >
          Verification Requests
        </button>
      </div>

      {activeTab === "overview" && report && (
        <>
          <h2 className="section-title">Platform Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Total Tutors</div>
              <div className="stat-value">{report.totalTutors}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Verified Tutors</div>
              <div className="stat-value">{report.verifiedTutors}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Students</div>
              <div className="stat-value">{report.totalStudents}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Sessions</div>
              <div className="stat-value">{report.totalSessions}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Completed Sessions</div>
              <div className="stat-value">{report.completedSessions}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Total Earnings</div>
              <div className="stat-value">{report.totalEarnings} PKR</div>
            </div>
          </div>

          <h2 className="section-title">Pending Verifications</h2>
          <ul className="verification-list">
            {requests
              .filter((req) => req.status === "pending")
              .map((req) => (
                <li key={req._id} className="verification-item">
                  <div className="tutor-name">{req.tutor.name}</div>
                  <div className="tutor-email">{req.tutor.email}</div>
                  <div className={`status-badge status-${req.status}`}>
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </div>
                  <div className="qualifications">
                    <strong>Qualifications:</strong>
                    <br />
                    {req.tutor.qualifications}
                  </div>
                  <div className="action-buttons">
                    <button
                      className="btn btn-approve"
                      onClick={() => handleUpdate(req._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleUpdate(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              ))}
            {requests.filter((req) => req.status === "pending").length ===
              0 && (
              <div className="empty-state">
                <p className="empty-message">
                  No pending verification requests
                </p>
              </div>
            )}
          </ul>
        </>
      )}

      {activeTab === "verifications" && (
        <>
          <h2 className="section-title">All Verification Requests</h2>
          <ul className="verification-list">
            {requests.map((req) => (
              <li key={req._id} className="verification-item">
                <div className="tutor-name">{req.tutor.name}</div>
                <div className="tutor-email">{req.tutor.email}</div>
                <div className={`status-badge status-${req.status}`}>
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </div>
                <div className="qualifications">
                  <strong>Qualifications:</strong>
                  <br />
                  {req.tutor.qualifications}
                </div>
                {req.status === "pending" && (
                  <div className="action-buttons">
                    <button
                      className="btn btn-approve"
                      onClick={() => handleUpdate(req._id, "approved")}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-reject"
                      onClick={() => handleUpdate(req._id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
            {requests.length === 0 && (
              <div className="empty-state">
                <p className="empty-message">No verification requests found</p>
              </div>
            )}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
