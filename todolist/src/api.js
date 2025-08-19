import axios from "axios";

const API = axios.create({
  baseURL: "https://todolist-1-zbap.onrender.com/api", // Correct Render backend URL
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
