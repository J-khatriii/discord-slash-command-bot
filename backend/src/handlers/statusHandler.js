import { InteractionResponseType } from "../constants/discord.js";

const statusHandler = () => {
    return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
            content: "Bot is online!",
        },
    };
};

export default statusHandler;
