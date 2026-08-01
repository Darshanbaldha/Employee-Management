import axios from "axios";

// Set base url using axios's create instance.
const api = axios.create({
    baseURL: "http://localhost:3000/employee",
});

export default api;