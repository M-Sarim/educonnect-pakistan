import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/request.js";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    qualifications: "",
    subjects: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };

      if (form.role === "tutor") {
        payload.qualifications = form.qualifications;
        payload.subjects = form.subjects.split(",").map((s) => s.trim());
      }

      await apiRequest(
        "http://localhost:5001/api/auth/register",
        "POST",
        payload
      );
      alert("✅ Account created! You can now log in.");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      {/* Internal CSS */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700&display=swap');

          /* Base styles */
          .register-container * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Raleway', sans-serif;
          }

          /* Register container */
          .register-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            position: relative;
            overflow: hidden;
          }

          .register-container::before {
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

          /* Register card */
          .register-card {
            width: 100%;
            max-width: 500px;
            background-color: white;
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 8px rgba(0, 0, 0, 0.03);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            z-index: 10;
            border: 1px solid rgba(0, 0, 0, 0.05);
          }

          .register-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04);
          }

          /* Register header */
          .register-header {
            padding: 2.5rem 2rem 2rem;
            background: linear-gradient(135deg, #2c3e50 0%, #1a2a3a 100%);
            position: relative;
            overflow: hidden;
          }

          .register-header::before {
            content: '';
            position: absolute;
            top: -80%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%);
            transform: rotate(20deg);
          }

          .register-header::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 100%;
            height: 10px;
            background: linear-gradient(90deg, rgba(0,212,255,0.7) 0%, rgba(9,9,121,0.7) 50%, rgba(0,212,255,0.7) 100%);
            filter: blur(2px);
          }

          .register-header h2 {
            color: white;
            font-size: 2.2rem;
            font-weight: 600;
            text-align: center;
            position: relative;
            letter-spacing: 0.5px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          }

          /* Register form */
          .register-form {
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

          .form-group input,
          .form-group select {
            width: 100%;
            padding: 1rem 1.2rem;
            border: 1.5px solid #e2e8f0;
            border-radius: 12px;
            font-size: 1rem;
            color: #1a202c;
            transition: all 0.3s ease;
            background-color: #f8fafc;
          }

          .form-group input:focus,
          .form-group select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
            background-color: white;
          }

          .form-group input::placeholder,
          .form-group select::placeholder {
            color: #94a3b8;
          }

          .form-group select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1rem;
            padding-right: 2.5rem;
          }

          /* Role selector */
          .role-selector {
            margin-bottom: 0.5rem;
          }

          .role-title {
            font-size: 0.95rem;
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.6rem;
            letter-spacing: 0.2px;
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

          .error-message::before {
            content: "⚠️";
            margin-right: 10px;
            font-size: 1rem;
          }

          /* Register button */
          .register-button {
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

          .register-button:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(37, 99, 235, 0.25);
          }

          .register-button:active {
            transform: translateY(0);
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
          }

          .register-button::after {
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

          .register-button:active::after {
            transform: scale(0, 0);
            opacity: 0.3;
            transition: 0s;
          }

          /* Login link */
          .account-options {
            text-align: center;
            font-size: 0.95rem;
            color: #475569;
          }

          .login-link {
            margin-left: 0.5rem;
            color: #3b82f6;
            font-weight: 600;
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .login-link:hover {
            color: #1d4ed8;
            text-decoration: underline;
          }

          /* Dynamic fields animation */
          .tutor-fields {
            animation: fadeIn 0.4s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Responsive adjustments */
          @media (max-width: 480px) {
            .register-header h2 {
              font-size: 1.8rem;
            }
            
            .register-form {
              padding: 1.8rem 1.5rem;
            }
          }
        `}
      </style>

      {/* Register Component */}
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h2>Create Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a secure password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group role-selector">
              <label htmlFor="role">I am a</label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handleChange}
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            {form.role === "tutor" && (
              <div className="tutor-fields">
                <div className="form-group">
                  <label htmlFor="qualifications">Qualifications</label>
                  <input
                    id="qualifications"
                    name="qualifications"
                    placeholder="Your degrees, certifications, etc."
                    value={form.qualifications}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subjects">Subjects You Teach</label>
                  <input
                    id="subjects"
                    name="subjects"
                    placeholder="Math, Science, English, etc. (comma-separated)"
                    value={form.subjects}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {error && <div className="error-message">{error}</div>}

            <button type="submit" className="register-button">
              Create Account
            </button>

            <div className="account-options">
              <p>
                Already have an account?
                <a href="/login" className="login-link">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
