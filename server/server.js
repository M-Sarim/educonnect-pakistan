import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
