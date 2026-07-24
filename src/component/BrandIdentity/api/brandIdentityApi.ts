import axios from "axios";

const BASE = "https://gmbtebac-1.onrender.com".replace(/\/+$/, "");

export const brandIdentityApi = axios.create({
  baseURL: BASE,
  withCredentials: true,
});

brandIdentityApi.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token =
      sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
