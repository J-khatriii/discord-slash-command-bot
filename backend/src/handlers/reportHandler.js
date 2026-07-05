import { InteractionResponseType } from "../constants/discord.js";

const reportHandler = (interaction) => {
  const reportText = interaction.data?.options?.[0]?.value;

  if (!reportText) {
    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: "No report text was provided.",
      },
    };
  }

  return {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Report received: ${reportText}`,
    },
  };
};

export default reportHandler;
