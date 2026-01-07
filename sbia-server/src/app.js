import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import memberRoutes from "./modules/members/member.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import loanRoutes from "./modules/loans/loan.routes.js";

const app = express();

// Note: File upload configuration is handled in individual route files

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.CLIENT_URL || "http://localhost:5175",
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Note: Files are now stored in Cloudinary

/* Health check */
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/loans", loanRoutes);

export default app;
