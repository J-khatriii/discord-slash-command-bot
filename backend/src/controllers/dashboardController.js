import { fetchAllInteractions } from "../services/interactionService.js";

export const getInteractions = async (req, res) => {
  try {
    const interactions = await fetchAllInteractions();

    return res.status(200).json(interactions);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
