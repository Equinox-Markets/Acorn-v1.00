import React from "react";

import { Web3ReactProvider } from "@web3-react/core";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from 'styled-components';

import App from "./App";
import connectors from "./connectors";
import { theme } from './styles/theme';

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
     <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);
