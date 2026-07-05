import { DISCORD_APPLICATION_ID, DISCORD_BOT_TOKEN, DISCORD_API_BASE_URL } from "../config/discord.js";

export const registerGlobalCommands = async (commands) => {
  const response = await fetch(
    `${DISCORD_API_BASE_URL}/applications/${DISCORD_APPLICATION_ID}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commands),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register slash commands.");
  }

  return response.json();
};

export const editOriginalResponse = async (applicationId, interactionToken, data) => {
  const response = await fetch(
    `${DISCORD_API_BASE_URL}/webhooks/${applicationId}/${interactionToken}/messages/@original`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to edit original interaction response: ${response.status}`);
  }

  return response.json();
};
