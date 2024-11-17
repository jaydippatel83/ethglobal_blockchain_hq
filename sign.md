# Contract :  Blockchain_HQ

https://celo-alfajores.blockscout.com/address/0x2BE1b8482D30b5d67b380B2C812DECA8a298F8aA 

# Contract :  Blockchain_HQ_Hook 

https://celo-alfajores.blockscout.com/address/0x39cc7f6DBe0842742b368d05eDcCD881ce720549  

# Contract Function :   Blockchain_HQ 

```function attest(address user, string memory badgeType, uint256 acceptedAnswers) internal returns (uint64) {
     bytes[] memory recipients = new bytes[](1);

        recipients[0] = abi.encode(user);

        Attestation memory attestation = Attestation({
            schemaId: badgeSchemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this),
            validUntil: 0, // No expiration
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: abi.encode(badgeType, acceptedAnswers)
        });

        return spInstance.attest(attestation, "", "", "");
    }```  
 


