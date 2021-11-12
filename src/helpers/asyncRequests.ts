import axios from "axios";

import { network } from "config";
import { getItem } from "storage/local";

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

export const getCurrentBlockHash = async () => {
  try {
    const response = await axios.get(`${network.apiAddress}/blocks?size=1`);
    return { hash: response.data[0].hash, success: true };
  } catch (error) {
    return {
      success: false,
    };
  }
};

export const generateTokenPayload = async (): Promise<string> => {
  const currentBlockHashResponse = await getCurrentBlockHash();
  if (!currentBlockHashResponse?.success) {
    alert("there was an error while the token, please try again");
    return "";
  }
  const { hash } = currentBlockHashResponse;
  return `${window.location.hostname}.${hash}.${tokenTTL}`;
};

function escape(str: string) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function encode(str: string) {
  return escape(Buffer.from(str, "utf8").toString("base64"));
}
