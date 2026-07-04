import express from "express";
import "dotenv/config";

import interactionRoutes from "./routes/interactionRoutes.js";

const app = express();


// Middleware
app.use(express.json({
    verify: (req, res, buffer) => {
        req.rawBody = buffer;
    },
}));

// Routes
app.get("/", (req, res) => res.send("Server is running"));

app.use("/interactions", interactionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
