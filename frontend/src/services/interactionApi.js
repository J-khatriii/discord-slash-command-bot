import api from "./api";

export const getInteractions = async (search = "", page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc") => {
  const response = await api.get("/dashboard/interactions", {
    params: {
      search,
      page,
      limit,
      sortBy,
      sortOrder,
    },
  });

  return response.data;
};
