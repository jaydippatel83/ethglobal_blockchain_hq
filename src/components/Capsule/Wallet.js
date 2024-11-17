'use client';
import React, { useState } from "react";
import { capsule } from "@/lib/capsule";
import dynamic from 'next/dynamic';
import ButtonComponent from "../Button";
import { useAccount, useConnect, useDisconnect } from 'wagmi';

const CapsuleModal = dynamic(
  () => import('@usecapsule/react-sdk').then((mod) => mod.CapsuleModal),
  { ssr: false }
);


function CapsuleWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const formatWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };


  return (
    <div>
      <ButtonComponent
        onClick={() => setIsOpen(true)}
        text={isConnected ? <div className="flex ">
         { formatWalletAddress(address)}
          <div className="w-8 h-8 rounded-full bg-gray-300 border border-gray-400">
            <img
              src="https://via.placeholder.com/40"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>
          : "Sign in with Capsule"} />
      <CapsuleModal
        capsule={capsule}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appName="Blockchain HQ"
        oAuthMethods={['GOOGLE', 'TWITTER', 'DISCORD']}
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]}
        externalWallets={['METAMASK']}
      />
    </div>
  );
}
export default CapsuleWallet;
