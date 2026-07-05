import {
  insertInteraction,
  findInteractionByDiscordId,
  getAllInteractions,
  getInteractionStats,
  setMirrorStatus,
} from "../repositories/interactionRepository.js";

const MIRRORED_COMMANDS = new Set(["report"]);

export const saveInteraction = async (interaction) => {
  const existing = await findInteractionByDiscordId(interaction.id);

  if (existing) {
    return {
      duplicate: true,
      interaction: existing,
    };
  }

  const willMirror = MIRRORED_COMMANDS.has(interaction.data.name);

  const interactionData = {
    discordInteractionId: interaction.id,
    guildId: interaction.guild_id,
    userId: interaction.member.user.id,
    username: interaction.member.user.username,
    commandName: interaction.data.name,
    status: "processed",
    mirrorStatus: willMirror ? "pending" : "not_applicable",
  };

  const saved = await insertInteraction(interactionData);

  return {
    duplicate: false,
    interaction: saved,
  };
};

export const markMirrored = async (interactionId) => {
  return setMirrorStatus(interactionId, "sent");
};

export const markMirrorFailed = async (interactionId, errorMessage) => {
  return setMirrorStatus(interactionId, "failed", errorMessage?.slice(0, 500) ?? "unknown error");
};

export const fetchAllInteractions = async (search = "", page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
  const result = await getAllInteractions(search, page, limit, sortBy, sortOrder);

  const interactions = result.interactions.map((interaction) => ({
    id: interaction.id,
    username: interaction.username,
    commandName: interaction.command_name,
    status: interaction.status,
    mirrorStatus: interaction.mirror_status,
    mirrorError: interaction.mirror_error,
    createdAt: interaction.created_at,
  }));

  return {
    interactions,
    total: result.total,
  };
};

export const fetchInteractionStats = async () => {
  const stats = await getInteractionStats();

  return {
    totalInteractions: Number(stats.total_interactions),
    totalReports: Number(stats.total_reports),
    totalStatusChecks: Number(stats.total_status_checks),
  };
};
