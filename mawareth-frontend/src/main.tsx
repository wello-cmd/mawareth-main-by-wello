import React from "react"; // Import React library for component creation
import { createRoot } from "react-dom/client"; // Import createRoot to initialize the React application
import App from "./App.tsx"; // Import the main App component
import "./index.css"; // Import global CSS styles

const rootElement = document.getElementById("root"); // Get the DOM element with id 'root' to mount the app
if (!rootElement) throw new Error("Failed to find the root element"); // Check if root element exists, error if not

createRoot(rootElement).render( // Create a React root and render the app structure
  <React.StrictMode> {/* Enable strict mode for highlighting potential problems */}
    <App /> {/* Render the main App component */}
  </React.StrictMode>
);
