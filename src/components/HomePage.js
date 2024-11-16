"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContractInstance } from "../lib/getContractInstance";

export default function HomePage() {
  
    // Interact with the contract (example: create an agreement)
    const createAgreement = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log('provider', provider);
        const signer = provider.getSigner();
        let contract = await getContractInstance(signer)
        console.log(contract);
        
        if (!contract) return alert("Contract not connected!");

        try {
            const tx = await contract.agreementCreate(
                "0xcd6e1F6FabAbf3A72ab38F715fd7D7E83fBc3501", // Replace with a buyer address
                "0xC49ac61f0F0bbE3D338e899Cb66b09685De97748", // Replace with a seller address
                ethers.utils.parseEther("1"), // Price in Ether
                50, // State percent
                50, // Seller percent
                "Test Agreement Title",
                "Test Agreement Description"
            );
            await tx.wait();
            console.log("Agreement created successfully! -- tx", tx);
        } catch (error) {
            console.error("Error creating agreement:", error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Agreement Contract Interaction</h1>
           
                <div className="mt-4">
                    {/* <button
                        onClick={createAgreement}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Agreement
                    </button> */}
                </div>
    
        </div>
    );
}
