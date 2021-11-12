import * as Dapp from "@elrondnetwork/dapp";
import { setItem } from "storage/session";

export default function useLogout() {
  const logout = Dapp.useLogout();

  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setItem("tokenData", null);
    logout({ callbackUrl: "/" });
  };
}
