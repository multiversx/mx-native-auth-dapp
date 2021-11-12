import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { useLocation } from "react-router-dom";
import { encode, tokenTTL } from "helpers/asyncRequests";
import { setItem } from "storage/local";

export default function useManageAccessToken() {
  const { loggedIn, tokenLogin } = Dapp.useContext();

  const { search } = useLocation();

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams as any);
    const { signature, loginToken, address } = params;
    const hasLoginParams = Boolean(signature && loginToken && address);
    if (loggedIn && hasLoginParams) {
      const encodedAddress = encode(address);
      const encodedToken = encode(loginToken);
      const accessToken = `${encodedAddress}.${encodedToken}.${signature}`;
      console.log(accessToken, loginToken);
      setItem("tokenData", { accessToken }, tokenTTL);
    }
  }, [loggedIn, tokenLogin]);
}
