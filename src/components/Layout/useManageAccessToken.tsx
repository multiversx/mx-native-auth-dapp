import * as React from "react";
import { useGetAccountInfo } from "@elrondnetwork/dapp-core/hooks/account/useGetAccountInfo";
import { useGetLoginInfo } from "@elrondnetwork/dapp-core/hooks/account/useGetLoginInfo";
import { NativeAuthClient } from "@elrondnetwork/native-auth";
import { tokenTTL } from "helpers/asyncRequests";
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
      const client = new NativeAuthClient();
      const accessToken = client.getToken(address, loginToken, signature ?? "");
      setItem("tokenData", { accessToken }, tokenTTL);
    }
  }, [isLoggedIn, tokenLogin]);
}
