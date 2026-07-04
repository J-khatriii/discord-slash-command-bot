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

  switch (interaction.data.name) {
    case "status":
      return statusHandler(req, res);

    case "report":
      return reportHandler(req, res);

    default:
      return res.json({
        type: 4,
        data: {
          content: "Unknown command.",
        },
      });
  }
};

export default interactionHandler;
