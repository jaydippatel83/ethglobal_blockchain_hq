"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getAgreementInstance, getContractInstance } from "../lib/getContractInstance";

export default function MyAgreements() {
    const [agreements, setAgreements] = useState([]);
    const [selectedAgreement, setSelectedAgreement] = useState(null);
    const [aggrementStatus, setaggrementStatus] = useState(null);
    console.log(aggrementStatus, '=== aggrement syatusjds');
    console.log(agreements, ':::::agreements allll');

    // Fetch All Agreements with Full Details
    const fetchAllAgreements = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = await getContractInstance(provider);
        if (!contract) return;

        try {
            // Fetch all agreement addresses
            const agreementAddresses = await contract.getAllAgreements();

            // Fetch detailed data for each agreement
            const agreementsData = await Promise.all(
                agreementAddresses.map(async (address) => {
                    const agreementContract = await getAgreementInstance(address, provider);
                    const details = await agreementContract.getStatus(); // Assuming `getStatus` fetches details
                    return {
                        address,
                        buyer: details[0],
                        seller: details[1],
                        price: ethers.utils.formatEther(details[2]),
                        statePercent: details[3].toNumber(),
                        sellerPercent: details[4].toNumber(),
                        title: details[5],
                        description: details[6],
                        buyerStaked: details[8],
                        sellerStaked: details[9],
                    };
                })
            );
            console.log(agreementsData, '---agreementsData');
            setAgreements(agreementsData);
        } catch (error) {
            console.error("Error fetching agreements:", error);
        }
    };


    // Stake Funds
    const stakeFunds = async () => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const tx = await contract.stake({ value: ethers.utils.parseEther("0.5") });
            await tx.wait();
            alert("Funds staked successfully!");
        } catch (error) {
            console.error("Error staking funds:", error);
        }
    };

    // Confirm Agreement
    const confirmAgreement = async () => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const tx = await contract.confirm();
            await tx.wait();
            alert("Agreement confirmed successfully!");
        } catch (error) {
            console.error("Error confirming agreement:", error);
        }
    };

    // Cancel Agreement
    const cancelAgreement = async () => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const tx = await contract.cancel();
            await tx.wait();
            alert("Agreement canceled successfully!");
        } catch (error) {
            console.error("Error canceling agreement:", error);
        }
    };

    // Check Stake Status
    const checkStakeStatus = async () => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const status = await contract.getStatus();
            console.log(status, '--- statussss');
            setaggrementStatus(status)
            const [buyer, seller, , , , , , , buyerStaked, sellerStaked] = status;
            alert(`
                Buyer Address: ${buyer}
                Buyer Staked: ${buyerStaked}
                Seller Address: ${seller}
                Seller Staked: ${sellerStaked}
            `);
        } catch (error) {
            console.error("Error checking stake status:", error);
        }
    };

    useEffect(() => {
        fetchAllAgreements();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">My Agreements</h1>
            <ul className="space-y-4">
                {agreements.map((agreement, index) => (
                    <li key={index} className="border p-4 rounded shadow">
                        <p>
                            <strong>Agreement Address:</strong> {agreement.address}
                        </p>
                        <p>
                            <strong>Buyer:</strong> {agreement.buyer}
                        </p>
                        <p>
                            <strong>Seller:</strong> {agreement.seller}
                        </p>
                        <p>
                            <strong>Price:</strong> {agreement.price} ETH
                        </p>
                        <p>
                            <strong>State Percent:</strong> {agreement.statePercent}%
                        </p>
                        <p>
                            <strong>Seller Percent:</strong> {agreement.sellerPercent}%
                        </p>
                        <p>
                            <strong>Title:</strong> {agreement.title}
                        </p>
                        <p>
                            <strong>Description:</strong> {agreement.description}
                        </p>
                        <p>
                            <strong>Buyer Staked:</strong> {agreement.buyerStaked ? "Yes" : "No"}
                        </p>
                        <p>
                            <strong>Seller Staked:</strong> {agreement.sellerStaked ? "Yes" : "No"}
                        </p>
                        <button
                            onClick={() => setSelectedAgreement(agreement.address)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Select
                        </button>
                    </li>
                ))}
            </ul>

            {selectedAgreement && (
                <div className="mt-4">
                    <h3 className="text-lg">Selected Agreement: {selectedAgreement}</h3>
                    <button
                        onClick={stakeFunds}
                        className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                        Stake Funds
                    </button>
                    <button
                        onClick={checkStakeStatus}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Check Stake Status
                    </button>
                    <button
                        onClick={confirmAgreement}
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Confirm Agreement
                    </button>
                    <button
                        onClick={cancelAgreement}
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                    >
                        Cancel Agreement
                    </button>
                </div>
            )}
        </div>
    );
}
