"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContractInstance, getAgreementInstance } from "../lib/getContractInstance";
export default function AgreementApp() {
    const [agreements, setAgreements] = useState([]);
    const [formData, setFormData] = useState({
        buyer: "",
        seller: "",
        price: "",
        statePercent: "",
        sellerPercent: "",
        title: "",
        description: "",
    });

    const [selectedAgreement, setSelectedAgreement] = useState();

    // Connect to Metamask
    console.log(agreements, '----- agreements');


    // Handle Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create Agreement
    const createAgreement = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = await getContractInstance(signer)


        if (!contract) return alert("Contract not connected!");
        try {
            const tx = await contract.agreementCreate(
                formData.buyer,
                formData.seller,
                ethers.utils.parseEther(formData.price),
                parseInt(formData.statePercent),
                parseInt(formData.sellerPercent),
                formData.title,
                formData.description
            );
            await tx.wait();
            console.log('--------- txxx', tx);

            alert("Agreement created successfully!");
        } catch (error) {
            console.error("Error creating agreement:", error);
        }
    };

    // Fetch All Agreements
    const fetchAllAgreements = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract = await getContractInstance(provider)
        if (!contract) return;
        try {
            const agreements = await contract.getAllAgreements();
            console.log(agreements, '----agreeee');

            setAgreements(agreements);
        } catch (error) {
            console.error("Error fetching agreements:", error);
        }
    };

    // Stake Funds
    // const stakeFunds = async (selectedAgreement) => {
    //     // if (!contract || !selectedAgreement) return alert("Select an agreement!");
    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     let contract = await getAgreementInstance(selectedAgreement, signer)
    //     console.log(contract, '====');

    //     try {
    //         const tx = await contract.stake({ value: ethers.utils.parseEther("0.5") }); // Replace 0.5 with the actual stake amount
    //         await tx.wait();
    //         alert("Funds staked successfully!");
    //     } catch (error) {
    //         console.error("Error staking funds:", error);
    //     }
    // };

    // const stakeFunds = async () => {
    //     // console.log(selectedAgreement,'::: secected agreee');
        
    //     // if (!selectedAgreement) return alert("Select an agreement!");
    //     // if (!amountInEther || parseFloat(amountInEther) <= 0) {
    //     //     return alert("Please provide a valid amount in Ether!");
    //     // }

    //     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //     const signer = provider.getSigner();
    //     let contract = await getAgreementInstance(selectedAgreement?.agreAddress, signer);

    //     try {
    //         // Convert Ether to Wei for the transaction
    //         const amountInWei = ethers.utils.parseEther(selectedAgreement?.salePrice);

    //         // Stake funds with the specified Ether amount
    //         const tx = await contract.stake({ value: amountInWei });
    //         await tx.wait();
    //         alert(`Funds staked successfully! Amount: ${amountInEther} ETH`);
    //     } catch (error) {
    //         console.error("Error staking funds:", error);
    //         alert("Failed to stake funds. Check console for details.");
    //     }
    // };


    useEffect(() => {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        // let contract = await getContractInstance(provider)
        // if (contract) fetchAllAgreements();
        fetchAllAgreementss()
    }, []);

    async function fetchAllAgreementss() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let contract = await getContractInstance(provider)
        if (contract) fetchAllAgreements();
    }

    function parseAgreementData(data) {
        if (!data || !Array.isArray(data)) {
            throw new Error("Invalid agreement data");
        }
    
        return {
            buyer: data[0],
            seller: data[1],
            price: ethers.utils.formatEther(data[2]), // Convert BigNumber to Ether
            statePercent: parseInt(data[3].hex, 16), // Convert BigNumber to a normal number
            sellerPercent: parseInt(data[4].hex, 16), // Convert BigNumber to a normal number
            title: data[5],
            description: data[6],
            isActive: data[7],
            isCancelled: data[8],
            isBuyerStaked: ethers.BigNumber.from(data[9]).toNumber(),
            isSellerStaked: ethers.BigNumber.from(data[10]).toNumber(),
            isLocked: data[11],
            isComplete: data[12],
            agreementAddress: data[13]
        };
    }

    async function getAgreeData(agreeAddress) {

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        let agreement = await getAgreementInstance(agreeAddress, provider)
        if (agreement) {
            let agreementData = await agreement.getStatus();
            console.log(agreementData,"agreementData");
            
            const parsedAgreement = parseAgreementData(agreementData);

            console.log(' details of this agreement ----->', parsedAgreement);
            // setSelectedAgreement(agreementData);
            
        }
    }

    const confirmAgreement = async (selectedAgreement) => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const agreementContract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const tx = await agreementContract.confirm(); // Assuming confirm requires no extra parameters
            await tx.wait();
            alert("Agreement confirmed successfully!");
        } catch (error) {
            console.error("Error confirming agreement:", error);
            alert("Failed to confirm agreement. Check console for details.");
        }
    };


    const cancelAgreement = async (selectedAgreement) => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const agreementContract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const tx = await agreementContract.cancel(); // Assuming cancel requires no extra parameters
            await tx.wait();
            alert("Cancellation request submitted successfully!");
        } catch (error) {
            console.error("Error canceling agreement:", error);
            alert("Failed to cancel agreement. Check console for details.");
        }
    };

    // Check Stake Status
    const checkStakeStatus = async (selectedAgreement) => {
        if (!selectedAgreement) return alert("Select an agreement!");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const agreementContract = await getAgreementInstance(selectedAgreement, signer);

        try {
            const status = await agreementContract.getStatus(); // Assuming `getStatus()` returns necessary details
            console.log("Stake Status:", status);

            const [buyer, seller, , , , , , , buyerStaked, sellerStaked] = status; // Adjust based on `getStatus` return type
            alert(`
            Buyer Address: ${buyer}
            Buyer Staked: ${buyerStaked}
            Seller Address: ${seller}
            Seller Staked: ${sellerStaked}
        `);
        } catch (error) {
            console.error("Error fetching stake status:", error);
        }
    };



    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Agreement Demo</h1>
            <>
                <h2 className="text-xl mt-6">Create Agreement</h2>
                <form className="space-y-4">
                    <input
                        type="text"
                        name="buyer"
                        placeholder="Buyer Address"
                        value={formData.buyer}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        name="seller"
                        placeholder="Seller Address"
                        value={formData.seller}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price (in ETH)"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <input
                        type="number"
                        name="statePercent"
                        placeholder="State Percent"
                        value={formData.statePercent}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <input
                        type="number"
                        name="sellerPercent"
                        placeholder="Seller Percent"
                        value={formData.sellerPercent}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border p-2 w-full"
                    />
                    <button
                        type="button"
                        onClick={createAgreement}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Create Agreement
                    </button>
                </form>

                <h2 className="text-xl mt-6">Existing Agreements</h2>
                <ul>
                    {agreements.map((agreement, index) => (
                        <li key={index}>
                            {agreement}{" "}
                            <button
                                // onClick={() => setSelectedAgreement(agreement)}
                                onClick={() => getAgreeData(agreement)}
                                className="text-blue-500 underline"
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
                            // onClick={() => stakeFunds(selectedAgreement)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Stake Funds
                        </button>

                        <button
                            onClick={() => checkStakeStatus(selectedAgreement)}
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Check Stake Status
                        </button>
                        <button
                            onClick={() => confirmAgreement(selectedAgreement)}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Confirm Agreement
                        </button>

                        <button
                            onClick={() => cancelAgreement(selectedAgreement)}
                            className="bg-red-500 text-white px-4 py-2 rounded mt-2"
                        >
                            Cancel Agreement
                        </button>
                    </div>
                )}
            </>

        </div>
    );
}
