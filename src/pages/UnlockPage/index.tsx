import React from "react";
import { useEffect } from "react";
import { DappUI, useGetLoginInfo } from "@elrondnetwork/dapp-core";
import { routeNames } from "routes";
import { getItem } from "storage/session";

import "./unlock.scss";

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
    const storage = localStorage.getItem("persist:dapp-core-store") || "";
    const stored = Boolean(JSON.parse(JSON.parse(storage).account).address);

    if (isLoggedIn || stored) {
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

            <div className="extension d-inline-block btn-primary">
              <ExtensionLoginButton
                loginButtonText="Extension"
                {...loginParams}
              />
            </div>

            <WebWalletLoginButton
              loginButtonText="Web wallet"
              {...loginParams}
            />

            <LedgerLoginButton
              loginButtonText="Ledger"
              buttonClassName="test-class_name"
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
