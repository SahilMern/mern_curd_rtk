console.log("JAI SHREE RAM / JAI BAJARANG BALI");

import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import userRoutes from "./Router/user.Routes.js";
import connectToDatabase from "./Config/Database/connection.js"; // Import the database connection function
import cookieParser from "cookie-parser";

const app = express();
const port = 9080;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Allow your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);
app.use(express.json());
app.use(cookieParser());

// Connect to the Database
connectToDatabase();

// Middleware for user routes
app.use("/api/v1/user", userRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}!`));
