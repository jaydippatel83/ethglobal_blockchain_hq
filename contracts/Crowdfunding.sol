// SPDX-License-Identifier: UNLICENSED 
pragma solidity ^0.8.0;
import {VennFirewallConsumer} from "@ironblocks/firewall-consumer/contracts/consumers/VennFirewallConsumer.sol";

contract Crowdfunding  is VennFirewallConsumer{ 
    struct Campaign {
        address creator;
        string title;
        string description;
        uint256 targetAmount;
        uint256 deadline;
        uint256 amountCollected;
        bool isWithdrawn;
        mapping(address => uint256) contributions;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event CampaignCreated(
        uint256 campaignId,
        address indexed creator,
        string title,
        uint256 targetAmount,
        uint256 deadline
    );

    event DonationReceived(
        uint256 campaignId,
        address indexed donor,
        uint256 amount
    );

    event FundsClaimed(uint256 campaignId, uint256 amount);

    /// @notice Allows a user to create a new campaign
    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _targetAmount,
        uint256 _deadline
    ) firewallProtected public {
        require(_targetAmount > 0, "Target amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        Campaign storage newCampaign = campaigns[campaignCount];
        newCampaign.creator = msg.sender;
        newCampaign.title = _title;
        newCampaign.description = _description;
        newCampaign.targetAmount = _targetAmount;
        newCampaign.deadline = _deadline;
        newCampaign.amountCollected = 0;
        newCampaign.isWithdrawn = false;

        emit CampaignCreated(campaignCount, msg.sender, _title, _targetAmount, _deadline);
        campaignCount++;
    }

    /// @notice Allows a user to donate to a campaign
    function donateToCampaign(uint256 _campaignId) firewallProtected public payable {
        Campaign storage campaign = campaigns[_campaignId];
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Donation amount must be greater than 0");

        campaign.contributions[msg.sender] += msg.value;
        campaign.amountCollected += msg.value;

        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    /// @notice Allows the campaign creator to claim funds after the deadline
    function claimFunds(uint256 _campaignId)firewallProtected public {
        Campaign storage campaign = campaigns[_campaignId];
        require(msg.sender == campaign.creator, "Only the campaign creator can claim funds");
        require(block.timestamp >= campaign.deadline, "Campaign is still ongoing");
        require(!campaign.isWithdrawn, "Funds already claimed");

        uint256 amount = campaign.amountCollected;
        campaign.isWithdrawn = true;

        payable(campaign.creator).transfer(amount);

        emit FundsClaimed(_campaignId, amount);
    }

    /// @notice Get details of a campaign
    function getCampaign(uint256 _campaignId) 
         firewallProtected
        public
        returns (
            address creator,
            string memory title,
            string memory description,
            uint256 targetAmount,
            uint256 deadline,
            uint256 amountCollected,
            bool isWithdrawn
        ) 
    {
        Campaign storage campaign = campaigns[_campaignId];
        return (
            campaign.creator,
            campaign.title,
            campaign.description,
            campaign.targetAmount,
            campaign.deadline,
            campaign.amountCollected,
            campaign.isWithdrawn
        );
    }
}