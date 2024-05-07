import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Styles
import "./index.css";

// Routes
import { Routes } from "./routes";

import { ContextProvider } from "./contexts";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
