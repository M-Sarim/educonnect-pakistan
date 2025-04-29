# 🇵🇰 EduConnect Pakistan — Bridging Students & Tutors Nationwide 🎓

**EduConnect Pakistan** is a full-stack MERN (MongoDB, Express, React + Vite, Node.js) web platform designed to connect students with verified tutors across Pakistan. It features real-time scheduling, session management, reviews, role-based access, analytics, and admin controls — all built for modern educational experiences.

---

## 🚀 Key Features

### 👨‍🎓 **For Students**
- 🔍 **Tutor Discovery & Filtering**  
  Find tutors by subject, location (online or city-based), price, rating, and real-time availability.

- 📅 **Calendar-Based Booking**  
  Book one-on-one sessions seamlessly using an intuitive calendar interface.

- 📂 **Session Dashboard**  
  Manage your past and upcoming sessions, with full reschedule/cancel options.

- ⭐ **Review & Rating System**  
  Rate tutors and share experiences to help others make informed choices.

- ❤️ **Wishlist Functionality**  
  Save tutors you like, with persistent localStorage-based management and filtering.

---

### 👨‍🏫 **For Tutors**
- 📝 **Profile Customization**  
  Edit your bio, set subjects and rates, upload a profile picture, and manage your availability.

- 💰 **Sessions & Earnings Tracker**  
  View confirmed sessions, accept/decline requests, and monitor income summaries weekly or monthly.

---

### 🛠️ **For Admins**
- 🛂 **Tutor Verification Workflow**  
  Approve or reject tutor requests with comments and view platform-wide approval stats.

- 📊 **Reporting & Analytics**  
  Charts showing user activity, top subjects, regional trends, and growth over time.

---

## 🔐 Authentication
- 🎭 Role-based login/signup for Students, Tutors, and Admins
- 🧩 Dynamic UI that adjusts by role
- 🔐 JWT-based authentication with secure session persistence

---

## 🧱 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React.js + Vite, Tailwind CSS |
| Backend      | Node.js, Express.js         |
| Database     | MongoDB, Mongoose           |
| Auth         | JWT, bcrypt                 |
| State Mgmt   | useState, useContext        |

---

## 📁 Folder Structure

```
/client (Vite + React)
  ├── components/
  ├── pages/
  ├── context/
  ├── services/
  └── main.jsx

/server (Node.js + Express)
  ├── controllers/
  ├── models/
  ├── routes/
  ├── middleware/
  └── server.js
```

---

## ⚙️ Installation Guide

### 1. **Clone the Repository**
```bash
git clone https://github.com/M-Sarim/educonnect-pakistan.git
cd educonnect-pakistan
```

### 2. **Install Dependencies**
```bash
# Frontend (Vite + React)
cd client
npm install

# Backend (Node + Express)
cd ../server
npm install
```

### 3. **Run the Application**
```bash
# Start backend server
cd server
npm run dev

# In a new terminal, start frontend
cd ../client
npm run dev
```

> 🔁 Vite will auto-reload changes and run the frontend on [http://localhost:5173](http://localhost:5173) by default.

---

## 📜 License

This project is developed for academic and educational use only. Commercial deployment is not permitted.

---

## 🙌 Acknowledgements

Special thanks to mentors, peers, and contributors who supported this initiative to make education more accessible across Pakistan.

---

🚀 *Empowering students. Enabling educators. Connecting Pakistan through technology.*
