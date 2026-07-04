import { Router } from "express";

import { getInteractions } from "../controllers/dashboardController.js";

const router = Router();

router.get("/interactions", getInteractions);

export default router;
