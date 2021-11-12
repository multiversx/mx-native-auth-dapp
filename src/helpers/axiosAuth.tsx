import axios, { AxiosInstance } from "axios";
import { getItem } from "storage/session";

export default function axiosAuth(): AxiosInstance {
  const instance = axios.create();

  instance.interceptors.request.use(function (config) {
    const tokenData = getItem("tokenData");
    config.headers.Authorization = tokenData
      ? `Bearer ${tokenData.accessToken}`
      : "";
    return config;
  });

  return instance;
}
