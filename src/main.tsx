"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./main.css";
import { ErrorBoundary } from "react-error-boundary";
import FallBackPage from "./pages/FallBackPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={FallBackPage}>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
);
