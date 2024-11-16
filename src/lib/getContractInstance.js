import { ethers } from "ethers";
import { AGREEMENT_CONTRACT_ADDRESS, AGREEMENT_CONTRACT_ABI, AGREEMENT_ABI } from "../constants/contractDetails";

export const getContractInstance = async (signerOrProvider) => {
    return new ethers.Contract(AGREEMENT_CONTRACT_ADDRESS, AGREEMENT_CONTRACT_ABI, signerOrProvider);
};
export const getAgreementInstance = async (agreement, signerOrProvider) => {
    return new ethers.Contract(agreement, AGREEMENT_ABI, signerOrProvider);
};

