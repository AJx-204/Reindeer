import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from "./Context/Themecontext.jsx";
import { CurrencyProvider } from "./Context/Currencycontext.jsx";
import { WalletProvider } from "./Context/Walletcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <WalletProvider>
        <CurrencyProvider>
         <App />
       </CurrencyProvider>
     </WalletProvider>
    </ThemeProvider>
  </BrowserRouter>
);
