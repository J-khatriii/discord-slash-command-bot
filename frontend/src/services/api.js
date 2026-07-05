import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export const getInteractions = async (search = "") => {
    const response = await api.get("/dashboard/interactions", {
        params: {
            search,
        },
    });
    
    return response.data.data;
};

export default api;
