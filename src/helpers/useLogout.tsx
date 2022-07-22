import { logout } from "@elrondnetwork/dapp-core/utils";
import { setItem } from "storage/session";

export default function useLogout() {
  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setItem("tokenData", null);
    logout("/");
  };
}
