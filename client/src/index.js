import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Auth0ProviderWithNavigate from "./auth0-provider-with-navigate";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
  <BrowserRouter>
    <Auth0ProviderWithNavigate>
      <App />
    </Auth0ProviderWithNavigate>
  </BrowserRouter>
);
