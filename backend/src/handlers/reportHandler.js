import { InteractionResponseType } from "../constants/discord.js";

const reportHandler = (interaction) => {
    const reportText = interaction.data.options[0].value;

    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: `Report received: ${reportText}`,
        },
    };
};

export default reportHandler;
