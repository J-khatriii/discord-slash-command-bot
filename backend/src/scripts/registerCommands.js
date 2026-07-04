import "dotenv/config";

import { DISCORD_API_BASE_URL, DISCORD_APPLICATION_ID, DISCORD_BOT_TOKEN, DISCORD_GUILD_ID } from "../config/discord.js";

import statusCommand from "../commands/statusCommand.js";
import reportCommand from "../commands/reportCommand.js";

const commands = [statusCommand, reportCommand];

const registerCommands = async () => {
    try {
        const response = await fetch(
            `${DISCORD_API_BASE_URL}/applications/${DISCORD_APPLICATION_ID}/guilds/${DISCORD_GUILD_ID}/commands`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(commands),
                }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(data, null, 2));
        }

        console.log("Slash commands registered successfully!");
        console.log(data);
    } catch (error) {
        console.error(error);
    }
};

console.log(commands);
registerCommands();