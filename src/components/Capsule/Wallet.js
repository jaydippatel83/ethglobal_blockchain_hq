'use client';
import React, { useState } from "react";
import { capsule } from "@/lib/capsule";
import dynamic from 'next/dynamic';
import ButtonComponent from "../Button";

const CapsuleModal = dynamic(
  () => import('@usecapsule/react-sdk').then((mod) => mod.CapsuleModal),
  { ssr: false }
);


function CapsuleWallet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <ButtonComponent onClick={() => setIsOpen(true)} text="Sign in with Capsule" />
      <CapsuleModal
        capsule={capsule}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        appName="Blockchain HQ"
        oAuthMethods={['GOOGLE', 'TWITTER', 'DISCORD']}
        authLayout={["AUTH:FULL", "EXTERNAL:FULL"]}
        externalWallets={["METAMASK"]}
      />
    </div>
  );
}
export default CapsuleWallet;
