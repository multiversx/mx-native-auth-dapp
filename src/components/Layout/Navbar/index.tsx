import React from "react";
import { useGetIsLoggedIn } from "@elrondnetwork/dapp-core/hooks";
import { Navbar as BsNavbar, NavItem, Nav } from "react-bootstrap";
import { ReactComponent as ElrondLogo } from "assets/img/elrond.svg";
import { dAppName } from "config";
import useLogout from "helpers/useLogout";

const Navbar = () => {
  const loggedIn = useGetIsLoggedIn();
  const logout = useLogout();
  return (
    <BsNavbar className="bg-white border-bottom px-4 py-3">
      <div className="container-fluid">
        <NavItem className="d-flex align-items-center">
          <ElrondLogo className="elrond-logo" />
          <span className="dapp-name text-muted">{dAppName}</span>
        </NavItem>

        <Nav className="ml-auto">
          {loggedIn && (
            <NavItem>
              <a href="/" onClick={logout}>
                Close
              </a>
            </NavItem>
          )}
        </Nav>
      </div>
    </BsNavbar>
  );
};

export default Navbar;
