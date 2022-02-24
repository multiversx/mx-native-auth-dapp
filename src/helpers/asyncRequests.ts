import axios from "axios";

import { network } from "config";
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

// curl 'http://localhost:3000/auth' \
// -H 'Connection: keep-alive' \
// -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"' \
// -H 'Accept: application/json, text/plain, */*' \
// -H 'Authorization: Bearer ZXJkMTY1MG5jbnFha2c0Z3dqaHlhbHhmMmd0MzUwYWN3eWg3YXJubXQycmZudjlmejYzeGtsdnN3ZnF1azc.bG9jYWxob3N0LjE2YjBkMDljZjU2YWFiNTNmZjFjNzFmZjllMzY1YTkwZjVlYzI2ZjIxMTEzZTQ1NGQ3ODI2OTRiZjEwMDhhNDMuNzIwMA.6207ece629f75cd5255c5e7b6ae9c4713b893d3aa37b3247eb2bf7003f21cdff1b7e8dafbc504eead1237a7562af6f3f58a2075e120acf7cace3786756e8fa03' \
// -H 'sec-ch-ua-mobile: ?0' \
// -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36' \
// -H 'sec-ch-ua-platform: "macOS"' \
// -H 'Origin: http://localhost:3001' \
// -H 'Sec-Fetch-Site: same-site' \
// -H 'Sec-Fetch-Mode: cors' \
// -H 'Sec-Fetch-Dest: empty' \
// -H 'Referer: http://localhost:3001/' \
// -H 'Accept-Language: en-US,en;q=0.9' \
// --compressed

// curl 'http://localhost:3000/auth' \
//   -H 'Connection: keep-alive' \
//   -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"' \
//   -H 'Accept: application/json, text/plain, */*' \
//   -H 'Authorization: Bearer ZXJkMTY1MG5jbnFha2c0Z3dqaHlhbHhmMmd0MzUwYWN3eWg3YXJubXQycmZudjlmejYzeGtsdnN3ZnF1azc.bG9jYWxob3N0LmQxNWNjOTlkYTE5YTYzY2JhNGJiODljZmZmYzMxNTViZjM4NGU0YWVkYmJjZmVkYzI2ODdhNTdiMjRhM2YwNzguNzIwMA.6207ece629f75cd5255c5e7b6ae9c4713b893d3aa37b3247eb2bf7003f21cdff1b7e8dafbc504eead1237a7562af6f3f58a2075e120acf7cace3786756e8fa03' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   -H 'Origin: http://localhost:3001' \
//   -H 'Sec-Fetch-Site: same-site' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Referer: http://localhost:3001/' \
//   -H 'Accept-Language: en-US,en;q=0.9' \
//   -H 'If-None-Match: W/"8f-p7/VS1dheuXVa50RoQEAFqLRZpU"' \
//   --compressed

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
