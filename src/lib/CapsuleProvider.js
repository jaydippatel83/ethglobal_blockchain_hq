'use client';
import React from "react";
import { capsuleConnector } from "@usecapsule/wagmi-v2-integration";
import { OAuthMethod } from "@usecapsule/web-sdk"; 
import { createConfig, WagmiProvider, useConnect } from "wagmi";
import { http } from "wagmi";
import { sepolia,celo } from "wagmi/chains";  
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { capsule } from "./capsule";
import { CapsuleEvmProvider, metaMaskWallet } from "@usecapsule/evm-wallet-connectors";

const connector = capsuleConnector({
  capsule:  capsule,
  chains: [sepolia,celo],
  appName: "Blockchain HQ",
  options: {},
  nameOverride: "Capsule",
  idOverride: "capsule",
  oAuthMethods: [OAuthMethod.GOOGLE, OAuthMethod.TWITTER, OAuthMethod.FACEBOOK, OAuthMethod.DISCORD, OAuthMethod.APPLE],
  disableEmailLogin: false,
  disablePhoneLogin: false,
  onRampTestMode: true, 
  externalWallets: ["METAMASK"]
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
        <CapsuleEvmProvider 
         config={{
            projectId: process.env.NEXT_PUBLIC_APP_CAPSULE_API_KEY, 
            chains: [sepolia, celo],
            wallets: [metaMaskWallet],
          }}
        >
        {children}
        </CapsuleEvmProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
};

export default AuthWithWagmi;
