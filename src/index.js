import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";

import "./auth";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
);
