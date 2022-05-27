import { useEffect } from "react";

import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { NativeAuthClient } from "@elrondnetwork/native-auth";
import { useLocation } from "react-router-dom";
import { tokenTTL } from "helpers/asyncRequests";
import { setItem } from "storage/local";
import { getItem } from "storage/session";

export default function useManageAccessToken() {
  const account = useGetAccountInfo();
  const { search } = useLocation();

  useEffect(() => {
    const nativeClient = new NativeAuthClient();
    const loginToken = getItem("loginToken");
    const urlSearchParams = new URLSearchParams(search);

    const params = Object.fromEntries(urlSearchParams as any);
    const { signature, address } = params;
    const hasLoginParams = Boolean(signature && loginToken && address);

    if (Boolean(account.address) && hasLoginParams) {
      const accessToken = nativeClient.getToken(address, loginToken, signature);

      setItem("tokenData", { accessToken }, tokenTTL);
    }
  }, [account.address, search]);
}
