import { Router } from "express";

import { getInteractions, getStats } from "../controllers/dashboardController.js";

const router = Router();

router.get("/interactions", getInteractions);
router.get("/stats", getStats);

export default router;
