import { InteractionType } from "../constants/discord.js";

import statusHandler from "./statusHandler.js";
import reportHandler from "./reportHandler.js";

const interactionHandler = (req, res) => {
  const interaction = req.body;

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return res.status(400).json({
      error: "Unsupported interaction type.",
    });
  }

  let response;

  switch (interaction.data.name) {
    case "status":
        response = statusHandler(interaction);
        break;

    case "report":
        response = reportHandler(interaction);
        break;

    default:
      response = {
        type: 4,
        data: {
          content: "Unknown command.",
        },
      };
  }

  return res.json(response);
};

export default interactionHandler;
