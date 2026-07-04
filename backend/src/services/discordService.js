import { APPLICATION_ID, BOT_TOKEN, DISCORD_API_BASE_URL } from "../config/discord";

export const registerGlobalCommands = async (commands) => {
  const response = await fetch(
    `${DISCORD_API_BASE_URL}/applications/${APPLICATION_ID}/commands`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
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
