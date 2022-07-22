import axios from "axios";

import { getItem } from "storage/session";

export const tokenTTL = 60 * 60 * 2;

const routesWithAuthentication = ["localhost"];

axios.interceptors.request.use(function (config) {
  const tokenData = getItem("tokenData");
  const requiresAuthentication = routesWithAuthentication.some((route) =>
    config?.url?.includes(route),
  );
  if (requiresAuthentication) {
    config.headers.Authorization = tokenData
      ? `Bearer ${tokenData.accessToken}`
      : "";
  }
  return config;
});

function escape(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function encode(str: string) {
  return escape(Buffer.from(str, "utf8").toString("base64"));
}
