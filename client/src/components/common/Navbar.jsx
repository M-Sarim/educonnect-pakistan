import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      <nav className="navbar">
        <div className="nav-brand">EduConnect</div>
        <div className="nav-links">
          {user.role === "student" && (
            <>
              <Link to="/student/profile">My Profile</Link>
              <Link to="/student/dashboard">Dashboard</Link>
              <Link to="/student/tutors">Browse Tutors</Link>
              <Link to="/student/sessions">My Sessions</Link>
              <Link to="/student/wishlist">Wishlist</Link>
            </>
          )}

          {user.role === "tutor" && (
            <>
              <Link to="/tutor/dashboard">Dashboard</Link>
              <Link to="/tutor/sessions">My Sessions</Link>
              <Link to="/tutor/profile">Profile</Link>
            </>
          )}

          {user.role === "admin" && (
            <Link to="/admin/dashboard">Admin Panel</Link>
          )}
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

        .navbar {
          font-family: 'Poppins', sans-serif;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #2c3e50;
          padding: 1rem 2rem;
          color: #ecf0f1;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .nav-brand {
          font-size: 1.5rem;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          gap: 1.5rem;
        }

        .nav-links a {
          color: #ecf0f1;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }

        .nav-links a:hover {
          color: #1abc9c;
        }

        .logout-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .logout-btn:hover {
          background: #c0392b;
        }
      `}</style>
    </>
  );
};

export default Navbar;
