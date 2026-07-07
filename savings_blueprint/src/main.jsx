import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log(
  "Google Client ID:",
  import.meta.env.VITE_GOOGLE_CLIENT_ID
);console.log(
  "Facebook App ID:",
  import.meta.env
    .VITE_FACEBOOK_APP_ID
);
ReactDOM.createRoot(document.getElementById("root")).render(
 
  
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <App />
      
    </BrowserRouter>
    </GoogleOAuthProvider>
  
    
);