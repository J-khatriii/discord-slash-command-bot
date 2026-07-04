import express from "express";
import "dotenv/config";
import cors from "cors";

import interactionRoutes from "./routes/interactionRoutes.js";
import dashboardRoutes from "./routes/dashboard.js";

const app = express();

app.use(cors());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
