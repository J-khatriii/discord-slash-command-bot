import { Router } from "express";

import authenticate from "../middleware/authenticate.js";

import { getInteractions, getStats, getCommandSettings, updateCommandSetting } from "../controllers/dashboardController.js";

const router = Router();

router.use(authenticate);

router.get("/interactions", getInteractions);
router.get("/stats", getStats);

router.get("/config", getCommandSettings);
router.put("/config/:command", updateCommandSetting);

export default router;
