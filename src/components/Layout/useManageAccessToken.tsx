import * as React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks/account/useGetAccountInfo";
import { useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account/useGetLoginInfo";
import { encode, tokenTTL } from "helpers/asyncRequests";
import { setItem } from "storage/session";

export default function useManageAccessToken() {
  const { tokenLogin, isLoggedIn } = useGetLoginInfo();
  const {
    account: { address },
  } = useGetAccountInfo();

  React.useEffect(() => {
    if (!tokenLogin) {
      return;
    }

    const { signature, loginToken } = tokenLogin;
    const hasLoginParams = Boolean(signature && loginToken && address);
    if (isLoggedIn && hasLoginParams) {
      const encodedAddress = encode(address);
      const encodedToken = encode(loginToken);
      const accessToken = `${encodedAddress}.${encodedToken}.${signature}`;
      setItem("tokenData", { accessToken }, tokenTTL);
    }
  }, [isLoggedIn, tokenLogin]);
}
