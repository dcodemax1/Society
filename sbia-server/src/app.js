import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import memberRoutes from "./modules/members/member.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";
import helmet from "helmet";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/members", memberRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
