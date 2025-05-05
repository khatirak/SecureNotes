import express from "express";
import cors from "cors";
import { authRouter } from "./auth";
import { notesRouter } from "./notes";
import { authMiddleware } from "./middleware";

const app = express();
const PORT = process.env.PORT || 8000;

// CORS configuration - just use this one approach
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
}));

// JSON body parser middleware
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/notes", authMiddleware, notesRouter);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});