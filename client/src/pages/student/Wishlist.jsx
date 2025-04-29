import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { apiRequest } from "../../utils/request.js";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const data = await apiRequest(
        "http://localhost:5001/api/wishlist",
        "GET",
        null,
        token
      );
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (tutorId) => {
    try {
      await apiRequest(
        `http://localhost:5001/api/wishlist/${tutorId}`,
        "DELETE",
        null,
        token
      );
      fetchWishlist();
    } catch (err) {
      console.error("Failed to remove from wishlist:", err.message);
    }
  };

  return (
    <div className="wishlist-container">
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
            --danger-color: #ff5555;
            --text-primary: #f8f8f2;
            --text-secondary: rgba(248, 248, 242, 0.75);
            --text-muted: rgba(248, 248, 242, 0.6);
            --bg-primary: linear-gradient(135deg, #30cfd0 0%, #5c258d 100%);
            --bg-card: rgba(255, 255, 255, 0.1);
            --border-color: rgba(255, 255, 255, 0.2);
            --shadow-color: rgba(0, 0, 0, 0.3);
          }
          
          .wishlist-container {
            font-family: 'Montserrat', sans-serif;
            max-width: 1100px;
            margin: 0 auto;
            padding: 2.5rem;
            color: var(--text-primary);
            background: var(--bg-primary);
            border-radius: 16px;
            box-shadow: 0 10px 30px var(--shadow-color);
          }
          
          .wishlist-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 1.5rem;
            margin-bottom: 2.5rem;
          }
          
          .wishlist-header h2 {
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
          
          .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            color: var(--text-secondary);
            border: 1px dashed var(--border-color);
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .empty-state h3 {
            font-size: 1.5rem;
            margin: 0;
            color: var(--text-primary);
          }
          
          .empty-state p {
            font-size: 1.1rem;
            max-width: 500px;
            margin: 0;
            opacity: 0.8;
          }
          
          .browse-link {
            display: inline-block;
            background: linear-gradient(90deg, #8be9fd, #bd93f9);
            color: #282a36;
            font-weight: 600;
            padding: 0.8rem 1.8rem;
            border-radius: 50px;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(139, 233, 253, 0.3);
          }
          
          .browse-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 15px rgba(139, 233, 253, 0.5);
          }
          
          .wishlist-cards {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1.5rem;
          }
          
          .wishlist-card {
            background: var(--bg-card);
            backdrop-filter: blur(10px);
            border-radius: 12px;
            padding: 1.8rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            flex-direction: column;
            gap: 1rem;
            border: 1px solid var(--border-color);
            transition: all 0.3s ease;
          }
          
          .wishlist-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
            border-color: var(--accent-color);
          }
          
          .tutor-name {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--text-primary);
            margin: 0;
          }
          
          .subjects-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 0.5rem;
          }
          
          .subject-tag {
            background: rgba(139, 233, 253, 0.2);
            color: var(--accent-color);
            border-radius: 50px;
            padding: 0.4rem 0.8rem;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid var(--accent-color);
            transition: all 0.2s ease;
          }
          
          .subject-tag:hover {
            background: rgba(139, 233, 253, 0.3);
            transform: translateY(-2px);
          }
          
          .card-actions {
            display: flex;
            justify-content: space-between;
            margin-top: auto;
            gap: 1rem;
          }
          
          .view-link {
            flex: 1;
            display: inline-block;
            background: linear-gradient(90deg, #8be9fd, #bd93f9);
            color: #282a36;
            padding: 0.7rem 0;
            text-align: center;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(139, 233, 253, 0.2);
          }
          
          .view-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(139, 233, 253, 0.4);
          }
          
          .remove-button {
            flex: 1;
            background: rgba(255, 85, 85, 0.1);
            color: var(--danger-color);
            border: 1px solid var(--danger-color);
            padding: 0.7rem 0;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Montserrat', sans-serif;
            font-weight: 600;
            transition: all 0.3s ease;
          }
          
          .remove-button:hover {
            background: rgba(255, 85, 85, 0.2);
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
          
          @media (max-width: 768px) {
            .wishlist-container {
              padding: 1.5rem;
              border-radius: 0;
            }
            
            .wishlist-header {
              flex-direction: column;
              gap: 1rem;
              align-items: flex-start;
            }
            
            .wishlist-cards {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="wishlist-header">
        <h2>My Wishlist</h2>
        <Link to="/student/dashboard" className="back-link">
          &larr; Back to Dashboard
        </Link>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
        </div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <h3>Your wishlist is empty</h3>
          <p>Save your favorite tutors here to easily find them later</p>
          <Link to="/student/tutors" className="browse-link">
            Browse Tutors
          </Link>
        </div>
      ) : (
        <div className="wishlist-cards">
          {items.map((item) => (
            <div key={item.tutor._id} className="wishlist-card">
              <h3 className="tutor-name">{item.tutor.name}</h3>

              <div>
                <div className="subjects-list">
                  {item.tutor.subjects.map((subject) => (
                    <span key={subject} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-actions">
                <Link
                  to={`/student/tutors/${item.tutor._id}`}
                  className="view-link"
                >
                  View Profile
                </Link>
                <button
                  className="remove-button"
                  onClick={() => removeFromWishlist(item.tutor._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
