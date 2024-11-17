// SPDX-License-Identifier: Unlicenced
pragma solidity ^0.8.26;
import {ISP} from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import {Attestation} from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import {DataLocation} from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BlockchainHQ {
    address public owner;
    uint256 public platformFeePercentage = 2; // Platform fee in percentage (2%)
    ISP public spInstance; // Sign Protocol instance
    uint64 public badgeSchemaId; // Schema ID for badge attestations
    enum FeeType {
        PerHalfHour,
        PerHour,
        PerDay,
        PerWeek
    }
    ERC20 public karmaToken;
    uint256 public karmaRewardThreshold = 2;
    string public bronzeBadgeLogoURI;
    event BadgeAwardedWithURI(
        address indexed user,
        string badgeType,
        uint256 acceptedAnswers,
        string badgeLogoURI,
        uint64 attestationId
    );
    uint256 public karmaTokenRewardAmount = 10 * 10 ** 18;

    event ReputationIncreased(address indexed user, uint256 newReputation);
    event BadgeAwardFailed(address indexed user, string badgeType);
    event KarmaRewarded(address indexed user, uint256 amount);
    event AcceptedAnswerIncremented(
        address indexed user,
        uint256 newAcceptedAnswers
    );

    struct User {
        string name;
        string userAddress;
        bool isRegistered;
        uint256 reputation; // Reputation points
        uint256 acceptedAnswers; // Count of accepted answers
        bool hasBronzeBadge; // Example: Tracking Bronze badge eligibility
    }

    struct Expert {
        bool isRegistered;
        uint256 fee; // Fee in wei for the specified duration
        FeeType feeType;
        uint256 balance; // Balance after platform fee deductions
    }

    struct Question {
        address asker;
        string questionText;
        uint256 consultationId;
        bool answered;
        string answerText;
    }

    struct Consultation {
        address user;
        address expert;
        uint256 startTime;
        uint256 endTime;
        bool isActive;
    }

    mapping(address => User) public users;
    mapping(address => Expert) public experts;
    mapping(uint256 => Question) public questions;
    mapping(uint256 => Consultation) public consultations;
    uint256 public questionCount;
    uint256 public consultationCount;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    event UserRegistered(address user, string name, string userAddress);
    event ExpertRegistered(address expert, uint256 fee, FeeType feeType);
    event ConsultationStarted(
        uint256 consultationId,
        address user,
        address expert,
        uint256 amountPaid,
        uint256 endTime
    );
    event QuestionAsked(
        uint256 questionId,
        address asker,
        uint256 consultationId
    );
    event QuestionAnswered(uint256 questionId, address expert, string answer);
    event Withdrawal(address expert, uint256 amount);
    event BadgeAwarded(address user, string badgeType, uint64 attestationId);

    constructor(string memory _bronzeBadgeLogoURI, address _karmaTokenAddress) {
        owner = msg.sender;
        bronzeBadgeLogoURI = _bronzeBadgeLogoURI; // Set the Bronze badge logo URI during deployment
        karmaToken = ERC20(_karmaTokenAddress);
    }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setBadgeSchemaId(uint64 schemaId) external onlyOwner {
        badgeSchemaId = schemaId; // Set the schema ID for badge attestations
    }

    // Register a user with name and address
    function registerUser(
        string memory name,
        string memory userAddress
    ) external {
        require(!users[msg.sender].isRegistered, "User already registered");

        users[msg.sender] = User({
            name: name,
            userAddress: userAddress,
            isRegistered: true,
            reputation: 0,
            acceptedAnswers: 0,
            hasBronzeBadge: false
        });

        emit UserRegistered(msg.sender, name, userAddress);
    }

    function increaseReputation(address user) external onlyOwner {
        require(users[user].isRegistered, "User not registered");
        users[user].reputation += 1;
        emit ReputationIncreased(user, users[user].reputation);

        if (users[user].reputation >= 10 && !users[user].hasBronzeBadge) {
            awardBadge(user, "Bronze");
        } else {
            emit BadgeAwardFailed(user, "Bronze");
        }
    }

    function incrementAcceptedAnswers(address user) external onlyOwner {
        require(users[user].isRegistered, "User not registered");
        users[user].acceptedAnswers += 1;

        emit AcceptedAnswerIncremented(user, users[user].acceptedAnswers);

        // Check if acceptedAnswers reaches the reward threshold
        if (users[user].acceptedAnswers == karmaRewardThreshold) {
            rewardUserWithTokens(user);
        }
    }

    function rewardUserWithTokens(address user) internal {
        require(users[user].isRegistered, "User not registered");

        // Check the Karma contract balance
        uint256 contractBalance = karmaToken.balanceOf(address(this));
        require(
            contractBalance >= karmaTokenRewardAmount,
            "Insufficient token balance in BlockchainHQ contract"
        );

        // Transfer karma tokens to the user
        bool success = karmaToken.transfer(user, karmaTokenRewardAmount);
        require(success, "Token transfer failed");

        emit KarmaRewarded(user, karmaTokenRewardAmount);
    }

    function awardBadge(
        address user,
        string memory badgeType
    ) internal onlyOwner {
        require(users[user].isRegistered, "User not registered");
        require(!users[user].hasBronzeBadge, "User already has this badge");

        uint64 attestationId = attest(
            user,
            badgeType,
            users[user].acceptedAnswers
        );

        users[user].hasBronzeBadge = true;

        emit BadgeAwardedWithURI(
            user,
            badgeType,
            users[user].acceptedAnswers,
            bronzeBadgeLogoURI,
            attestationId
        );
    }

    function attest(
        address user,
        string memory badgeType,
        uint256 acceptedAnswers
    ) internal returns (uint64) {
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
    }

    function validateBadge(
        address user,
        uint64 attestationId
    ) external payable {
        Attestation memory attestation = spInstance.getAttestation(
            attestationId
        );

        // Decode badgeType and acceptedAnswers from the attestation data
        (string memory badgeType, uint256 acceptedAnswers) = abi.decode(
            attestation.data,
            (string, uint256)
        );

        // Validate data
        require(users[user].isRegistered, "User not registered");
        require(
            keccak256(bytes(badgeType)) == keccak256(bytes("Bronze")),
            "Invalid badge type"
        );
        require(
            users[user].acceptedAnswers >= acceptedAnswers,
            "Insufficient accepted answers"
        );
    }

    // Register an expert with a fee and fee type (per half-hour, hour, day, or week)
    function registerExpert(uint256 fee, FeeType feeType) external {
        require(!experts[msg.sender].isRegistered, "Expert already registered");
        require(fee > 0, "Fee must be greater than zero");

        experts[msg.sender] = Expert({
            isRegistered: true,
            fee: fee,
            feeType: feeType,
            balance: 0
        });

        emit ExpertRegistered(msg.sender, fee, feeType);
    }

    // Start a consultation by paying for the specified duration
    function startConsultation(
        address expert,
        uint256 duration
    ) external payable {
        require(users[msg.sender].isRegistered, "User must be registered");
        require(experts[expert].isRegistered, "Expert is not registered");

        uint256 requiredFee = calculateFee(expert, duration);
        require(msg.value == requiredFee, "Incorrect payment amount");

        uint256 platformFee = (msg.value * platformFeePercentage) / 100;
        uint256 expertEarnings = msg.value - platformFee;

        // Add earnings to expert's balance
        experts[expert].balance += expertEarnings;

        // Calculate consultation end time based on the duration
        uint256 endTime = block.timestamp + duration;

        consultations[consultationCount] = Consultation({
            user: msg.sender,
            expert: expert,
            startTime: block.timestamp,
            endTime: endTime,
            isActive: true
        });

        // Transfer platform fee to the owner
        payable(owner).transfer(platformFee);

        emit ConsultationStarted(
            consultationCount,
            msg.sender,
            expert,
            msg.value,
            endTime
        );
        consultationCount++;
    }

    // Ask a question during an active consultation
    function askQuestion(
        uint256 consultationId,
        string memory questionText
    ) external {
        Consultation storage consultation = consultations[consultationId];
        require(consultation.user == msg.sender, "Not your consultation");
        require(
            block.timestamp <= consultation.endTime,
            "Consultation has expired"
        );

        questions[questionCount] = Question({
            asker: msg.sender,
            questionText: questionText,
            consultationId: consultationId,
            answered: false,
            answerText: ""
        });

        emit QuestionAsked(questionCount, msg.sender, consultationId);
        questionCount++;
    }

    // Answer a question (only the expert can answer during an active consultation)
    function answerQuestion(
        uint256 questionId,
        string memory answerText
    ) external {
        Question storage question = questions[questionId];
        Consultation storage consultation = consultations[
            question.consultationId
        ];
        require(
            experts[msg.sender].isRegistered,
            "Only registered experts can answer"
        );
        require(
            consultation.expert == msg.sender,
            "Only the assigned expert can answer this question"
        );
        require(
            block.timestamp <= consultation.endTime,
            "Consultation has ended"
        );
        require(!question.answered, "Question already answered");

        question.answered = true;
        question.answerText = answerText;

        emit QuestionAnswered(questionId, msg.sender, answerText);
    }

    // Expert can withdraw their earnings
    function withdrawEarnings() external {
        Expert storage expert = experts[msg.sender];
        require(expert.isRegistered, "Only registered experts can withdraw");
        require(expert.balance > 0, "No earnings to withdraw");

        uint256 amount = expert.balance;
        expert.balance = 0;

        payable(msg.sender).transfer(amount);

        emit Withdrawal(msg.sender, amount);
    }

    // Set platform fee percentage (only owner)
    function setPlatformFeePercentage(
        uint256 newFeePercentage
    ) external onlyOwner {
        require(newFeePercentage <= 100, "Fee percentage cannot exceed 100%");
        platformFeePercentage = newFeePercentage;
    }

    // Calculate fee based on expert's rate and requested duration
    function calculateFee(
        address expert,
        uint256 duration
    ) public view returns (uint256) {
        Expert storage ex = experts[expert];
        if (ex.feeType == FeeType.PerHalfHour) {
            return (duration / 30 minutes) * ex.fee;
        } else if (ex.feeType == FeeType.PerHour) {
            return (duration / 1 hours) * ex.fee;
        } else if (ex.feeType == FeeType.PerDay) {
            return (duration / 1 days) * ex.fee;
        } else if (ex.feeType == FeeType.PerWeek) {
            return (duration / 1 weeks) * ex.fee;
        }
        return 0;
    }

    // Retrieve question details
    function getQuestion(
        uint256 questionId
    ) external view returns (Question memory) {
        return questions[questionId];
    }

    function getBronzeBadgeLogoURI(
        address user
    ) external view returns (string memory) {
        require(users[user].isRegistered, "User not registered");
        require(
            users[user].hasBronzeBadge,
            "User does not have a Bronze badge"
        );
        return bronzeBadgeLogoURI;
    }
}
