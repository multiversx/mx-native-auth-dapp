import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import { Route, Switch } from "react-router-dom";
import Unlock from "pages/Unlock";

import { setItem, getItem } from "storage/session";
import Layout from "./components/Layout";
import PageNotFoud from "./components/PageNotFoud";
import * as config from "./config";
import { ContextProvider } from "./context";
import { generateTokenPayload } from "./helpers/asyncRequests";
import routes, { routeNames } from "./routes";

export default function App() {
  const [token, setToken] = React.useState("");

  const getTokenToSign = async () => {
    const tokenToSign = await generateTokenPayload();
    setToken(tokenToSign);

    if (!getItem("loginToken")) {
      setItem("loginToken", tokenToSign);
    }
  };

  React.useEffect(() => {
    getTokenToSign();
  }, []);

  return (
    <ContextProvider>
      <Dapp.Context config={config}>
        <Layout>
          <Switch>
            <Route
              path={routeNames.unlock}
              component={() => <Unlock token={token} />}
              exact={true}
            />
            <Route
              path={routeNames.ledger}
              component={() => (
                <Dapp.Pages.Ledger callbackRoute={routeNames.dashboard} />
              )}
              exact={true}
            />
            <Route
              path={routeNames.walletconnect}
              component={() => (
                <Dapp.Pages.WalletConnect
                  callbackRoute={routeNames.dashboard}
                  logoutRoute={routeNames.home}
                  title="Maiar Login"
                  lead="Scan the QR code using Maiar"
                  token={token}
                />
              )}
              exact={true}
            />

            {routes.map((route, i) => (
              <Route
                path={route.path}
                key={route.path + i}
                component={route.component}
                exact={true}
              />
            ))}
            <Route component={PageNotFoud} />
          </Switch>
        </Layout>
      </Dapp.Context>
    </ContextProvider>
  );
}
