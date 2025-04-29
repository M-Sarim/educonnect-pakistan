import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiRequest } from "../../utils/request";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await apiRequest(
        "http://localhost:5001/api/auth/login",
        "POST",
        { email, password }
      );
      login(res.user, res.token);

      if (res.user.role === "admin") navigate("/admin/dashboard");
      else if (res.user.role === "tutor") navigate("/tutor/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');

          /* Base styles */
          .login-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Raleway', sans-serif;
          }

          /* Login container */
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            position: relative;
            overflow: hidden;
          }

          .login-container::before {
            content: '';
            position: absolute;
            width: 150%;
            height: 150%;
            top: -25%;
            left: -25%;
            background: radial-gradient(circle, rgba(25, 91, 255, 0.03) 0%, rgba(25, 91, 255, 0.01) 70%);
            transform: rotate(12deg);
            z-index: 0;
          }

          /* Login card */
          .login-card {
            width: 100%;
            max-width: 450px;
            background-color: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.03);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            z-index: 10;
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .login-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04);
          }

          /* Login header */
          .login-header {
            padding: 2.5rem 2rem 2rem;
            background: linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%);
            position: relative;
            overflow: hidden;
          }

          .login-header::before {
            content: '';
            position: absolute;
            top: -80%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
            transform: rotate(20deg);
          }

          .login-header::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, rgba(0,212,255,0.7) 0%, rgba(9,9,121,0.7) 50%, rgba(0,212,255,0.7) 100%);
            filter: blur(2px);
          }

          .login-header h2 {
            color: white;
            font-size: 2.2rem;
            font-weight: 600;
            text-align: center;
            position: relative;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          }

          /* Login form */
          .login-form {
            padding: 2.5rem 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.8rem;
            background-color: #ffffff;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.6rem;
          }

          .form-group label {
            font-size: 0.95rem;
            font-weight: 600;
            color: #2c3e50;
            letter-spacing: 0.2px;
          }

          .form-group input {
            width: 100%;
            padding: 1rem 1.2rem;
            border: 1.5px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            color: #1a202c;
            transition: all 0.3s ease;
            background-color: #f8fafc;
          }

          .form-group input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
            background-color: white;
          }

          .form-group input::placeholder {
            color: #94a3b8;
          }

          /* Error message */
          .error-message {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 1rem 1.2rem;
            border-radius: 10px;
            color: #b91c1c;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            animation: fadeIn 0.3s ease-in-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .error-message::before {
            content: "⚠️";
            margin-right: 10px;
            font-size: 1rem;
          }

          /* Login button */
          .login-button {
            width: 100%;
            padding: 1rem;
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1.05rem;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            letter-spacing: 0.5px;
          }

          .login-button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(37, 99, 235, 0.25);
          }

          .login-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
          }

          .login-button::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            pointer-events: none;
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 10.01%);
            background-repeat: no-repeat;
            background-position: 50%;
            transform: scale(10, 10);
            opacity: 0;
            transition: transform 0.5s, opacity 0.8s;
          }

          .login-button:active::after {
            transform: scale(0, 0);
            opacity: 0.3;
            transition: 0s;
          }

          /* Sign up link */
          .account-options {
            text-align: center;
            font-size: 0.95rem;
            color: #475569;
            margin-top: -0.6rem;
          }

          .signup-link {
            margin-left: 0.5rem;
            color: #3b82f6;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .signup-link:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }

          /* Forgot password */
          .forgot-password {
            text-align: center;
            margin-top: -0.8rem;
          }

          .forgot-password a {
            font-size: 0.9rem;
            color: #64748b;
            text-decoration: none;
            transition: all 0.3s ease;
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
          }

          .forgot-password a:hover {
            color: #3b82f6;
            background-color: #f1f5f9;
          }

          /* Responsive adjustments */
          @media (max-width: 480px) {
            .login-header h2 {
              font-size: 1.8rem;
            }
            
            .login-form {
              padding: 1.8rem 1.5rem;
            }
          }
        `}
      </style>

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back</h2>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <button type="submit" className="login-button">
                Sign In
              </button>
            </div>

            <div className="account-options">
              <p>
                Don't have an account?
                <a href="/register" className="signup-link">
                  Sign up
                </a>
              </p>
            </div>

            <div className="forgot-password">
              <a href="/forgot-password">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
