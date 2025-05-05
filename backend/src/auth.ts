import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

// Hardcoded user
const user = {
  username: "intern",
  password: "letmein"
};

// Login route
authRouter.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    console.log("Missing username or password");
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  // Check credentials
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "15m" });
    return res.json({ token });
  }
  
  console.log("Invalid credentials");
  return res.status(401).json({ message: "Invalid credentials" });
});