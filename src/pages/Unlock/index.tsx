import * as React from "react";
import { ExtensionLoginButton } from "@elrondnetwork/dapp-core/UI/extension/ExtensionLoginButton";
import { LedgerLoginButton } from "@elrondnetwork/dapp-core/UI/ledger/LedgerLoginButton";
import { WalletConnectLoginButton } from "@elrondnetwork/dapp-core/UI/walletConnect/WalletConnectLoginButton";
import { WebWalletLoginButton } from "@elrondnetwork/dapp-core/UI/webWallet/WebWalletLoginButton";
import { routeNames } from "routes";

const Unlock = ({ token }: { token: string }) => {
  return (
    <div className="home d-flex flex-fill align-items-center">
      <div className="m-auto" data-testid="unlockPage">
        <div className="card my-4 text-center">
          <div className="card-body py-4 px-2 px-sm-2 mx-lg-4">
            <h4 className="mb-4">Login</h4>
            <p className="mb-4">pick a login method</p>

            <ExtensionLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={"Extension"}
              disabled={token === ""}
            />
            <WebWalletLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={"Web wallet"}
              disabled={token === ""}
            />
            <LedgerLoginButton
              loginButtonText={"Ledger"}
              callbackRoute={routeNames.dashboard}
              className={"test-class_name"}
            />
            <WalletConnectLoginButton
              callbackRoute={routeNames.dashboard}
              loginButtonText={"Maiar"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unlock;
