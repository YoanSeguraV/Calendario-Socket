import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ServiceContextProvider } from "./context/Contexto.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ServiceContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServiceContextProvider>
);
