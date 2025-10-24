import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // 包含 Tailwind CSS 的样式

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
