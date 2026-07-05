import { InteractionType, InteractionResponseType } from "../constants/discord.js";

import statusHandler from "./statusHandler.js";
import reportHandler from "./reportHandler.js";

import { saveInteraction, markMirrored, markMirrorFailed } from "../services/interactionService.js";
import { sendMirrorNotification } from "../services/mirrorService.js";

const MIRRORED_COMMANDS = new Set(["report"]);

const buildResponse = (interaction) => {
  switch (interaction.data.name) {
    case "status":
      return statusHandler(interaction);
    case "report":
      return reportHandler(interaction);
    default:
      return {
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "Unknown command." },
      };
  }
};

const interactionHandler = async (req, res) => {
  const interaction = req.body;

  if (interaction.type === InteractionType.PING) {
    return res.json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type !== InteractionType.APPLICATION_COMMAND) {
    return res.status(400).json({ error: "Unsupported interaction type." });
  }

  try {
    const { duplicate, interaction: record } = await saveInteraction(interaction);

    if (duplicate) {
      console.log(`Duplicate interaction ignored (no side effects re-run): ${interaction.id}`);
      return res.json(buildResponse(interaction));
    }

    const response = buildResponse(interaction);
    res.json(response);

    if (MIRRORED_COMMANDS.has(interaction.data.name)) {
      sendMirrorNotification({
        username: interaction.member?.user?.username ?? "unknown",
        commandName: interaction.data.name,
        content: response?.data?.content ?? "",
      })
        .then(() => markMirrored(record.id))
        .catch((err) => {
          console.error(`Mirror notification failed for interaction ${interaction.id}:`, err);
          markMirrorFailed(record.id, err.message).catch(() => {});
        });
    }

    return;
  } catch (error) {
    console.error(`Failed to handle interaction ${interaction?.id}:`, error);

    if (!res.headersSent) {
      return res.json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: { content: "Something went wrong handling that command. Please try again." },
      });
    }
  }
};

export default interactionHandler;
