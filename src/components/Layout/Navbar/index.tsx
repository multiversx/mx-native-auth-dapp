import React from "react";
import { logout, useGetAccountInfo } from "@elrondnetwork/dapp-core";
import { Navbar as BsNavbar, NavItem, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { dAppName } from "config";
import { routeNames } from "routes";

import { setItem as setItemLocal } from "storage/local";
import { setItem } from "storage/session";
import { ReactComponent as ElrondLogo } from "./../../../assets/img/elrond.svg";

const Navbar = () => {
  const { address } = useGetAccountInfo();

  const handleLogout = () => {
    setItem("loginToken", null);
    setItemLocal("tokenData", null);
    logout();
  };

  const isLoggedIn = Boolean(address);

  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <Link
          className="d-flex align-items-center navbar-brand mr-0"
          to={isLoggedIn ? routeNames.dashboard : routeNames.home}
        >
          <ElrondLogo className="elrond-logo" />
          <span className="dapp-name text-muted">{dAppName}</span>
        </Link>

        <Nav className="ml-auto">
          {isLoggedIn && (
            <NavItem>
              <button className="btn btn-link" onClick={handleLogout}>
                Close
              </button>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
