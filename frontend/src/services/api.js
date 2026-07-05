import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");

      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export const getInteractions = async (search = "") => {
  const response = await api.get("/dashboard/interactions", {
    params: { search },
  });

  return response.data.data;
};

export default api;
