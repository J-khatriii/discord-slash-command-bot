import { Router } from "express";

import verifyDiscordSignature from "../middleware/verifyDiscordSignature.js";
import { InteractionResponseType, InteractionType } from "../constants/discord.js";

const router = Router();

// Discord Interactions Endpoint
// Discord will send POST requests here 

router.post("/", verifyDiscordSignature, (req, res) => {
    const { type } = req.body;

    // Discord PING
    if (type === InteractionType.PING) {
        console.log("Discord PING received");

        return res.status(200).json({
            type: InteractionResponseType.PONG,
        });
    }
    
    console.log("Interaction Received");
    console.log(req.body);

    return res.status(200).json({
        ype: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Interaction received successfully!",
        },
    });
});

export default router;
