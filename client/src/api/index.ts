import axios from "axios";

const $apiMain = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export { $apiMain };
