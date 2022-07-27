import { logout } from "@elrondnetwork/dapp-core/utils/logout";
import { setItem } from "storage/session";

export default function useLogout() {
  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    setItem("tokenData", null);
    logout(`${window.location.origin}/unlock`);
  };
}
