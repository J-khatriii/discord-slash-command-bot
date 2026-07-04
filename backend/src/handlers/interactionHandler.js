import { InteractionType } from "../constants/discord.js";

import statusHandler from "./statusHandler.js";
import reportHandler from "./reportHandler.js";

import { saveInteraction } from "../services/interactionService.js";

const interactionHandler = async (req, res) => {
  const interaction = req.body;

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return res.status(400).json({
      error: "Unsupported interaction type.",
    });
  }

  // Save the interaction first
  // await saveInteraction(interaction);

  const result = await saveInteraction(interaction);

  if (result.duplicate) {
    console.log(
      `Duplicate interaction ignored: ${interaction.id}`
    );
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
