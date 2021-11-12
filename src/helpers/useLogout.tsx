import * as Dapp from "@elrondnetwork/dapp";
import { setItem } from "storage/local";

export default function useLogout() {
  const logout = Dapp.useLogout();

  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    console.log("logout");
    setItem("tokenData", null);
    logout({ callbackUrl: "/" });
  };
}
