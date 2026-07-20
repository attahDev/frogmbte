import axios from "axios";

export const api = axios.create({
  baseURL: "https://backgmb.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
