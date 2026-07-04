import pool from "../database/db.js";

export const insertInteraction = async (interactionData) => {
  const query = `
    INSERT INTO interactions (
      discord_interaction_id,
      guild_id,
      user_id,
      username,
      command_name,
      status
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    interactionData.discordInteractionId,
    interactionData.guildId,
    interactionData.userId,
    interactionData.username,
    interactionData.commandName,
    interactionData.status,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const findInteractionByDiscordId = async (discordInteractionId) => {
  const query = `
    SELECT *
    FROM interactions
    WHERE discord_interaction_id = $1
    LIMIT 1;
  `;

  const result = await pool.query(query, [discordInteractionId]);

  return result.rows[0] || null;
};

export const getAllInteractions = async () => {
  const query = `
    SELECT
      id,
      username,
      command_name,
      status,
      created_at
    FROM interactions
    ORDER BY created_at DESC;
  `;

  const { rows } = await pool.query(query);

  return rows;
};
