import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Session from "./models/Session.js";
import Review from "./models/Review.js";
import Verification from "./models/Verification.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Promise.all([
      User.deleteMany(),
      Session.deleteMany(),
      Review.deleteMany(),
      Verification.deleteMany(),
    ]);

    const defaultPassword = process.env.SEED_PASSWORD || "sarim3688";
    const hashedPass = await bcrypt.hash(defaultPassword, 12);

    const admins = [
      {
        name: "Sarim",
        email: "sarim@edu.pk",
        password: hashedPass,
        role: "admin",
      },
      {
        name: "Hasan",
        email: "hasan@edu.pk",
        password: hashedPass,
        role: "admin",
      },
    ];
    await User.insertMany(admins);

    const tutorsData = [
      {
        name: "Taha",
        email: "taha@edu.pk",
        password: hashedPass,
        role: "tutor",
        qualifications: "MSc Mathematics",
        subjects: ["Math", "Physics"],
        hourlyRate: 800,
        preferences: "both",
        isVerified: true,
        availability: [{ day: "Monday", timeSlots: ["10AM", "2PM"] }],
      },
      {
        name: "Fizza",
        email: "fizza@edu.pk",
        password: hashedPass,
        role: "tutor",
        qualifications: "PhD Chemistry",
        subjects: ["Chemistry"],
        hourlyRate: 1000,
        preferences: "online",
        isVerified: false,
        availability: [{ day: "Tuesday", timeSlots: ["11AM"] }],
      },
      {
        name: "Waanya",
        email: "waanya@edu.pk",
        password: hashedPass,
        role: "tutor",
        qualifications: "MPhil Biology",
        subjects: ["Biology"],
        hourlyRate: 700,
        preferences: "in-person",
        isVerified: true,
        availability: [{ day: "Friday", timeSlots: ["9AM"] }],
      },
      {
        name: "Fatima",
        email: "fatima@edu.pk",
        password: hashedPass,
        role: "tutor",
        qualifications: "MSc English Literature",
        subjects: ["English"],
        hourlyRate: 650,
        preferences: "both",
        isVerified: true,
        availability: [{ day: "Thursday", timeSlots: ["1PM"] }],
      },
    ];
    const createdTutors = await User.insertMany(tutorsData);

    const studentsData = [
      {
        name: "Aiza",
        email: "aiza@student.pk",
        password: hashedPass,
        role: "student",
      },
      {
        name: "Mahum",
        email: "mahum@student.pk",
        password: hashedPass,
        role: "student",
      },
      {
        name: "Dua",
        email: "dua@student.pk",
        password: hashedPass,
        role: "student",
      },
      {
        name: "Ayesha",
        email: "ayesha@student.pk",
        password: hashedPass,
        role: "student",
      },
      {
        name: "Meerab",
        email: "meerab@student.pk",
        password: hashedPass,
        role: "student",
      },
    ];
    const createdStudents = await User.insertMany(studentsData);

    const sessionsData = [
      {
        student: createdStudents[0]._id,
        tutor: createdTutors[0]._id,
        date: new Date(),
        time: "10AM",
        type: "online",
        status: "completed",
        price: 800,
      },
      {
        student: createdStudents[1]._id,
        tutor: createdTutors[2]._id,
        date: new Date(),
        time: "9AM",
        type: "in-person",
        status: "confirmed",
        price: 700,
      },
      {
        student: createdStudents[2]._id,
        tutor: createdTutors[1]._id,
        date: new Date(),
        time: "11AM",
        type: "online",
        status: "pending",
        price: 1000,
      },
      {
        student: createdStudents[3]._id,
        tutor: createdTutors[3]._id,
        date: new Date(),
        time: "1PM",
        type: "in-person",
        status: "completed",
        price: 650,
      },
    ];
    await Session.insertMany(sessionsData);

    const reviewsData = [
      {
        student: createdStudents[0]._id,
        tutor: createdTutors[0]._id,
        rating: 5,
        reviewText: "Excellent math tutoring!",
      },
      {
        student: createdStudents[1]._id,
        tutor: createdTutors[2]._id,
        rating: 4,
        reviewText: "Very helpful in biology.",
      },
      {
        student: createdStudents[2]._id,
        tutor: createdTutors[1]._id,
        rating: 3,
        reviewText: "Decent explanation of concepts.",
      },
    ];
    await Review.insertMany(reviewsData);

    const unverifiedTutors = createdTutors.filter((t) => !t.isVerified);
    const verificationsData = unverifiedTutors.map((tutor, idx) => ({
      tutor: tutor._id,
      documents: [`doc${idx + 1}.pdf`],
      status: "pending",
    }));
    await Verification.insertMany(verificationsData);

    console.log("Full dummy data seeded successfully!");
  } catch (error) {
    console.error("Seeder error:", error);
  } finally {
    mongoose.connection.close();
    process.exit();
  }
};

seedData();
