import api from "./api";

export const getCommandConfig = async () => {
  const response = await api.get("/dashboard/config");

  return response.data.data;
};

export const updateCommandConfig = async (command, enabled) => {
  const response = await api.put(`/dashboard/config/${command}`, {
    enabled,
  });

  return response.data;
};
