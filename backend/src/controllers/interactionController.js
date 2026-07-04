import { InteractionType, InteractionResponseType } from "../constants/discord.js";

export const handleInteraction = async (req, res) => {
    const { type, data } = req.body;

    // Discord PING
    if (type === InteractionType.PING) {
        return res.status(200).json({
            type: InteractionResponseType.PONG,
        });
    }

    // Slash Commands
    if (type === InteractionType.APPLICATION_COMMAND) {
        const commandName = data.name;

        console.log(`Slash Command: ${commandName}`);

        if (commandName === "status") {
            return res.status(200).json({
                type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: "Bot is online!",
                },
            });
        }

        return res.status(200).json({
            type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
            data: {
                content: "Unknown command",
            },
        });
    }

    return res.status(400).json({
        error: "Unsupported interaction type",
    });
};
