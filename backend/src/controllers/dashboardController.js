import { fetchAllInteractions } from "../services/interactionService.js";

export const getInteractions = async (req, res) => {
  try {
    const interactions = await fetchAllInteractions();

    return res.status(200).json({
      success: true,
      data: interactions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
