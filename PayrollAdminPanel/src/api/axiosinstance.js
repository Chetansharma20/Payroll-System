import axios from "axios";
import API_ENDPOINTS from "../config";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINTS.BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
