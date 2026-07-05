import pool from "../database/db.js";

export const insertInteraction = async (interactionData) => {
  const query = `
    INSERT INTO interactions (
      discord_interaction_id,
      guild_id,
      user_id,
      username,
      command_name,
      status,
      mirror_status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    interactionData.discordInteractionId,
    interactionData.guildId,
    interactionData.userId,
    interactionData.username,
    interactionData.commandName,
    interactionData.status,
    interactionData.mirrorStatus ?? "not_applicable",
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

export const setMirrorStatus = async (id, status, error = null) => {
  const query = `
    UPDATE interactions
    SET mirror_status = $2, mirror_error = $3
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id, status, error]);

  return result.rows[0] || null;
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

const SORT_COLUMNS = {
  username: "username",
  command: "command_name",
  status: "status",
  createdAt: "created_at",
};

const SORT_ORDERS = {
  asc: "ASC",
  desc: "DESC",
};

export const getAllInteractions = async (search = "", page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
  const offset = (page - 1) * limit;

  const orderColumn = SORT_COLUMNS[sortBy] || "created_at";

  const orderDirection = SORT_ORDERS[sortOrder] || "DESC";

  const dataQuery = `
    SELECT
      id,
      username,
      command_name,
      status,
      mirror_status,
      mirror_error,
      created_at
    FROM interactions
    WHERE
      username ILIKE $1
      OR command_name ILIKE $1
    ORDER BY ${orderColumn} ${orderDirection}
    LIMIT $2
    OFFSET $3;
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM interactions
    WHERE
      username ILIKE $1
      OR command_name ILIKE $1;
  `;

  const [dataResult, countResult] = await Promise.all([
    pool.query(dataQuery, [`%${search}%`, limit, offset]),
    pool.query(countQuery, [`%${search}%`]),
  ]);

  return {
    interactions: dataResult.rows,
    total: Number(countResult.rows[0].total),
  };
};

export const getInteractionStats = async () => {
  const query = `
    SELECT
      COUNT(*) AS total_interactions,
      COUNT(*) FILTER (WHERE command_name = 'report') AS total_reports,
      COUNT(*) FILTER (WHERE command_name = 'status') AS total_status_checks
    FROM interactions;
  `;

  const { rows } = await pool.query(query);

  return rows[0];
};
