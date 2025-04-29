import { useEffect, useState } from "react";
import { apiRequest } from "../../utils/request.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link } from "react-router-dom";

const TutorList = () => {
  const { token } = useAuth();
  const [tutors, setTutors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    subject: "",
    location: "",
    minRating: "",
    minPrice: "",
    maxPrice: "",
    availability: "",
  });

  const fetchTutors = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams(
        Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== "")
        )
      ).toString();
      const data = await apiRequest(
        `http://localhost:5001/api/tutors?${query}`,
        "GET",
        null,
        token
      );
      setTutors(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tutors:", err.message);
      setError("Failed to load tutors. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => fetchTutors();

  const handleReset = () => {
    setFilters({
      subject: "",
      location: "",
      minRating: "",
      minPrice: "",
      maxPrice: "",
      availability: "",
    });
    setTimeout(fetchTutors, 0);
  };

  return (
    <div className="tutor-list-container">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .tutor-list-container {
          font-family: 'Inter', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2.5rem;
          color: #1e293b;
          background-color: #f8fafc;
          min-height: 100vh;
        }
        
        .tutor-list-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 3px solid #8b5cf6;
          padding-bottom: 1.25rem;
          margin-bottom: 2.5rem;
        }
        
        .tutor-list-heading {
          color: #6d28d9;
          font-weight: 700;
          font-size: 2rem;
          margin: 0;
        }
        
        .filter-section {
          background-color: white;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          margin-bottom: 2.5rem;
          border-top: 5px solid #8b5cf6;
        }
        
        .filter-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-top: 0;
          margin-bottom: 1.5rem;
          color: #1e293b;
        }
        
        .filter-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.25rem;
          margin-bottom: 1.5rem;
        }
        
        .form-control {
          width: 100%;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          color: #1e293b;
          transition: border-color 0.3s, box-shadow 0.3s;
        }
        
        .form-control:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
        }
        
        .form-control::placeholder {
          color: #94a3b8;
        }
        
        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 1rem;
        }
        
        .reset-button {
          background-color: #f1f5f9;
          color: #475569;
          border: none;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.95rem;
        }
        
        .reset-button:hover {
          background-color: #e2e8f0;
        }
        
        .search-button {
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          color: white;
          border: none;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 0.95rem;
          box-shadow: 0 4px 10px rgba(107, 40, 217, 0.25);
        }
        
        .search-button:hover {
          background: linear-gradient(90deg, #7c3aed, #5b21b6);
          box-shadow: 0 6px 15px rgba(107, 40, 217, 0.35);
          transform: translateY(-2px);
        }
        
        .loader {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
        }
        
        .spinner {
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
        
        .error-message {
          background-color: rgba(239, 68, 68, 0.1);
          color: #b91c1c;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          border-left: 5px solid #ef4444;
          font-weight: 500;
        }
        
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          color: #64748b;
          font-size: 1.1rem;
        }
        
        .tutor-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }
        
        .tutor-card {
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s, box-shadow 0.3s;
          border: 1px solid #f1f5f9;
          position: relative;
        }
        
        .tutor-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        }
        
        .tutor-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
        }
        
        .tutor-info {
          padding: 1.75rem;
        }
        
        .tutor-name {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: #1e293b;
        }
        
        .tutor-details {
          margin-bottom: 0.75rem;
          color: #64748b;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
        }
        
        .detail-icon {
          margin-right: 0.5rem;
          color: #8b5cf6;
        }
        
        .tutor-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }
        
        .subject-tag {
          background-color: rgba(139, 92, 246, 0.1);
          color: #6d28d9;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .rate-chip {
          background-color: #ddd6fe;
          color: #6d28d9;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.95rem;
          display: inline-flex;
          align-items: center;
        }
        
        .price-icon {
          margin-right: 0.5rem;
        }
        
        .view-profile-button {
          display: block;
          background: linear-gradient(90deg, #8b5cf6, #6d28d9);
          color: white;
          text-decoration: none;
          text-align: center;
          padding: 1rem 0;
          font-weight: 600;
          transition: all 0.3s;
          font-size: 1rem;
        }
        
        .view-profile-button:hover {
          background: linear-gradient(90deg, #7c3aed, #5b21b6);
        }
        
        .qualification-badge {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 0.25rem 0.75rem;
          margin-left: 0.5rem;
          font-size: 0.85rem;
          color: #475569;
        }
        
        @media (max-width: 992px) {
          .filter-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .tutor-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .filter-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .tutor-grid {
            grid-template-columns: 1fr;
          }
          
          .tutor-list-container {
            padding: 1.5rem;
          }
        }
        
        @media (max-width: 576px) {
          .filter-grid {
            grid-template-columns: 1fr;
          }
          
          .button-group {
            flex-direction: column-reverse;
          }
          
          .search-button, .reset-button {
            width: 100%;
          }
        }
      `}</style>

      <div className="tutor-list-header">
        <h2 className="tutor-list-heading">Find a Tutor</h2>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Filter Tutors</h3>
        <div className="filter-grid">
          <input
            className="form-control"
            name="subject"
            placeholder="Subject (e.g. Math, Physics)"
            value={filters.subject}
            onChange={handleChange}
          />

          <select
            className="form-control"
            name="location"
            value={filters.location}
            onChange={handleChange}
          >
            <option value="">All Locations</option>
            <option value="online">Online Only</option>
            <option value="in-person">In-person Only</option>
            <option value="both">Both Online & In-person</option>
          </select>

          <input
            className="form-control"
            name="minRating"
            placeholder="Minimum Rating (1-5)"
            type="number"
            min="1"
            max="5"
            value={filters.minRating}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="minPrice"
            placeholder="Min Price (PKR)"
            type="number"
            value={filters.minPrice}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="maxPrice"
            placeholder="Max Price (PKR)"
            type="number"
            value={filters.maxPrice}
            onChange={handleChange}
          />

          <input
            className="form-control"
            name="availability"
            placeholder="Day (e.g. Monday)"
            value={filters.availability}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">
          <button className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
          <button className="search-button" onClick={handleSearch}>
            Search Tutors
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="loader">
          <div className="spinner"></div>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {!isLoading && !error && tutors.length === 0 && (
        <div className="empty-state">
          <p>
            No tutors found matching your criteria. Try adjusting your filters.
          </p>
        </div>
      )}

      {!isLoading && !error && tutors.length > 0 && (
        <div className="tutor-grid">
          {tutors.map((tutor) => (
            <div key={tutor._id} className="tutor-card">
              <div className="tutor-info">
                <h3 className="tutor-name">{tutor.name}</h3>

                <div className="tutor-subjects">
                  {tutor.subjects.map((subject, idx) => (
                    <span key={idx} className="subject-tag">
                      {subject}
                    </span>
                  ))}
                </div>

                <div className="tutor-details">
                  <span className="rate-chip">
                    <span className="price-icon">💰</span>
                    PKR {tutor.hourlyRate}/hr
                  </span>
                </div>

                <div className="tutor-details">
                  <span className="detail-icon">📍</span>
                  <strong>Mode:</strong> {tutor.preferences}
                </div>

                <div className="tutor-details">
                  <span className="detail-icon">🎓</span>
                  <strong>Qualifications:</strong>
                  <span className="qualification-badge">
                    {tutor.qualifications}
                  </span>
                </div>

                {tutor.rating && (
                  <div className="tutor-details">
                    <span className="detail-icon">⭐</span>
                    <strong>Rating:</strong> {tutor.rating.toFixed(1)}/5.0
                  </div>
                )}
              </div>

              <Link
                to={`/student/tutors/${tutor._id}`}
                className="view-profile-button"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorList;
