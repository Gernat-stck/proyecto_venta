import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./style/index.css";
import RoutesComp from "./routes/Routes";
import { StrictMode } from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoutesComp />
  </StrictMode>
);
