import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./assets/sass/theme.scss";

let MountedApp = (
  <Router>
    <App />
  </Router>
);
if (process.env.NODE_ENV === "development") {
  MountedApp = (
    <Router>
      <App />
    </Router>
  );
}

ReactDOM.render(MountedApp, document.getElementById("root"));
