import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./app.tsx";

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
