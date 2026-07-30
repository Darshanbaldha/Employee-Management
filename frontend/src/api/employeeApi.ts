import dotenv from "dotenv"
dotenv.config();
import axios from "axios";

// Set base url using axios's create instance.
const api = axios.create({
    baseURL: process.env.BASE_URL,
});

export default api;