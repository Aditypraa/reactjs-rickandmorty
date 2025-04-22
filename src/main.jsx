import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import Bootstrap CSS and JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Add Font Awesome icons
const script = document.createElement("script");
script.src = "https://kit.fontawesome.com/9ded4adcf1.js";
script.crossOrigin = "anonymous";
document.head.appendChild(script);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
