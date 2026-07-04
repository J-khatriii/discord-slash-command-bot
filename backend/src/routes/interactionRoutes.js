import { Router } from "express";

import verifyDiscordSignature from "../middleware/verifyDiscordSignature.js";

import { InteractionResponseType, InteractionType } from "../constants/discord.js";
import { handleInteraction } from "../controllers/interactionController.js";

const router = Router();

// Discord Interactions Endpoint
// Discord will send POST requests here 

router.post("/", verifyDiscordSignature, handleInteraction);

export default router;
