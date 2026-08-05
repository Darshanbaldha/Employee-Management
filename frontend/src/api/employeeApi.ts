import axios from "axios";

// Set base url using axios's create instance.
const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// Automaticlly send token with every request.
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});
export default api;