import { useEffect } from "react";

import { useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { useLocation } from "react-router-dom";
import { encode, tokenTTL } from "helpers/asyncRequests";
import { getItem, setItem } from "storage/session";

export default function useManageAccessToken() {
  const account = useGetAccountInfo();
  const { search } = useLocation();

  useEffect(() => {
    const loginToken = getItem("loginToken");
    const urlSearchParams = new URLSearchParams(search);

    const params = Object.fromEntries(urlSearchParams as any);
    const { signature, address } = params;
    const hasLoginParams = Boolean(signature && loginToken && address);

    if (Boolean(account.address) && hasLoginParams) {
      const encodedAddress = encode(address);
      const encodedToken = encode(loginToken);
      const accessToken = `${encodedAddress}.${encodedToken}.${signature}`;

      setItem("tokenData", { accessToken }, tokenTTL);
    }
  }, [account.address, search]);
}
