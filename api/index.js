import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import roomsRoute from "./routes/rooms.js";
import hotelsRoute from "./routes/hotels.js";
import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to Mongo");
  } catch (error) {
    throw error;
  }
};

//middleware
app.use(cookieParser());
app.use(express.json());
app.use("/auth", authRoute);
app.use("/hotels", hotelsRoute);
app.use("/rooms", roomsRoute);
app.use("/users", usersRoute);

app.use((error, req, res, next) => {
  const errorStatus = error.status || 500;
  const errorMessage = error.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: error.stack,
  });
});

app.listen(4000, () => {
  dbConnection();
  console.log("Server is up");
});
