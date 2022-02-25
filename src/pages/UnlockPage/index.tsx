import React from "react";
import { useEffect } from "react";
import { DappUI, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { routeNames } from "routes";
import { getItem } from "storage/session";

const UnlockRoute: () => JSX.Element = () => {
  const {
    ExtensionLoginButton,
    WebWalletLoginButton,
    LedgerLoginButton,
    WalletConnectLoginButton,
  } = DappUI;
  const { isLoggedIn } = useGetLoginInfo();

  const loginParams = {
    token: getItem("loginToken"),
    callbackRoute: routeNames.dashboard,
  };

  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = routeNames.dashboard;
    }
  }, [isLoggedIn]);

  return (
    <div className="home d-flex flex-fill align-items-center">
      <div className="m-auto" data-testid="unlockPage">
        <div className="card my-4 text-center">
          <div className="card-body py-4 px-2 px-sm-2 mx-lg-4">
            <h4 className="mb-4">Login</h4>
            <p className="mb-4">pick a login method</p>

            <ExtensionLoginButton
              loginButtonText="Extension"
              {...loginParams}
            />

            <WebWalletLoginButton
              loginButtonText="Web wallet"
              {...loginParams}
            />
            <LedgerLoginButton
              loginButtonText="Ledger"
              className="test-class_name"
              {...loginParams}
            />
            <WalletConnectLoginButton
              loginButtonText="Maiar"
              {...loginParams}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnlockRoute;
