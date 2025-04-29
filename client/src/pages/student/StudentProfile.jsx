import { useAuth } from "../../context/AuthContext.jsx";

const StudentProfile = () => {
  const { user } = useAuth();

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');

          .profile-container {
            font-family: 'Raleway', sans-serif;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 2rem;
          }

          .profile-card {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.03);
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .profile-header {
            padding: 2.5rem;
            background: linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%);
            color: white;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 2rem;
          }

          .profile-header::before {
            content: '';
            position: absolute;
            top: -80%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
            transform: rotate(20deg);
          }

          .profile-header::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, rgba(0,212,255,0.7) 0%, rgba(9,9,121,0.7) 50%, rgba(0,212,255,0.7) 100%);
            filter: blur(2px);
          }

          .avatar-placeholder {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            color: white;
            position: relative;
            border: 4px solid rgba(255, 255, 255, 0.2);
            flex-shrink: 0;
          }

          .profile-title {
            font-size: 2.2rem;
            font-weight: 600;
            text-align: left;
            position: relative;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            margin: 0;
            flex-grow: 1;
          }

          .profile-content {
            padding: 2.5rem;
          }

          .profile-details {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
          }

          .info-card {
            padding: 1.5rem;
            background-color: #f8fafc;
            border-radius: 16px;
            border-left: 5px solid #3b82f6;
            transition: all 0.3s ease;
          }

          .info-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          }

          .info-label {
            font-weight: 700;
            color: #3b82f6;
            margin-right: 0.5rem;
          }

          .info-value {
            font-size: 1.1rem;
            color: #334155;
          }

          .edit-button {
            margin-top: 2rem;
            padding: 1rem 2rem;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            width: 100%;
            letter-spacing: 0.5px;
          }

          .edit-button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(37, 99, 235, 0.25);
          }

          @media (max-width: 768px) {
            .profile-header {
              flex-direction: column;
              text-align: center;
              gap: 1rem;
              padding: 1.5rem;
            }
            
            .profile-content {
              padding: 1.5rem;
            }
            
            .profile-title {
              font-size: 1.8rem;
              text-align: center;
            }
            
            .avatar-placeholder {
              width: 80px;
              height: 80px;
              font-size: 2rem;
            }
          }
        `}
      </style>

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-placeholder">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="profile-title">My Profile</h1>
          </div>

          <div className="profile-content">
            <div className="profile-details">
              <div className="info-card">
                <span className="info-label">Name:</span>
                <span className="info-value">{user.name}</span>
              </div>

              <div className="info-card">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email}</span>
              </div>

              <div className="info-card">
                <span className="info-label">Role:</span>
                <span className="info-value">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </div>

            <button className="edit-button">Edit Profile</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
