import api from "./api.js";

export const getStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data.data;
};
