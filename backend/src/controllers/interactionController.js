import interactionHandler from "../handlers/interactionHandler.js";

export const handleInteraction = async (req, res) => {
    return interactionHandler(req, res);
};
