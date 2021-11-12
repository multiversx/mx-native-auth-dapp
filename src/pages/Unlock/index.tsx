import * as React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { ReactComponent as LedgerSymbol } from "assets/img/ledger-symbol.svg";
import { ReactComponent as MaiarSymbol } from "assets/img/maiar-symbol-blue.svg";
import { ReactComponent as ElrondSymbol } from "assets/img/symbol.svg";
import { routeNames } from "routes";

const Unlock = ({ token }: { token: string }) => {
  const loginParams = {
    callbackRoute: routeNames.dashboard,
    token,
  };

  const webWalletLogin = Dapp.useWebWalletLogin(loginParams);

  const extensionWalletLogin = Dapp.useExtensionLogin(loginParams);

  return (
    <div className="unlock-page">
      <button
        onClick={webWalletLogin}
        disabled={token === ""}
        className="btn btn-unlock btn-block"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="title">
            <ElrondSymbol className="elrond-symbol" />
            Elrond Web Wallet
          </div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </button>
      <Link to={routeNames.walletconnect} className="btn btn-unlock btn-block">
        <div className="d-flex justify-content-between align-items-center">
          <div className="title">
            <MaiarSymbol className="elrond-symbol" height="20" />
            Maiar
          </div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
      <Link to={routeNames.ledger} className="btn btn-unlock btn-block">
        <div className="d-flex justify-content-between align-items-center">
          <div className="title">
            <LedgerSymbol className="elrond-symbol" height="20" />
            Ledger
          </div>
          <FontAwesomeIcon icon={faArrowRight} />
        </div>
      </Link>
      {!window.elrondWallet && (
        <Link
          to={{
            pathname:
              "https://chrome.google.com/webstore/detail/dngmlblcodfobpdpecaadgfbcggfjfnm?authuser=0&hl=en",
          }}
          target="_blank"
          className="btn btn-unlock btn-block"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="title">
              <MaiarSymbol className="elrond-symbol" height="20" />
              Maiar DeFi Wallet
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </Link>
      )}
      {window.elrondWallet && (
        <button
          onClick={extensionWalletLogin}
          disabled={token === ""}
          className="btn btn-unlock btn-block"
        >
          <div className="d-flex justify-content-between align-items-center">
            <div className="title">
              <MaiarSymbol className="elrond-symbol primary" height="20" />
              Maiar DeFi Wallet
            </div>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </button>
      )}
      <div className="mt-spacer">
        <span className="text-secondary">New to Elrdond?</span>
      </div>
      <div className="mt-1">
        <a href="https://wallet.elrond.com/create" {...{ target: "_blank" }}>
          Learn How to setup a wallet
        </a>
      </div>
    </div>
  );
};

export default Unlock;
