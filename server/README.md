# EduConnect Server (Backend)

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)]()
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey)]()
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)]()
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

This is the _Node.js/Express backend_ for EduConnect Pakistan, handling user authentication, tutor-student interactions, and session management.

## 🚀 Features

✅ Secure JWT-based authentication  
✅ Tutor verification & admin dashboard  
✅ Session booking system  
✅ MongoDB database integration  
✅ RESTful API structure

## 🛠 Tech Stack

- _Node.js_ (Runtime)
- _Express.js_ (Web framework)
- _MongoDB_ (Mongoose ORM)
- _JWT Authentication_ (Secure API access)
- _Multer_ (File uploads)
- _Dotenv_ (Environment management)

## 📂 Folder Structure

server/
│── models/ # Mongoose schemas
│── routes/ # Express routes
│── controllers/ # Business logic
│── middleware/ # Authentication & validation
│── config/ # Database connection
│── README.md
│── server.js

## 🏗 Installation

### _Step 1: Navigate to the backend folder_

sh
cd server

### _Step 2: Install dependencies_

sh
npm install

### _Step 3: Set up environment variables_

Create a .env file in server/ and add:
env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000

### _Step 4: Start the development server_

sh
npm run dev

## 🛠 Available Scripts

- npm start – Runs the server in production mode
- npm run dev – Runs the server in development mode (nodemon)

## 🚀 Deployment

To deploy, set environment variables and run:
sh
npm start

## 🤝 Contributing

Pull requests are welcome! Open an issue first to discuss any changes.

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
