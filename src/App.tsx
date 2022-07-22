import React from "react";
import {
  TransactionsToastList,
  SignTransactionsModals,
  NotificationModal,
} from "@elrondnetwork/dapp-core/UI";
import { DappProvider } from "@elrondnetwork/dapp-core/wrappers";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Unlock from "pages/Unlock";
import Layout from "./components/Layout";
import PageNotFound from "./components/PageNotFoud";
import { ContextProvider } from "./context";
import { generateTokenPayload } from "./helpers/asyncRequests";
import routes, { routeNames } from "./routes";

const environment = "devnet";

export default function App() {
  const [token, setToken] = React.useState("");

  const getTokenToSign = async () => {
    const tokenToSign = await generateTokenPayload();
    setToken(tokenToSign);
  };

  React.useEffect(() => {
    getTokenToSign();
  }, []);
  return (
    <Router>
      <ContextProvider>
        <DappProvider
          environment={environment}
          customNetworkConfig={{ name: "customConfig", apiTimeout: 6000 }}
        >
          <Layout>
            <TransactionsToastList />
            <NotificationModal />
            <SignTransactionsModals className="custom-class-for-modals" />
            <Routes>
              <Route
                path={routeNames.unlock}
                element={<Unlock token={token} />}
              />
              {routes.map((route: any, index: number) => (
                <Route
                  path={route.path}
                  key={"route-key-" + index}
                  element={<route.component />}
                />
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </DappProvider>
      </ContextProvider>
    </Router>
  );
}
