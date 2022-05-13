import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { UserStorage } from "./context";

ReactDOM.render(
  <BrowserRouter>
    <UserStorage>
      <App />
    </UserStorage>
  </BrowserRouter>,
  document.getElementById("root")
);
