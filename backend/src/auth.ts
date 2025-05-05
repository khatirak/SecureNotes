import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authRouter = express.Router();
const JWT_SECRET = "your-secret-key"; // In a real app, use environment variables

// Hardcoded user
const user = {
  username: "intern",
  password: "letmein"
};

// Login route
authRouter.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  
  // Check credentials
  if (username === user.username && password === user.password) {
    // Generate token that expires in 15 minutes
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "15m" });
    return res.json({ token });
  }
  
  return res.status(401).json({ message: "Invalid credentials" });
});

