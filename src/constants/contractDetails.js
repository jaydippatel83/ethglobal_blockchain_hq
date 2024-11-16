// src/constants/contractDetails.js

export const AGREEMENT_CONTRACT_ADDRESS = "0x3a99fAd8A12fC4309bfE17404E81295791DC0F41";

export const AGREEMENT_CONTRACT_ABI =
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "price",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "agreementAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                }
            ],
            "name": "CreateAgreement",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_buyer",
                    "type": "address"
                },
                {
                    "internalType": "address payable",
                    "name": "_seller",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_statePercent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_sellerPercent",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                }
            ],
            "name": "agreementCreate",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "agreementImap",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "agreementMap",
            "outputs": [
                {
                    "internalType": "contract Agreement",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "agreements",
            "outputs": [
                {
                    "internalType": "contract Agreement",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_addr",
                    "type": "address"
                }
            ],
            "name": "getAgreementByAddress",
            "outputs": [
                {
                    "internalType": "contract Agreement",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getAgreementByIndex",
            "outputs": [
                {
                    "internalType": "contract Agreement",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_party",
                    "type": "address"
                }
            ],
            "name": "getAgreementByParties",
            "outputs": [
                {
                    "internalType": "contract Agreement[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getAllAgreements",
            "outputs": [
                {
                    "internalType": "contract Agreement[]",
                    "name": "",
                    "type": "address[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]


    export const AGREEMENT_ABI = [
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_buyerAddress",
                    "type": "address"
                },
                {
                    "internalType": "address payable",
                    "name": "_sellerAddress",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_price",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_percent",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_sPer",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "_titleA",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_descriptionA",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "buyer",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "seller",
                    "type": "address"
                },
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "buyer",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "salePrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "statePercent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellerPercent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "buyerStake",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "sellerStake",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "buyerCancel",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "sellerCancel",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "cancelled",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "agreAddress",
                            "type": "address"
                        }
                    ],
                    "indexed": false,
                    "internalType": "struct Agreement.ContractStatus",
                    "name": "state",
                    "type": "tuple"
                }
            ],
            "name": "AgreementStateChanged",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "cancel",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "confirm",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "internalType": "bytes",
                    "name": "functionSignature",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes32",
                    "name": "sigR",
                    "type": "bytes32"
                },
                {
                    "internalType": "bytes32",
                    "name": "sigS",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint8",
                    "name": "sigV",
                    "type": "uint8"
                }
            ],
            "name": "executeMetaTransaction",
            "outputs": [
                {
                    "internalType": "bytes",
                    "name": "",
                    "type": "bytes"
                }
            ],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "userAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address payable",
                    "name": "relayerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "functionSignature",
                    "type": "bytes"
                }
            ],
            "name": "MetaTransactionExecuted",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "revokeCancellation",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "revokeStake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "stake",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "agreementAddress",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getNonce",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "nonce",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getStatus",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "address",
                            "name": "buyer",
                            "type": "address"
                        },
                        {
                            "internalType": "address",
                            "name": "seller",
                            "type": "address"
                        },
                        {
                            "internalType": "uint256",
                            "name": "salePrice",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "statePercent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "uint256",
                            "name": "sellerPercent",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "title",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "description",
                            "type": "string"
                        },
                        {
                            "internalType": "bool",
                            "name": "buyerStake",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "sellerStake",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "buyerCancel",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "sellerCancel",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "active",
                            "type": "bool"
                        },
                        {
                            "internalType": "bool",
                            "name": "cancelled",
                            "type": "bool"
                        },
                        {
                            "internalType": "address",
                            "name": "agreAddress",
                            "type": "address"
                        }
                    ],
                    "internalType": "struct Agreement.ContractStatus",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]