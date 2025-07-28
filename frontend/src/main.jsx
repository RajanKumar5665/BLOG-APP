import React from "react"; // Required when using fragments or JSX
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <React.Fragment>
        <App />
        <Toaster position="top-center" reverseOrder={false} />
      </React.Fragment>
    </AuthProvider>
  </BrowserRouter>
);
