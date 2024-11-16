'use client';
import React, { useEffect, useState } from "react";
import { capsule } from "@/lib/capsule";
import dynamic from 'next/dynamic';
import ButtonComponent from "../Button";
import { useAccount } from 'wagmi';
import UserInfo from "../header/UserInfo";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";

const CapsuleModal = dynamic(
  () => import('@usecapsule/react-sdk').then((mod) => mod.CapsuleModal),
  { ssr: false }
);


function CapsuleWallet() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, isConnected } = useAccount();  

  const formatWalletAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(()=>{
    if (isConnected && address) {
      userAdd(address);
  }
  },[isConnected])

  console.log(address,"address");
  

  const userAdd = async (walletAddress) => {
    if (!walletAddress) {
        toast.error("Wallet address is missing.");
        return;
    }

    try { 
        const userDocRef = doc(db, "users", walletAddress); 
        const userSnapshot = await getDoc(userDocRef); 
        if (userSnapshot.exists()) {
            toast.success("User already exists");
        } else { 
            await setDoc(userDocRef, {
                wallet: walletAddress,
                createdAt: new Date().toISOString(),
            });

            toast.success("New user added");
        }
    } catch (error) {
        console.error("Error adding user to", error.message);
    }
};


  return (
    <div>
      <div className="flex">
      <ButtonComponent
        onClick={() => setIsOpen(true)}
        text={isConnected ? `${formatWalletAddress(address)}` : "Sign in with Capsule"} > 
      </ButtonComponent>
      {
        isConnected && <UserInfo user={address}/>
      }
      </div>
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
