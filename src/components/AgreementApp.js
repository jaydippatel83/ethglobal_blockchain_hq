// "use client";

// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import { getContractInstance, getAgreementInstance } from "../lib/getContractInstance";
// export default function AgreementApp() {
//     const [agreements, setAgreements] = useState([]);

//     console.log(agreements, '====> agreements');

//     const [formData, setFormData] = useState({
//         buyer: "",
//         seller: "",
//         price: "",
//         statePercent: "",
//         sellerPercent: "",
//         title: "",
//         description: "",
//     });

//     const [selectedAgreement, setSelectedAgreement] = useState(null);

//     // Connect to Metamask
//     console.log(agreements, '----- agreements');


//     // Handle Form Input Changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     // Create Agreement
//     const createAgreement = async () => {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         let contract = await getContractInstance(signer)


//         if (!contract) return alert("Contract not connected!");
//         try {
//             const tx = await contract.agreementCreate(
//                 formData.buyer,
//                 formData.seller,
//                 ethers.utils.parseEther(formData.price),
//                 parseInt(formData.statePercent),
//                 parseInt(formData.sellerPercent),
//                 formData.title,
//                 formData.description
//             );
//             await tx.wait();
//             console.log('--------- txxx', tx);

//             alert("Agreement created successfully!");
//         } catch (error) {
//             console.error("Error creating agreement:", error);
//         }
//     };

//     // Fetch All Agreements
//     const fetchAllAgreements = async () => {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         let contract = await getContractInstance(provider)
//         console.log(contract, '=== contract');

//         if (!contract) return;
//         try {
//             const agreements = await contract.getAllAgreements();
//             console.log(agreements, '----agreeee');

//             setAgreements(agreements);
//         } catch (error) {
//             console.error("Error fetching agreements:", error);
//         }
//     };

//     // Stake Funds
//     const stakeFunds = async (selectedAgreement) => {
//         // if (!contract || !selectedAgreement) return alert("Select an agreement!");
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         let contract = await getAgreementInstance(selectedAgreement, signer)
//         console.log(contract, '====');

//         try {
//             const tx = await contract.stake({ value: ethers.utils.parseEther("0.5") }); // Replace 0.5 with the actual stake amount
//             await tx.wait();
//             alert("Funds staked successfully!");
//         } catch (error) {
//             console.error("Error staking funds:", error);
//         }
//     };

//     useEffect(() => {
//         // const provider = new ethers.providers.Web3Provider(window.ethereum);
//         // let contract = await getContractInstance(provider)
//         // if (contract) fetchAllAgreements();
//         fetchAllAgreementss()
//     }, []);

//     async function fetchAllAgreementss() {
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         let contract = await getContractInstance(provider)
//         if (contract) fetchAllAgreements();
//     }

//     const confirmAgreement = async (selectedAgreement) => {
//         if (!selectedAgreement) return alert("Select an agreement!");
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const agreementContract = await getAgreementInstance(selectedAgreement, signer);

//         try {
//             const tx = await agreementContract.confirm(); // Assuming confirm requires no extra parameters
//             await tx.wait();
//             alert("Agreement confirmed successfully!");
//         } catch (error) {
//             console.error("Error confirming agreement:", error);
//             alert("Failed to confirm agreement. Check console for details.");
//         }
//     };


//     const cancelAgreement = async (selectedAgreement) => {
//         if (!selectedAgreement) return alert("Select an agreement!");
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const agreementContract = await getAgreementInstance(selectedAgreement, signer);

//         try {
//             const tx = await agreementContract.cancel(); // Assuming cancel requires no extra parameters
//             await tx.wait();
//             alert("Cancellation request submitted successfully!");
//         } catch (error) {
//             console.error("Error canceling agreement:", error);
//             alert("Failed to cancel agreement. Check console for details.");
//         }
//     };

//     // Check Stake Status
//     const checkStakeStatus = async (selectedAgreement) => {
//         if (!selectedAgreement) return alert("Select an agreement!");
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const agreementContract = await getAgreementInstance(selectedAgreement, signer);

//         try {
//             const status = await agreementContract.getStatus(); // Assuming `getStatus()` returns necessary details
//             console.log("Stake Status:", status);

//             const [buyer, seller, , , , , , , buyerStaked, sellerStaked] = status; // Adjust based on `getStatus` return type
//             alert(`
//             Buyer Address: ${buyer}
//             Buyer Staked: ${buyerStaked}
//             Seller Address: ${seller}
//             Seller Staked: ${sellerStaked}
//         `);
//         } catch (error) {
//             console.error("Error fetching stake status:", error);
//         }
//     };



//     return (
//         <div className="p-6">
//             <h1 className="text-2xl font-bold">Create Agreement</h1>
//             <>
//                 {/* <h2 className="text-xl mt-6">Create Agreement</h2> */}
//                 <form className="space-y-4">
//                     <input
//                         type="text"
//                         name="buyer"
//                         placeholder="Buyer Address"
//                         value={formData.buyer}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <input
//                         type="text"
//                         name="seller"
//                         placeholder="Seller Address"
//                         value={formData.seller}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <input
//                         type="text"
//                         name="price"
//                         placeholder="Price (in ETH)"
//                         value={formData.price}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <input
//                         type="number"
//                         name="statePercent"
//                         placeholder="State Percent"
//                         value={formData.statePercent}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <input
//                         type="number"
//                         name="sellerPercent"
//                         placeholder="Seller Percent"
//                         value={formData.sellerPercent}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <input
//                         type="text"
//                         name="title"
//                         placeholder="Title"
//                         value={formData.title}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <textarea
//                         name="description"
//                         placeholder="Description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         className="border p-2 w-full"
//                     />
//                     <button
//                         type="button"
//                         onClick={createAgreement}
//                         className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                         Create Agreement
//                     </button>
//                 </form>

//                 <h2 className="text-xl mt-6">Existing Agreements</h2>
//                 <ul>
//                     {agreements.map((agreement, index) => (
//                         <li key={index}>
//                             {agreement}{" "}
//                             <button
//                                 onClick={() => setSelectedAgreement(agreement)}
//                                 className="text-blue-500 underline"
//                             >
//                                 Select
//                             </button>
//                         </li>
//                     ))}
//                 </ul>

//                 {selectedAgreement && (
//                     <div className="mt-4">
//                         <h3 className="text-lg">Selected Agreement: {selectedAgreement}</h3>
//                         <button
//                             onClick={() => stakeFunds(selectedAgreement)}
//                             className="bg-yellow-500 text-white px-4 py-2 rounded"
//                         >
//                             Stake Funds
//                         </button>

//                         <button
//                             onClick={() => checkStakeStatus(selectedAgreement)}
//                             className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
//                         >
//                             Check Stake Status
//                         </button>
//                         <button
//                             onClick={() => confirmAgreement(selectedAgreement)}
//                             className="bg-green-500 text-white px-4 py-2 rounded mt-2"
//                         >
//                             Confirm Agreement
//                         </button>

//                         <button
//                             onClick={() => cancelAgreement(selectedAgreement)}
//                             className="bg-red-500 text-white px-4 py-2 rounded mt-2"
//                         >
//                             Cancel Agreement
//                         </button>
//                     </div>
//                 )}
//             </>
//         </div>
//     );
// }



"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { getContractInstance } from "../lib/getContractInstance";

export default function AgreementApp() {
    const [formData, setFormData] = useState({
        buyer: "",
        seller: "",
        price: "",
        statePercent: "",
        sellerPercent: "",
        title: "",
        description: "",
    });

    // Handle Form Input Changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Create Agreement
    const createAgreement = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = await getContractInstance(signer);

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
            alert("Agreement created successfully!");
        } catch (error) {
            console.error("Error creating agreement:", error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Create Agreement</h1>
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
        </div>
    );
}
