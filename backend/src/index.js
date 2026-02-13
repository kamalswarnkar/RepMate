import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import profileRoutes from "./routes/profile.js";
import goalsRoutes from "./routes/goals.js";
import planRoutes from "./routes/plan.js";
import progressRoutes from "./routes/progress.js";
import messageRoutes from "./routes/messages.js";
import errorHandler from "./middleware/error.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ ok: true, name: "repmate-backend" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/profile", profileRoutes);
app.use("/goals", goalsRoutes);
app.use("/plan", planRoutes);
app.use("/progress", progressRoutes);
app.use("/messages", messageRoutes);

app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on port ${port}`);
});
