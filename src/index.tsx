import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";



const { chains, provider } = configureChains(
  [polygonMumbai, polygon, optimism, arbitrum],
  [
    // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});



const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <WagmiConfig client={wagmiClient}>
    <RainbowKitProvider chains={chains}>
      <ChakraProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChakraProvider>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
