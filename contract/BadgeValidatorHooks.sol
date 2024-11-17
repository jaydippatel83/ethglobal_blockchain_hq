// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {ISPHook} from "@ethsign/sign-protocol-evm/src/interfaces/ISPHook.sol";
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

// @dev This contract manages attestation data validation logic.
contract DataValidator is Ownable {
    uint256 public reputationThreshold;

    error ReputationBelowThreshold();

    constructor() Ownable(_msgSender()) {}

    // Set the reputation threshold
    function setReputationThreshold(uint256 _threshold) external onlyOwner {
        reputationThreshold = _threshold;
    }

    // Internal function to check if the value meets the threshold
    function _checkThreshold(uint256 reputation) internal view {
        require(
            reputation >= reputationThreshold,
            "Reputation is below the threshold"
        );
    }
}

contract BadgeValidatorHook is ISPHook, DataValidator {
    function didReceiveAttestation(
        address, // attester
        uint64, //schemaId
        uint64 attestationId,
        bytes calldata // extraData
    ) external payable override {
        Attestation memory attestation = ISP(_msgSender()).getAttestation(
            attestationId
        );
        uint256 reputation = abi.decode(attestation.data, (uint256));

        // Use inherited _checkThreshold to validate
        _checkThreshold(reputation);
    }

    // Unsupported operations
    function didReceiveAttestation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata
    ) external pure override {
        revert("Unsupported operation");
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        bytes calldata
    ) external payable override {
        revert("Unsupported operation");
    }

    function didReceiveRevocation(
        address,
        uint64,
        uint64,
        IERC20,
        uint256,
        bytes calldata
    ) external pure override {
        revert("Unsupported operation");
    }
}
