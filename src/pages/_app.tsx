import "@/styles/globals.css";
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ThemeProvider } from "@/components/themes";
import { ethereum, ethers } from "ethers";
import React, { useState } from "react";
import "./app.css";
import type { AppProps } from "next/app";



const { createConfig, getDefaultConfig, Chains, http } = require('@metamask/alchemy-superficial');

// Define chain IDs
const { mainnet, ropsten } = Chains;


      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
      [ropsten.id]: http(
        `https://eth-ropsten.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ROPSTEN}`,
      ),

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, linea-testnet],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_MAINNET}`,
      ),
      [linea-testnet.id]: http(
        `https://eth-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_GOERIL}`,
      ),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',

    // Required App Info
    appName: "Crypto Portfolio",

    // Optional App Info
    appDescription: "A great app for managing your portfolio",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const ethers = require("ethers");
  const API_KEY = process.env.REACT_APP_API_KEY;
  const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;
  const provider_Metamask = new ethers.providers.Web3Provider(window.ethereum);
  const infuraProvider = new ethers.providers.InfuraProvider(
    "linea goerli",
    API_KEY,
  );
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
        <ThemeProvider
          
          
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
        <Component {...pageProps} />;
        </ThemeProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}