import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./chooser.css";
import { Chooser } from "./Chooser";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Chooser />
  </StrictMode>,
);
