import express from "express";
import "dotenv/config";
import cors from "cors";

import interactionRoutes from "./routes/interactionRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json({
    verify: (req, res, buffer) => {
        req.rawBody = buffer;
    },
}));

// Routes
app.get("/", (req, res) => res.send("Server is running"));

app.use("/interactions", interactionRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
