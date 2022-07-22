import { setItem } from "storage/session";
import { logout } from "@elrondnetwork/dapp-core/utils";

export default function useLogout() {

  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setItem("tokenData", null);
    logout("/");
  };
}
