// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IEd3LoyaltyPoints.sol";
import "./IEd3AirTicketNFT.sol";

contract Ed3AirlineGate is Ownable {
    address payable paymentAddress;
    address payable public ed3TicketNFTAddress;
    address public ed3LoyaltyPointsAddress;
    uint256 public immutable POINTS_PER_TICKET;

    constructor(address _ed3LoyaltyPointsAddress, address payable _ed3TicketNFTAddress, uint256 _pointsPerTicket) {
        ed3LoyaltyPointsAddress = _ed3LoyaltyPointsAddress;
        ed3TicketNFTAddress = _ed3TicketNFTAddress;
        POINTS_PER_TICKET = _pointsPerTicket;
        paymentAddress = payable(msg.sender);
    }

    function mint(address _to) external payable {
        uint256 mintPrice = IEd3AirTicketNFT(ed3TicketNFTAddress).mintPrice();
        require(msg.value >= mintPrice, "Insufficient funds");
        uint256 maxSupply = IEd3AirTicketNFT(ed3TicketNFTAddress).maxSupply();
        uint256 totalSupply = IEd3AirTicketNFT(ed3TicketNFTAddress).totalSupply();
        require(maxSupply > totalSupply, "air ticket sold out");
        // 购买机票NFT
        IEd3AirTicketNFT(ed3TicketNFTAddress).mint{ value: msg.value }(_to);
        // 每次购买机票后可以得到 POINTS_PER_TICKET 积分
        IEd3LoyaltyPoints(ed3LoyaltyPointsAddress).mint(_to, POINTS_PER_TICKET);
    }

    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds to withdraw");
        payable(paymentAddress).transfer(address(this).balance);
    }
}
