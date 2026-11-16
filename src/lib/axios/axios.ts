import axios from "axios";

const api = axios.create({
  baseURL: "https://6af97d466d8b86fb22d7091d.mockapi.io",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;