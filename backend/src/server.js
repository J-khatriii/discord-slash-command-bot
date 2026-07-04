import express from "express";
import "dotenv/config";

import intersectionRoutes from "./routes/intersectionRoutes.js";

const app = express();

app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Server is running"));

app.use("/intersections", intersectionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
