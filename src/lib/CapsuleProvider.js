'use client';
import React from "react";
import { capsuleConnector } from "@usecapsule/wagmi-v2-integration";
import { OAuthMethod } from "@usecapsule/web-sdk"; 
import { createConfig, WagmiProvider, useConnect } from "wagmi";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains"; 
import { capsuleClient } from "./capsule";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const connector = capsuleConnector({
  capsule: capsuleClient,
  chains: [sepolia],
  appName: "Blockchain HQ",
  options: {},
  nameOverride: "Capsule",
  idOverride: "capsule",
  oAuthMethods: [OAuthMethod.GOOGLE, OAuthMethod.TWITTER, OAuthMethod.FACEBOOK, OAuthMethod.DISCORD, OAuthMethod.APPLE],
  disableEmailLogin: false,
  disablePhoneLogin: false,
  onRampTestMode: true, 
});

const config = {
  chains: [sepolia],
  connectors: [connector],
  transports: {
    [sepolia.id]: http(),
  },
};

const wagmiProviderConfig = createConfig(config);
const queryClient = new QueryClient();

const AuthWithWagmi = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiProviderConfig}>
        {children}
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default AuthWithWagmi;
