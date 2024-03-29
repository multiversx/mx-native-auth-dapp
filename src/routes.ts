import React from "react";
import { RouteType } from "@elrondnetwork/dapp-core/types";
import withPageTitle from "./components/PageTitle";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";

type DAppRouteType = RouteType & { title: string };

export const routeNames = {
  home: "/",
  dashboard: "/dashboard",
  transaction: "/transaction",
  unlock: "/unlock",
};

const routes: DAppRouteType[] = [
  {
    path: "/",
    title: "Home",
    component: Home,
  },
  {
    path: "/dashboard",
    title: "Dashboard",
    component: Dashboard,
    authenticatedRoute: true,
  },

  {
    path: "/transaction",
    title: "Transaction",
    component: Transaction,
    authenticatedRoute: true,
  },
];

const wrappedRoutes = () =>
  routes.map((route) => {
    const title = route.title ? `${route.title} • Elrond Dapp` : "Elrond Dapp";
    return {
      path: route.path,
      authenticatedRoute: Boolean(route.authenticatedRoute),
      component: withPageTitle(
        title,
        route.component,
      ) as any as React.ComponentClass<any, any>,
    };
  });

export default wrappedRoutes();
