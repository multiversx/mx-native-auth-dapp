import React from "react";
import * as Dapp from "@elrondnetwork/dapp";
import routes, { routeNames } from "routes";
import Footer from "./Footer";
import Navbar from "./Navbar";
import useManageAccessToken from "./useManageAccessToken";

const Layout = ({ children }: { children: React.ReactNode }) => {
  useManageAccessToken();
  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <Navbar />
      <main className="d-flex flex-column flex-grow-1">
        <Dapp.Authenticate routes={routes} unlockRoute={routeNames.unlock}>
          {children}
        </Dapp.Authenticate>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
