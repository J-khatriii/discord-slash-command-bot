import { fetchAllInteractions, fetchInteractionStats } from "../services/interactionService.js";

import { getCommandConfig, setCommandEnabled } from "../config/commandConfig.js";

export const getInteractions = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";

    const result = await fetchAllInteractions(
      search,
      page,
      limit,
      sortBy,
      sortOrder
    );

    return res.status(200).json({
      success: true,
      data: result.interactions,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getStats = async (req, res) => {
  try {
    const stats = await fetchInteractionStats();

    return res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getCommandSettings = (req, res) => {
  return res.json({
    success: true,
    data: getCommandConfig(),
  });
};

export const updateCommandSetting = (req, res) => {
  const { command } = req.params;
  const { enabled } = req.body;

  setCommandEnabled(command, enabled);

  return res.json({
    success: true,
    message: "Configuration updated",
  });
};
