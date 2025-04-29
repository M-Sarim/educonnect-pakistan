import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');

          .dashboard-container {
            font-family: 'Raleway', sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 2rem;
          }

          .dashboard-card {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .dashboard-header {
            padding: 2.5rem;
            background: linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%);
            color: white;
            position: relative;
            overflow: hidden;
          }

          .dashboard-header::before {
            content: '';
            position: absolute;
            top: -80%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
            transform: rotate(20deg);
          }

          .dashboard-header::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, rgba(0,212,255,0.7) 0%, rgba(9,9,121,0.7) 50%, rgba(0,212,255,0.7) 100%);
            filter: blur(2px);
          }

          .welcome-text {
            font-size: 2.2rem;
            font-weight: 600;
            text-align: left;
            position: relative;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            margin: 0;
          }

          .dashboard-content {
            padding: 2.5rem;
          }

          .nav-menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 1.5rem;
            margin-top: 1rem;
          }

          .nav-item {
            background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
            border-radius: 16px;
            padding: 1.8rem;
            text-align: center;
            text-decoration: none;
            color: #2c3e50;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            position: relative;
            overflow: hidden;
            height: 180px;
          }

          .nav-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 5px;
            background: linear-gradient(90deg, #3b82f6, #2563eb);
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s ease;
          }

          .nav-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            border-color: #cbd5e1;
          }

          .nav-item:hover::before {
            transform: scaleX(1);
          }

          .nav-icon {
            font-size: 2.5rem;
            margin-bottom: 0.5rem;
            color: #3b82f6;
          }

          .tutors-icon::before { content: '👨‍🏫'; }
          .sessions-icon::before { content: '📚'; }
          .wishlist-icon::before { content: '❤️'; }
          .profile-icon::before { content: '👤'; }

          @media (max-width: 768px) {
            .dashboard-header, .dashboard-content {
              padding: 1.5rem;
            }
            
            .welcome-text {
              font-size: 1.8rem;
            }
            
            .nav-menu {
              grid-template-columns: 1fr;
            }
            
            .nav-item {
              height: 120px;
            }
          }
        `}
      </style>

      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <h1 className="welcome-text">Welcome, {user.name}</h1>
          </div>

          <div className="dashboard-content">
            <div className="nav-menu">
              <Link to="/student/tutors" className="nav-item">
                <span className="nav-icon tutors-icon"></span>
                Browse Tutors
              </Link>
              <Link to="/student/sessions" className="nav-item">
                <span className="nav-icon sessions-icon"></span>
                My Sessions
              </Link>
              <Link to="/student/wishlist" className="nav-item">
                <span className="nav-icon wishlist-icon"></span>
                My Wishlist
              </Link>
              <Link to="/student/profile" className="nav-item">
                <span className="nav-icon profile-icon"></span>
                My Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
