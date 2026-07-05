import { Router } from "express";

import { getInteractions, getStats } from "../controllers/dashboardController.js";
import authenticate from "../middleware/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/interactions", getInteractions);
router.get("/stats", getStats);

export default router;
