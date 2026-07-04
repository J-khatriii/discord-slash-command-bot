import { insertInteraction, findInteractionByDiscordId, getAllInteractions } from "../repositories/interactionRepository.js";

export const saveInteraction = async (interaction) => {
  const existing = await findInteractionByDiscordId(interaction.id);

  if (existing) {
    return {
      duplicate: true,
      interaction: existing,
    };
  }

  const interactionData = {
    discordInteractionId: interaction.id,
    guildId: interaction.guild_id,
    userId: interaction.member.user.id,
    username: interaction.member.user.username,
    commandName: interaction.data.name,
    status: "processed",
  };

  const saved = await insertInteraction(interactionData);

  return {
    duplicate: false,
    interaction: saved,
  };
};

export const fetchAllInteractions = async () => {
  return await getAllInteractions();
};
