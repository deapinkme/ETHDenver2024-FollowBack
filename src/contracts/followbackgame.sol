/* // AMS - simple sample to test button functionality
// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract SampleContract is ERC20, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("MyToken", "MTK")
        Ownable(initialOwner)
        ERC20Permit("MyToken")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
*/

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract followBackGame is VRFConsumerBase, ERC721 {
    bytes32 internal keyHash;
    uint256 internal fee;
    uint256 public randomResult;
    
    address public owner;
    uint256 public participationPrice;
    uint256 public maxParticipants;
    uint256 public totalParticipants;
    mapping(address => bool) public isParticipant;
    
    event WinnerSelected(address winner);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(
        address _vrfCoordinator,
        address _linkToken,
        bytes32 _keyHash,
        uint256 _fee,
        address _nftOwner,
        uint256 _price,
        uint256 _maxParticipants
    ) 
        ERC721("followBackGame", "RNFTG")
        VRFConsumerBase(_vrfCoordinator, _linkToken)
    {
        keyHash = _keyHash;
        fee = _fee;
        owner = _nftOwner;
        participationPrice = _price;
        maxParticipants = _maxParticipants;
    }
    
    function participate() external payable {
        require(msg.value == participationPrice, "Incorrect participation price");
        require(totalParticipants < maxParticipants, "Max participants reached");
        require(!isParticipant[msg.sender], "Already participated");
        
        totalParticipants++;
        isParticipant[msg.sender] = true;
    }
    
    function requestRandomNumber() public onlyOwner returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");
        return requestRandomness(keyHash, fee);
    }
    
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        randomResult = randomness;
        uint256 winnerIndex = randomResult % totalParticipants;
        address winner;
        
        for (uint256 i = 0; i < maxParticipants; i++) {
            if (isParticipant[address(i)]) {
                if (winnerIndex == 0) {
                    winner = address(i);
                    break;
                }
                winnerIndex--;
            }
        }
        
        emit WinnerSelected(winner);
        
        // Mint NFT to winner
        _mint(winner, totalParticipants);
        
        // Reset game
        totalParticipants = 0;
        randomResult = 0;
        for (uint256 i = 0; i < maxParticipants; i++) {
            isParticipant[address(i)] = false;
        }
    }
}
