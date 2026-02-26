import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 10000,
});

axiosClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};
    config.headers.Accept = "application/json";
    return config;
  },
  (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || error?.message || "Request failed";
    return Promise.reject(new Error(message));
  },
);

export default axiosClient;